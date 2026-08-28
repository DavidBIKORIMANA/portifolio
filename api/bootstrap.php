<?php
declare(strict_types=1);

if (session_status() !== PHP_SESSION_ACTIVE) {
    session_start();
}

define('APP_CONFIG', require __DIR__ . '/config.php');
define('DATA_DIR', __DIR__ . '/../data');
define('DB_PATH', DATA_DIR . '/portfolio.sqlite');

function db(): PDO
{
    static $pdo = null;
    if ($pdo === null) {
        if (!is_dir(DATA_DIR)) {
            mkdir(DATA_DIR, 0755, true);
        }
        $pdo = new PDO('sqlite:' . DB_PATH);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $pdo->exec('PRAGMA journal_mode = WAL;');
        migrate($pdo);
    }
    return $pdo;
}

function migrate(PDO $pdo): void
{
    $pdo->exec("CREATE TABLE IF NOT EXISTS visits (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        visited_at TEXT NOT NULL DEFAULT (datetime('now')),
        page TEXT NOT NULL,
        referrer TEXT,
        user_agent TEXT,
        ip_hash TEXT,
        visitor_id TEXT
    )");
    $pdo->exec("CREATE INDEX IF NOT EXISTS idx_visits_date ON visits(visited_at)");

    $pdo->exec("CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        message TEXT NOT NULL,
        ip_hash TEXT,
        is_read INTEGER NOT NULL DEFAULT 0
    )");

    $pdo->exec("CREATE TABLE IF NOT EXISTS reactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        emoji TEXT NOT NULL,
        visitor_id TEXT NOT NULL,
        ip_hash TEXT,
        UNIQUE(emoji, visitor_id)
    )");

    $pdo->exec("CREATE TABLE IF NOT EXISTS rate_limits (
        bucket_key TEXT PRIMARY KEY,
        count INTEGER NOT NULL,
        window_start INTEGER NOT NULL
    )");
}

function client_ip_hash(): string
{
    $ip = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? '';
    if (strpos($ip, ',') !== false) {
        $ip = trim(explode(',', $ip)[0]);
    }
    return hash('sha256', $ip . '|' . APP_CONFIG['ip_salt']);
}

function json_response($data, int $status = 200): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data);
    exit;
}

function read_json_body(): array
{
    $raw = file_get_contents('php://input');
    $data = json_decode((string)$raw, true);
    return is_array($data) ? $data : [];
}

function clean_visitor_id(string $raw): string
{
    $id = preg_replace('/[^a-zA-Z0-9\-]/', '', $raw) ?? '';
    return substr($id, 0, 64);
}

// Small fixed-window rate limiter keyed by bucket name + hashed IP.
function rate_limit(string $bucket, int $maxHits, int $windowSeconds): bool
{
    $pdo = db();
    $key = $bucket . ':' . client_ip_hash();
    $now = time();

    $stmt = $pdo->prepare('SELECT count, window_start FROM rate_limits WHERE bucket_key = ?');
    $stmt->execute([$key]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$row || ($now - (int)$row['window_start']) > $windowSeconds) {
        $pdo->prepare('INSERT INTO rate_limits (bucket_key, count, window_start) VALUES (?, 1, ?)
            ON CONFLICT(bucket_key) DO UPDATE SET count = 1, window_start = excluded.window_start')
            ->execute([$key, $now]);
        return true;
    }

    if ((int)$row['count'] >= $maxHits) {
        return false;
    }

    $pdo->prepare('UPDATE rate_limits SET count = count + 1 WHERE bucket_key = ?')->execute([$key]);
    return true;
}

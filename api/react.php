<?php
declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

$allowed = APP_CONFIG['allowed_reactions'];

function reaction_counts(PDO $pdo, array $allowed): array
{
    $counts = array_fill_keys($allowed, 0);
    $stmt = $pdo->query('SELECT emoji, COUNT(*) AS n FROM reactions GROUP BY emoji');
    foreach ($stmt->fetchAll(PDO::FETCH_ASSOC) as $row) {
        if (array_key_exists($row['emoji'], $counts)) {
            $counts[$row['emoji']] = (int)$row['n'];
        }
    }
    return $counts;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $visitorId = clean_visitor_id((string)($_GET['visitorId'] ?? ''));
    $reacted = [];
    if ($visitorId !== '') {
        $stmt = db()->prepare('SELECT emoji FROM reactions WHERE visitor_id = ?');
        $stmt->execute([$visitorId]);
        $reacted = array_column($stmt->fetchAll(PDO::FETCH_ASSOC), 'emoji');
    }
    json_response(['counts' => reaction_counts(db(), $allowed), 'reacted' => $reacted]);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(['error' => 'Method not allowed'], 405);
}

if (!rate_limit('react', 30, 60)) {
    json_response(['error' => 'Too many reactions.'], 429);
}

$body = read_json_body();
$emoji = (string)($body['emoji'] ?? '');
$visitorId = clean_visitor_id((string)($body['visitorId'] ?? ''));

if (!in_array($emoji, $allowed, true) || $visitorId === '') {
    json_response(['error' => 'Invalid reaction.'], 422);
}

$pdo = db();
$stmt = $pdo->prepare('SELECT id FROM reactions WHERE emoji = ? AND visitor_id = ?');
$stmt->execute([$emoji, $visitorId]);
$existing = $stmt->fetch(PDO::FETCH_ASSOC);

if ($existing) {
    $pdo->prepare('DELETE FROM reactions WHERE id = ?')->execute([$existing['id']]);
    $reactedNow = false;
} else {
    $pdo->prepare('INSERT INTO reactions (emoji, visitor_id, ip_hash) VALUES (?, ?, ?)')
        ->execute([$emoji, $visitorId, client_ip_hash()]);
    $reactedNow = true;
}

json_response([
    'ok' => true,
    'emoji' => $emoji,
    'reacted' => $reactedNow,
    'counts' => reaction_counts($pdo, $allowed),
]);

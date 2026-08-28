<?php
declare(strict_types=1);

require __DIR__ . '/../api/bootstrap.php';

function require_login(): void
{
    if (empty($_SESSION['admin_authenticated'])) {
        header('Location: login.php');
        exit;
    }
}

function attempt_login(string $username, string $password): bool
{
    $ok = hash_equals(APP_CONFIG['admin_username'], $username)
        && password_verify($password, APP_CONFIG['admin_password_hash']);

    if ($ok) {
        session_regenerate_id(true);
        $_SESSION['admin_authenticated'] = true;
        $_SESSION['admin_username'] = $username;
    }

    return $ok;
}

function logout(): void
{
    $_SESSION = [];
    session_destroy();
}

function csrf_token(): string
{
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

function require_csrf(): void
{
    $token = (string)($_POST['csrf_token'] ?? '');
    if (empty($_SESSION['csrf_token']) || !hash_equals($_SESSION['csrf_token'], $token)) {
        http_response_code(403);
        exit('Invalid or expired form submission. Go back and try again.');
    }
}

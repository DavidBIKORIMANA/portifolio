<?php
declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(['error' => 'Method not allowed'], 405);
}

if (!rate_limit('message', 5, 3600)) {
    json_response(['error' => 'Too many messages sent. Please try again later.'], 429);
}

$body = read_json_body();

// Honeypot field — real visitors never fill a hidden field named "website".
if (!empty($body['website'])) {
    json_response(['ok' => true]);
}

$name = trim((string)($body['name'] ?? ''));
$email = trim((string)($body['email'] ?? ''));
$message = trim((string)($body['message'] ?? ''));

if ($name === '' || $email === '' || $message === '') {
    json_response(['error' => 'All fields are required.'], 422);
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    json_response(['error' => 'Please enter a valid email address.'], 422);
}
if (mb_strlen($name) > 120 || mb_strlen($email) > 190 || mb_strlen($message) > 5000) {
    json_response(['error' => 'One of the fields is too long.'], 422);
}

$stmt = db()->prepare(
    'INSERT INTO messages (name, email, message, ip_hash) VALUES (?, ?, ?, ?)'
);
$stmt->execute([$name, $email, $message, client_ip_hash()]);

json_response(['ok' => true]);

<?php
declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(['error' => 'Method not allowed'], 405);
}

if (!rate_limit('track', 60, 60)) {
    json_response(['ok' => true]); // fail open/quiet — never surface rate limiting to the client
}

$body = read_json_body();

$page = mb_substr((string)($body['page'] ?? '/'), 0, 255);
$referrer = mb_substr((string)($body['referrer'] ?? ''), 0, 500);
$visitorId = clean_visitor_id((string)($body['visitorId'] ?? ''));
$userAgent = mb_substr($_SERVER['HTTP_USER_AGENT'] ?? '', 0, 300);

$stmt = db()->prepare(
    'INSERT INTO visits (page, referrer, user_agent, ip_hash, visitor_id) VALUES (?, ?, ?, ?, ?)'
);
$stmt->execute([$page, $referrer, $userAgent, client_ip_hash(), $visitorId]);

json_response(['ok' => true]);

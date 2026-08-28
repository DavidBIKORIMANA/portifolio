<?php
declare(strict_types=1);

require __DIR__ . '/auth.php';

if (!empty($_SESSION['admin_authenticated'])) {
    header('Location: index.php');
    exit;
}

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    require_csrf();
    if (!rate_limit('admin_login', 8, 300)) {
        $error = 'Too many attempts. Please wait a few minutes and try again.';
    } else {
        $username = (string)($_POST['username'] ?? '');
        $password = (string)($_POST['password'] ?? '');
        if (attempt_login($username, $password)) {
            header('Location: index.php');
            exit;
        }
        $error = 'Invalid username or password.';
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="robots" content="noindex, nofollow">
<title>Admin login — David Bikorimana</title>
<link rel="stylesheet" href="assets/admin.css">
</head>
<body>
<div class="login-shell">
  <form class="login-box" method="post" novalidate>
    <h1>Admin login</h1>
    <?php if ($error !== ''): ?>
      <div class="alert alert-error"><?= htmlspecialchars($error) ?></div>
    <?php endif; ?>
    <input type="hidden" name="csrf_token" value="<?= htmlspecialchars(csrf_token()) ?>">
    <div class="field">
      <label for="username">Username</label>
      <input type="text" id="username" name="username" autocomplete="username" required autofocus>
    </div>
    <div class="field">
      <label for="password">Password</label>
      <input type="password" id="password" name="password" autocomplete="current-password" required>
    </div>
    <button type="submit" class="login-submit">Log in</button>
  </form>
</div>
</body>
</html>

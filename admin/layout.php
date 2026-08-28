<?php
declare(strict_types=1);

function admin_header(string $active): void
{
    $items = [
        'index'     => ['Overview', 'index.php'],
        'messages'  => ['Messages', 'messages.php'],
        'reactions' => ['Reactions', 'reactions.php'],
    ];
    ?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="robots" content="noindex, nofollow">
<title>Admin — David Bikorimana</title>
<link rel="stylesheet" href="assets/admin.css">
</head>
<body>
<header class="admin-nav">
  <div class="wrap admin-nav-inner">
    <div class="admin-brand">david<span>/</span>admin</div>
    <ul class="admin-links">
      <?php foreach ($items as $key => [$label, $href]): ?>
        <li><a class="<?= $key === $active ? 'is-active' : '' ?>" href="<?= htmlspecialchars($href) ?>"><?= htmlspecialchars($label) ?></a></li>
      <?php endforeach; ?>
    </ul>
    <a class="admin-logout" href="logout.php">Log out</a>
  </div>
</header>
<main class="admin-main">
  <div class="wrap">
<?php
}

function admin_footer(): void
{
    ?>
  </div>
</main>
</body>
</html>
<?php
}

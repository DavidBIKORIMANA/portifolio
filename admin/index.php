<?php
declare(strict_types=1);

require __DIR__ . '/auth.php';
require_login();
require __DIR__ . '/layout.php';

$pdo = db();

$totalVisits = (int)$pdo->query('SELECT COUNT(*) FROM visits')->fetchColumn();
$uniqueVisitors = (int)$pdo->query("SELECT COUNT(DISTINCT visitor_id) FROM visits WHERE visitor_id != ''")->fetchColumn();
$totalMessages = (int)$pdo->query('SELECT COUNT(*) FROM messages')->fetchColumn();
$unreadMessages = (int)$pdo->query('SELECT COUNT(*) FROM messages WHERE is_read = 0')->fetchColumn();
$totalReactions = (int)$pdo->query('SELECT COUNT(*) FROM reactions')->fetchColumn();
$todayVisits = (int)$pdo->query("SELECT COUNT(*) FROM visits WHERE date(visited_at) = date('now')")->fetchColumn();

// Last 14 days of visits for the bar chart.
$daily = $pdo->query("
    SELECT date(visited_at) AS d, COUNT(*) AS n
    FROM visits
    WHERE visited_at >= datetime('now', '-13 days')
    GROUP BY d
    ORDER BY d ASC
")->fetchAll(PDO::FETCH_KEY_PAIR);

$days = [];
for ($i = 13; $i >= 0; $i--) {
    $d = date('Y-m-d', strtotime("-{$i} days"));
    $days[$d] = (int)($daily[$d] ?? 0);
}
$maxDay = max(1, ...array_values($days));

$topPages = $pdo->query("
    SELECT page, COUNT(*) AS n FROM visits GROUP BY page ORDER BY n DESC LIMIT 8
")->fetchAll(PDO::FETCH_ASSOC);

$topReferrers = $pdo->query("
    SELECT NULLIF(referrer, '') AS referrer, COUNT(*) AS n
    FROM visits WHERE referrer IS NOT NULL AND referrer != ''
    GROUP BY referrer ORDER BY n DESC LIMIT 8
")->fetchAll(PDO::FETCH_ASSOC);

$recentMessages = $pdo->query("
    SELECT id, created_at, name, email, message, is_read FROM messages ORDER BY id DESC LIMIT 5
")->fetchAll(PDO::FETCH_ASSOC);

admin_header('index');
?>
<h1>Overview</h1>
<p class="subtitle">Traffic, messages, and reactions across your portfolio.</p>

<div class="stat-grid">
  <div class="stat-cell"><div class="stat-n"><?= $totalVisits ?></div><div class="stat-k">Total page views</div></div>
  <div class="stat-cell"><div class="stat-n"><?= $uniqueVisitors ?></div><div class="stat-k">Unique visitors</div></div>
  <div class="stat-cell"><div class="stat-n"><?= $todayVisits ?></div><div class="stat-k">Views today</div></div>
  <div class="stat-cell"><div class="stat-n"><?= $totalReactions ?></div><div class="stat-k">Total reactions</div></div>
</div>

<div class="panel">
  <h2>Visits — last 14 days</h2>
  <div class="bars">
    <?php foreach ($days as $d => $n): ?>
      <div class="bar" style="height:<?= max(2, (int)round(($n / $maxDay) * 120)) ?>px" title="<?= htmlspecialchars($d) ?>: <?= $n ?>"></div>
    <?php endforeach; ?>
  </div>
  <div class="bar-labels">
    <?php foreach ($days as $d => $n): ?>
      <span><?= htmlspecialchars(date('j/n', strtotime($d))) ?></span>
    <?php endforeach; ?>
  </div>
</div>

<div class="panel">
  <h2>Messages <?= $unreadMessages > 0 ? '<span class="badge badge-new">' . $unreadMessages . ' new</span>' : '' ?></h2>
  <?php if (!$recentMessages): ?>
    <div class="empty">No messages yet.</div>
  <?php else: ?>
    <table>
      <thead><tr><th>From</th><th>Message</th><th>Received</th><th></th></tr></thead>
      <tbody>
        <?php foreach ($recentMessages as $m): ?>
          <tr>
            <td><strong><?= htmlspecialchars($m['name']) ?></strong><br><span class="pill"><?= htmlspecialchars($m['email']) ?></span></td>
            <td><?= htmlspecialchars(mb_strimwidth($m['message'], 0, 90, '…')) ?></td>
            <td><?= htmlspecialchars($m['created_at']) ?></td>
            <td><?= $m['is_read'] ? '<span class="badge badge-read">Read</span>' : '<span class="badge badge-new">New</span>' ?></td>
          </tr>
        <?php endforeach; ?>
      </tbody>
    </table>
    <p style="margin-top:16px;"><a class="btn" href="messages.php">View all messages →</a></p>
  <?php endif; ?>
</div>

<div class="panel">
  <h2>Top pages</h2>
  <?php if (!$topPages): ?>
    <div class="empty">No traffic recorded yet.</div>
  <?php else: ?>
    <table>
      <thead><tr><th>Page</th><th>Views</th></tr></thead>
      <tbody>
        <?php foreach ($topPages as $p): ?>
          <tr><td><?= htmlspecialchars($p['page']) ?></td><td><?= $p['n'] ?></td></tr>
        <?php endforeach; ?>
      </tbody>
    </table>
  <?php endif; ?>
</div>

<div class="panel">
  <h2>Top referrers</h2>
  <?php if (!$topReferrers): ?>
    <div class="empty">No referrer data yet.</div>
  <?php else: ?>
    <table>
      <thead><tr><th>Referrer</th><th>Views</th></tr></thead>
      <tbody>
        <?php foreach ($topReferrers as $r): ?>
          <tr><td><?= htmlspecialchars($r['referrer']) ?></td><td><?= $r['n'] ?></td></tr>
        <?php endforeach; ?>
      </tbody>
    </table>
  <?php endif; ?>
</div>
<?php admin_footer(); ?>

<?php
declare(strict_types=1);

require __DIR__ . '/auth.php';
require_login();
require __DIR__ . '/layout.php';

$pdo = db();
$allowed = APP_CONFIG['allowed_reactions'];

$counts = array_fill_keys($allowed, 0);
foreach ($pdo->query('SELECT emoji, COUNT(*) AS n FROM reactions GROUP BY emoji')->fetchAll(PDO::FETCH_ASSOC) as $row) {
    if (array_key_exists($row['emoji'], $counts)) {
        $counts[$row['emoji']] = (int)$row['n'];
    }
}

$recent = $pdo->query('SELECT created_at, emoji, visitor_id FROM reactions ORDER BY id DESC LIMIT 100')->fetchAll(PDO::FETCH_ASSOC);

admin_header('reactions');
?>
<h1>Reactions</h1>
<p class="subtitle">Every reaction left on the site, most recent first.</p>

<div class="panel">
  <h2>Totals</h2>
  <div class="emoji-list">
    <?php foreach ($counts as $emoji => $n): ?>
      <div class="emoji-item">
        <div class="e"><?= $emoji ?></div>
        <div class="n"><?= $n ?></div>
      </div>
    <?php endforeach; ?>
  </div>
</div>

<div class="panel">
  <h2>Recent activity</h2>
  <?php if (!$recent): ?>
    <div class="empty">No reactions yet.</div>
  <?php else: ?>
    <table>
      <thead><tr><th>When</th><th>Reaction</th><th>Visitor</th></tr></thead>
      <tbody>
        <?php foreach ($recent as $r): ?>
          <tr>
            <td><?= htmlspecialchars($r['created_at']) ?></td>
            <td style="font-size:1.2rem;"><?= $r['emoji'] ?></td>
            <td><span class="pill"><?= htmlspecialchars(substr($r['visitor_id'], 0, 12)) ?></span></td>
          </tr>
        <?php endforeach; ?>
      </tbody>
    </table>
  <?php endif; ?>
</div>
<?php admin_footer(); ?>

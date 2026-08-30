<?php
declare(strict_types=1);

require __DIR__ . '/auth.php';
require_login();
require __DIR__ . '/layout.php';

$pdo = db();
$allowed = APP_CONFIG['allowed_reactions'];

$icons = [
    'like'  => 'fa-thumbs-up',
    'love'  => 'fa-heart',
    'boost' => 'fa-rocket',
    'fire'  => 'fa-fire',
    'idea'  => 'fa-lightbulb',
];

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
    <?php foreach ($counts as $key => $n): ?>
      <?php $icon = $icons[$key] ?? 'fa-circle'; ?>
      <div class="emoji-item">
        <div class="e"><i class="fa-solid <?= htmlspecialchars($icon) ?>" aria-hidden="true"></i></div>
        <div class="label"><?= htmlspecialchars($key) ?></div>
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
          <?php
            $key = $r['emoji'];
            $icon = $icons[$key] ?? 'fa-circle';
          ?>
          <tr>
            <td><?= htmlspecialchars($r['created_at']) ?></td>
            <td><i class="fa-solid <?= htmlspecialchars($icon) ?>" aria-hidden="true"></i> <?= htmlspecialchars($key) ?></td>
            <td><span class="pill"><?= htmlspecialchars(substr($r['visitor_id'], 0, 12)) ?></span></td>
          </tr>
        <?php endforeach; ?>
      </tbody>
    </table>
  <?php endif; ?>
</div>
<?php admin_footer(); ?>

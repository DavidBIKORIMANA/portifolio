<?php
declare(strict_types=1);

require __DIR__ . '/auth.php';
require_login();

$pdo = db();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    require_csrf();
    $id = (int)($_POST['id'] ?? 0);
    $action = (string)($_POST['action'] ?? '');
    if ($id > 0 && $action === 'mark_read') {
        $pdo->prepare('UPDATE messages SET is_read = 1 WHERE id = ?')->execute([$id]);
    } elseif ($id > 0 && $action === 'delete') {
        $pdo->prepare('DELETE FROM messages WHERE id = ?')->execute([$id]);
    }
    header('Location: messages.php');
    exit;
}

require __DIR__ . '/layout.php';

$messages = $pdo->query('SELECT * FROM messages ORDER BY id DESC')->fetchAll(PDO::FETCH_ASSOC);

admin_header('messages');
?>
<h1>Messages</h1>
<p class="subtitle">Everything submitted through the contact form.</p>

<div class="panel">
  <?php if (!$messages): ?>
    <div class="empty">No messages yet.</div>
  <?php else: ?>
    <table>
      <thead><tr><th>Status</th><th>From</th><th>Message</th><th>Received</th><th>Actions</th></tr></thead>
      <tbody>
        <?php foreach ($messages as $m): ?>
          <tr>
            <td><?= $m['is_read'] ? '<span class="badge badge-read">Read</span>' : '<span class="badge badge-new">New</span>' ?></td>
            <td><strong><?= htmlspecialchars($m['name']) ?></strong><br><a class="pill" href="mailto:<?= htmlspecialchars($m['email']) ?>"><?= htmlspecialchars($m['email']) ?></a></td>
            <td style="max-width:360px; white-space:pre-wrap;"><?= htmlspecialchars($m['message']) ?></td>
            <td><?= htmlspecialchars($m['created_at']) ?></td>
            <td class="row-actions">
              <?php if (!$m['is_read']): ?>
                <form method="post" style="display:inline;">
                  <input type="hidden" name="csrf_token" value="<?= htmlspecialchars(csrf_token()) ?>">
                  <input type="hidden" name="id" value="<?= (int)$m['id'] ?>">
                  <input type="hidden" name="action" value="mark_read">
                  <button type="submit" class="btn">Mark read</button>
                </form>
              <?php endif; ?>
              <form method="post" style="display:inline;" onsubmit="return confirm('Delete this message permanently?');">
                <input type="hidden" name="csrf_token" value="<?= htmlspecialchars(csrf_token()) ?>">
                <input type="hidden" name="id" value="<?= (int)$m['id'] ?>">
                <input type="hidden" name="action" value="delete">
                <button type="submit" class="btn btn-danger">Delete</button>
              </form>
            </td>
          </tr>
        <?php endforeach; ?>
      </tbody>
    </table>
  <?php endif; ?>
</div>
<?php admin_footer(); ?>

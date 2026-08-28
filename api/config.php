<?php
declare(strict_types=1);

// Change these to secure the admin dashboard and the IP-hashing salt.
// Regenerate the hash with: php -r "echo password_hash('yourpassword', PASSWORD_DEFAULT);"
return [
    'admin_username'    => 'admin',
    'admin_password_hash' => '$2y$10$K.oMA/IaL0eHEg/Cqen4x.7Iwbv7cH2psvDlWtcGY.Fisd19ERhla',
    'ip_salt'           => 'e77d1133175e1b15c0d2cc8b998254a61adb92dc137b024a',
    'allowed_reactions' => ['👍', '❤️', '🚀', '🔥', '💡'],
];

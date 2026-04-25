CREATE TABLE IF NOT EXISTS `players` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `auth_user_id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `username` VARCHAR(120) NULL,
    `display_name` VARCHAR(120) NULL,
    `roles_json` JSON NOT NULL,
    `auth_type` VARCHAR(20) NOT NULL DEFAULT 'frontpage',
    `is_guest` TINYINT(1) NOT NULL DEFAULT 0,
    `created_at` DATETIME NOT NULL,
    `updated_at` DATETIME NOT NULL,
    `last_seen_at` DATETIME NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_players_auth_user_id` (`auth_user_id`),
    KEY `idx_players_guest` (`is_guest`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `game_saves` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `auth_user_id` VARCHAR(191) NOT NULL,
    `game_state_json` JSON NOT NULL,
    `created_at` DATETIME NOT NULL,
    `updated_at` DATETIME NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_game_saves_auth_user_id` (`auth_user_id`),
    CONSTRAINT `fk_game_saves_player` FOREIGN KEY (`auth_user_id`) REFERENCES `players` (`auth_user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

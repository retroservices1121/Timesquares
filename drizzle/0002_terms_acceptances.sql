CREATE TABLE IF NOT EXISTS `terms_acceptances` (`id` text PRIMARY KEY NOT NULL,`user_id` text NOT NULL,`terms_type` text NOT NULL,`version` text NOT NULL,`accepted_at` text NOT NULL,`ip_hash` text);
CREATE UNIQUE INDEX IF NOT EXISTS `idx_terms_acceptance_user_type_version` ON `terms_acceptances` (`user_id`,`terms_type`,`version`);
CREATE INDEX IF NOT EXISTS `idx_terms_acceptance_user` ON `terms_acceptances` (`user_id`);
INSERT OR IGNORE INTO `platform_settings` (`key`,`value`,`updated_at`) VALUES ('legal_terms_version','2026-08-26-draft-1',CURRENT_TIMESTAMP),('reward_terms_version','2026-08-26-draft-1',CURRENT_TIMESTAMP),('reward_expiration_days','0',CURRENT_TIMESTAMP),('rewards_transferable','false',CURRENT_TIMESTAMP),('support_email','SUPPORT_EMAIL',CURRENT_TIMESTAMP),('legal_email','LEGAL_EMAIL',CURRENT_TIMESTAMP),('governing_state','GOVERNING_STATE',CURRENT_TIMESTAMP);
PRAGMA optimize;

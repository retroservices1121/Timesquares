CREATE TABLE IF NOT EXISTS `checkout_intents` (
  `id` text PRIMARY KEY NOT NULL,
  `clerk_user_id` text NOT NULL,
  `email` text,
  `requested_slot` integer NOT NULL,
  `assigned_slot` integer NOT NULL,
  `mode` text NOT NULL,
  `amount_cents` integer NOT NULL,
  `status` text NOT NULL,
  `checkout_session_id` text,
  `payment_id` text,
  `created_at` text NOT NULL
);
CREATE INDEX IF NOT EXISTS `idx_checkout_intents_user` ON `checkout_intents` (`clerk_user_id`);
CREATE INDEX IF NOT EXISTS `idx_checkout_intents_status` ON `checkout_intents` (`status`);
CREATE TABLE IF NOT EXISTS `live_placements` (
  `slot` integer PRIMARY KEY NOT NULL,
  `clerk_user_id` text,
  `owner_email` text,
  `amount_cents` integer NOT NULL,
  `intent_id` text,
  `updated_at` text NOT NULL
);
CREATE TABLE IF NOT EXISTS `webhook_events` (
  `id` text PRIMARY KEY NOT NULL,
  `type` text NOT NULL,
  `processed_at` text NOT NULL
);
WITH RECURSIVE slots(slot) AS (SELECT 1 UNION ALL SELECT slot + 1 FROM slots WHERE slot < 30)
INSERT OR IGNORE INTO `live_placements` (`slot`,`amount_cents`,`updated_at`)
SELECT slot, CASE slot WHEN 1 THEN 1250000 WHEN 2 THEN 842000 WHEN 3 THEN 618000 WHEN 4 THEN 490000 WHEN 5 THEN 374000 ELSE MAX(44000, 320000 - ((slot - 6) * 11500)) END, CURRENT_TIMESTAMP FROM slots;
PRAGMA optimize;

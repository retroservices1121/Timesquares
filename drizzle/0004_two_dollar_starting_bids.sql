UPDATE `live_placements`
SET `amount_cents` = 200,
    `updated_at` = CURRENT_TIMESTAMP
WHERE `clerk_user_id` IS NULL
  AND `owner_email` IS NULL
  AND `intent_id` IS NULL;

PRAGMA optimize;

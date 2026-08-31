WITH RECURSIVE slots(slot) AS (
  SELECT 31
  UNION ALL
  SELECT slot + 1 FROM slots WHERE slot < 36
)
INSERT OR IGNORE INTO `live_placements` (`slot`,`amount_cents`,`updated_at`)
SELECT slot, 25000, CURRENT_TIMESTAMP FROM slots;

PRAGMA optimize;

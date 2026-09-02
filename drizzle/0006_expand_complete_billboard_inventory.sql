WITH RECURSIVE slots(slot) AS (
  SELECT 65
  UNION ALL
  SELECT slot + 1 FROM slots WHERE slot < 103
)
INSERT OR IGNORE INTO `live_placements` (`slot`,`amount_cents`,`updated_at`)
SELECT slot, 200, CURRENT_TIMESTAMP FROM slots;

PRAGMA optimize;

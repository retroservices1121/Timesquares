UPDATE real_world_reward_types SET active = 0;
INSERT OR REPLACE INTO platform_settings (key,value,updated_at) VALUES
('real_world_rewards_enabled','false',datetime('now')),
('real_world_rewards_publicly_promoted','false',datetime('now')),
('real_world_claiming_enabled','false',datetime('now')),
('real_billboard_booking_enabled','true',datetime('now')),
('real_billboard_sale_price_cents','75000',datetime('now')),
('real_billboard_provider_cost_cents','50000',datetime('now')),
('real_billboard_duration_seconds','15',datetime('now')),
('real_billboard_estimated_plays','24',datetime('now')),
('real_billboard_timezone','America/New_York',datetime('now')),
('real_billboard_minimum_lead_days','5',datetime('now')),
('real_billboard_credit_program_enabled','false',datetime('now')),
('real_billboard_cancellation_policy','Real Times Square package cancellations and refunds are governed by the package terms accepted at checkout.',datetime('now'));
CREATE TABLE IF NOT EXISTS real_billboard_campaigns (
 id TEXT PRIMARY KEY, slug TEXT NOT NULL UNIQUE, user_id TEXT NOT NULL, advertiser_name TEXT NOT NULL,
 advertiser_email TEXT, website TEXT, social_links_json TEXT NOT NULL DEFAULT '{}', status TEXT NOT NULL DEFAULT 'pending_payment',
 preferred_date_1 TEXT, preferred_date_2 TEXT, preferred_date_3 TEXT, campaign_start_datetime TEXT, campaign_end_datetime TEXT,
 timezone TEXT NOT NULL DEFAULT 'America/New_York', scheduled_minute INTEGER CHECK(scheduled_minute BETWEEN 0 AND 59),
 duration_seconds INTEGER NOT NULL DEFAULT 15, creative_file_url TEXT, creative_headline TEXT, checkout_session_id TEXT, payment_id TEXT,
 sale_price_cents INTEGER NOT NULL DEFAULT 75000, provider_id TEXT, provider_booking_reference TEXT, provider_cost_cents INTEGER,
 admin_notes TEXT, terms_version TEXT NOT NULL, completed_at TEXT, created_at TEXT NOT NULL, updated_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_real_billboard_campaign_user ON real_billboard_campaigns(user_id);
CREATE INDEX IF NOT EXISTS idx_real_billboard_campaign_status ON real_billboard_campaigns(status);
CREATE TABLE IF NOT EXISTS real_billboard_evidence (id TEXT PRIMARY KEY,campaign_id TEXT NOT NULL REFERENCES real_billboard_campaigns(id),type TEXT NOT NULL,file_url TEXT,external_url TEXT,notes TEXT,created_at TEXT NOT NULL);
CREATE INDEX IF NOT EXISTS idx_real_billboard_evidence_campaign ON real_billboard_evidence(campaign_id);

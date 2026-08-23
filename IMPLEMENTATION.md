# V1 implementation checklist
- [x] Responsive public square with ranked interactive billboards
- [x] Accessible 2D leaderboard fallback
- [x] Identity-aware dashboard and analytics overview
- [x] Bid projection and secure-payment handoff UI
- [x] Ranking, minimum-takeover, and URL-safety domain logic
- [x] Durable relational schema and creative object storage binding
- [ ] Connect Stripe merchant account and signed webhook
- [ ] Add moderation operators and transactional email provider
- [ ] Replace procedural city with optimized Babylon.js scene after 2D acceptance

Security boundary: clients can propose bids, but only a verified server-side payment webhook may activate one. Ranking and placement writes must occur in one database transaction with a final minimum-bid recheck.

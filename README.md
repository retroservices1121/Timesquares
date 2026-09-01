# Timesquares.lol
A competitive advertising marketplace where rank becomes a living city. Bid more, move up, and earn a more prominent billboard; when outbid, the advertiser moves down instead of disappearing.

## Included
Interactive public square, 2D leaderboard, identity-aware dashboard, analytics surface, bid projection, responsive views, durable D1/R2 architecture, ranking helpers, URL safety, and a normalized marketplace schema.

## Local development
Copy `.env.example` to `.env.local`, fill the services used by your deployment, then run `npm run dev`. Run `npm run build`, `npm run lint`, and `npm run db:generate` before release.

## Architecture
The ranking engine is independent of rendering. A server-verified active bid produces a sorted rank; ranks 1–64 map to stable billboard identifiers. Creative bytes belong in object storage, with metadata and ownership in the relational database. Payments must be confirmed through a signed webhook and the final bid revalidated while activation and placement history update atomically.

## Production deployment
The application currently targets Cloudflare Workers with D1 and R2 bindings. See [DEPLOYMENT.md](./DEPLOYMENT.md) for the production checklist, environment variables, database migrations, webhook routes, and domain cutover plan.

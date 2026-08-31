# Timesquares.lol production deployment

## Recommended platform

Use Cloudflare Workers for the current application. The server routes already use Cloudflare Workers bindings, D1 for relational data, and R2 for advertiser creative files. Moving to Vercel or Railway would require replacing those integrations before the application could run there safely.

Keep the existing Sites deployment active until the independent production resources below have been provisioned, migrated, and verified.

## Production resources

- Cloudflare Worker application
- D1 database bound as `DB`
- R2 bucket bound as `FILES`
- GitHub repository connected to Cloudflare Workers Builds
- Custom domain `timesquares.lol`
- Clerk production application
- Dodo Payments live product and webhook
- Resend sending domain
- DataFast production website

## Build settings

- Node.js: 22.13 or newer
- Install command: `npm ci`
- Build command: `npm run build`
- Worker entry point: `dist/server/index.js`
- Static assets directory: `dist/client`
- Compatibility flag: `nodejs_compat`

The current `.openai/hosting.json` is used by the existing Sites deployment. Do not delete it until the Cloudflare cutover is complete.

## Database

Apply the SQL migrations in order:

1. `drizzle/0000_hybrid_bidding.sql`
2. `drizzle/0001_real_times_square_rewards.sql`
3. `drizzle/0002_terms_acceptances.sql`
4. `drizzle/0003_expand_billboard_slots.sql`

Back up and export production data before moving traffic. Verify bid rankings, checkout intents, qualifying-spend events, real-world rewards, and terms acceptances after import.

## Environment variables

Configure every value from `.env.example`, plus:

- `ADMIN_EMAILS`
- `SUPPORT_EMAIL`
- `LEGAL_EMAIL`
- `LEGAL_BUSINESS_NAME`
- `GOVERNING_STATE`
- `REWARD_EXPIRATION_DAYS`
- `REWARDS_TRANSFERABLE`

Never commit secrets to GitHub. Set `NEXT_PUBLIC_` variables for both preview and production builds because they are embedded into client assets.

## External services

### Clerk

- Add the production domain and callback URLs.
- Use the production publishable and secret keys.
- Verify sign-in, sign-out, dashboard access, and admin authorization.

### Dodo Payments

- Use the live product ID and API key.
- Point the signed webhook to `https://timesquares.lol/api/webhooks/dodo`.
- Verify successful, duplicate, refunded, and disputed payment events before launch.

### Resend

- Verify the sending domain.
- Configure `RESEND_FROM_EMAIL` and `RESEND_API_KEY`.
- Confirm outbid and reward-progress messages in production.

### DataFast

- Configure the production website ID and domain.
- Verify billboard selections, clicks, and checkout goals.

## Cutover checklist

1. Deploy from a non-production branch and verify the full application.
2. Apply all D1 migrations and import any existing data.
3. Test Clerk, Dodo webhooks, R2 uploads, Resend, and DataFast.
4. Confirm mobile 3D performance and billboard interaction.
5. Add `timesquares.lol` to the Worker and update DNS.
6. Update Clerk, Dodo, and analytics production URLs.
7. Keep the previous deployment available until payments and webhooks are confirmed.

## Required pre-launch review

- Complete attorney review of Terms, Privacy, Advertising Rules, and Real Times Square Reward Terms.
- Replace `GOVERNING_STATE` and any remaining legal placeholders.
- Confirm the physical billboard provider, package, creative rules, and reward economics.

## Bitcoin Explorer

This project has been created using [Next.js](https://nextjs.org/), TypeScript, [Supabase](https://supabase.com/) for database and [Tailwind CSS](https://tailwindcss.com/) for styling using CSS Modules, which retrieves address and transaction information from the BTC blockchain. It also uses GitHub actions for running cron job and Supabase's realtime database, in order to listen for changes and display notifications to the user on subscribed hashes.

### Setup

1. Create a account on Supabase, with the following [configuration](#database-configuration) ([docs](https://supabase.com/docs/guides/with-nextjs)).
2. Copy `.env.example` into `.env` file.
3. Install the dependencies using `yarn` command.
4. Run the development server using `yarn dev` command.
5. Checkout [`http://localhost:3000`](http://localhost:3000).

#### Database configuration

After creating the account on Supabase, you'll need to configure following tables and columns:

`subscription`:
| Column | `id` | `created_at` | `user` | `hash` | `type` |
| :----: | :--: | :----------: | :----: | :----: | :----: |
| Type | `uuid` | `timestamptz` | `text` | `text` | `text` |

### Tests and Cypress

This project uses Cypress for E2E tests, to run them you'll need to use `yarn cypress` command (`yarn e2e` will run both development server and Cypress concurrently).

# Down To The Detail

Next.js App Router site for Down To The Detail, with Auth.js credentials login,
Prisma/PostgreSQL persistence, account dashboards, public availability, and
booking requests.

## Local Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create `.env` from `.env.example` and set `DATABASE_URL` and `AUTH_SECRET`.

3. Push or migrate the Prisma schema:

   ```bash
   npx prisma db push
   ```

4. Start the app:

   ```bash
   npm run dev
   ```

## Useful Commands

```bash
npm run build
npx prisma generate
npx prisma validate
```

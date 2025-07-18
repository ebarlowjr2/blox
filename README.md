This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### 1. Configure Supabase

Before running the application, you need to set up your Supabase credentials:

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Create a new project or select an existing one
3. Navigate to **Settings > API**
4. Copy your **Project URL** and **anon/public key**
5. Update the `.env.local` file with your actual credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-actual-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-actual-anon-key-here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 2. Install Dependencies and Run

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Authentication

This application uses Supabase for authentication with magic link email login:

1. Users enter their email on the login page
2. Supabase sends a magic link to their email
3. Clicking the link authenticates the user and redirects to the dashboard
4. The middleware protects dashboard routes and redirects unauthenticated users to login

**Important**: Magic link authentication requires real Supabase credentials. The placeholder values in `.env.local` will not work for actual authentication.

**Supabase Configuration for Deployment:**
When deploying to a production server, you must update your Supabase project settings:
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project → Authentication → URL Configuration
3. Add your production URL to "Redirect URLs": `http://your-server-url/auth/callback`
4. For this deployment, add: `http://3.137.178.229/auth/callback`

## N8N AI CEO Integration

The BLOX frontend integrates with your self-hosted N8N AI CEO. To configure:

1. Ensure your N8N agent is running and accessible
2. Add the N8N agent URL to your `.env.local`:
   ```
   N8N_AGENT_URL=http://your-n8n-agent-url
   ```
3. The chat interface will automatically route messages to your N8N workflow

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

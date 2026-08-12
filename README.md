# Big House Restaurant — No Database Version

A premium restaurant website built with **Next.js 14**, **React**, **TypeScript**, **Tailwind CSS**, **Three.js**, and **JSON files** (no database required).

## What's Different?

- **NO PostgreSQL** — All data stored in JSON files (`src/data/`)
- **NO Prisma** — Zero database configuration
- **NO migrations** — Data persists in JSON files during runtime
- **Same features** — Admin dashboard, reservations, menu, gallery, reviews, contact, emails

## Features

- Premium frontend with 3D animated hero, smooth animations
- Full admin dashboard at `/admin`
- Reservation system with email notifications
- Contact form with email notifications
- Menu, gallery, reviews management
- WhatsApp integration
- Responsive design
- SEO optimized

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- React Three Fiber + Three.js
- Resend (email)
- JSON file storage

## Environment Variables (Only 6 needed!)

| Variable | Required | Description |
|---|---|---|
| `AUTH_SECRET` | ✅ | Any random string (32+ chars) |
| `ADMIN_USERNAME` | ✅ | Admin login username |
| `ADMIN_PASSWORD` | ✅ | Admin login password (plain text) |
| `ADMIN_EMAIL` | ✅ | Your email for notifications |
| `RESEND_API_KEY` | ✅ | From resend.com (starts with `re_`) |
| `FROM_EMAIL` | ❌ | `onboarding@resend.dev` (default) |
| `NEXT_PUBLIC_BASE_URL` | ❌ | Your site URL |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | ❌ | WhatsApp number |

## Deploy to Render

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/big-house-restaurant.git
git push -u origin main
```

### 2. Create Web Service on Render
- Go to [dashboard.render.com](https://dashboard.render.com)
- New + → Web Service
- Connect your GitHub repo
- **Name**: `big-house-restaurant`
- **Runtime**: Node
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`
- **Plan**: Free

### 3. Add Environment Variables
In your Web Service → Environment:

| Key | Value |
|---|---|
| `AUTH_SECRET` | `AnyRandomString32CharsOrMore123456` |
| `ADMIN_USERNAME` | `admin` |
| `ADMIN_PASSWORD` | `YourSecurePassword123` |
| `ADMIN_EMAIL` | `youremail@gmail.com` |
| `RESEND_API_KEY` | `re_xxxxxxxxxxxxxxxxxxxxxxxx` |
| `FROM_EMAIL` | `onboarding@resend.dev` |
| `NEXT_PUBLIC_BASE_URL` | `https://your-app.onrender.com` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | `213793393030` |

Click **Save Changes**.

### 4. Done!
Wait 2-3 minutes for deploy. Your site is live!

- Website: `https://your-app.onrender.com`
- Admin: `https://your-app.onrender.com/admin`
- Health check: `https://your-app.onrender.com/api/health`

## Admin Login

- URL: `/admin`
- Username: whatever you set in `ADMIN_USERNAME`
- Password: whatever you set in `ADMIN_PASSWORD`

## Email Setup (Resend)

1. Go to [resend.com](https://resend.com)
2. Sign up and verify email
3. Go to API Keys → Create API Key
4. Copy the key (starts with `re_`)
5. Paste in Render environment variables

> With `onboarding@resend.dev`, emails only send to your Resend signup email. For production, verify a custom domain.

## Data Storage

All data is stored in JSON files in `src/data/`:
- `menu.json` — Menu items
- `gallery.json` — Gallery images
- `reviews.json` — Customer reviews
- `reservations.json` — Reservations
- `contacts.json` — Contact messages
- `settings.json` — Restaurant settings

On Render free tier, data persists during the instance lifetime. For permanent storage, back up these files periodically.

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Troubleshooting

**502 Error**: Check that all required environment variables are set.

**Build fails**: Check Render deploy logs for specific errors.

**Emails not sending**: Verify `RESEND_API_KEY` and `ADMIN_EMAIL` are correct.

## License

Proprietary — Big House Restaurant.

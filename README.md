# Prospectly — Lead Generation for Web Agencies

Find local businesses that need a website or digital improvements. Score, filter, and reach out at scale.

## Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **API Routes** (integrated backend)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Features

- 🔍 **Search** — Find local businesses by city, radius, and sector
- 📊 **Lead Scoring** — Auto-score every lead (No website +50, Rating<4 +20, Reviews<20 +15)
- 🔥 **Badges** — Hot (80+), Warm (50+), Cold
- 🎯 **Opportunities** — Detect: no website, low rating, low reviews, high potential
- 🔽 **Filters** — Filter by no website / low rating / low reviews
- 📩 **Auto Messages** — Generate personalized outreach per business
- 📦 **CSV Export** — Export all filtered leads
- 📋 **Copy Phone** — One-click copy phone number

## Real Data (SerpAPI)

To use real Google Maps data, add your key to `.env.local`:

```env
SERP_API_KEY=your_key_here
```

Then uncomment the SerpAPI call in `app/api/search/route.ts`.

## Deploy to Vercel

```bash
npx vercel
```

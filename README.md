# Grace on the Ashley Church Website

This is the official website for Grace on the Ashley Baptist church, dedicated to making, maturing, and multiplying disciples of Jesus.

## About

Grace on the Ashley exists to live as sent people for the purposes of reaching those without the hope of the Gospel. The Great Commission is central to our vision and mission as a local church.

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS v4
- **CMS**: Sanity for content management (posts, events, announcements)
- **Language**: TypeScript
- **Deployment**: Optimized for Vercel

## Features

- Responsive homepage with hero section, recent blog posts, upcoming events, and announcements
- Blog and events pages powered by Sanity CMS
- Optimized images and fonts
- Mobile-first design with hamburger navigation

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/joshconverse/gota-site.git
   cd gota-site
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Sanity CMS:
   - Create a Sanity project at [sanity.io](https://sanity.io)
   - Update `src/sanity/client.ts` with your project ID, dataset, and API version
   - Configure your content in Sanity Studio

4. Set up YouTube API (for homepage background images):
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Enable the YouTube Data API v3
   - Create credentials (API key)
   - Copy `.env.example` to `.env.local`
   - Add your API key: `YOUTUBE_API_KEY=your_api_key_here`

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Planning Center Calendar (optional)

This project can display events from Planning Center (Calendar API v2). To enable it locally, set one of the following environment options in your `.env.local`:

- `PLANNING_CENTER_PAT` — a Personal Access Token (recommended)
- or `PLANNING_CENTER_CLIENT_ID` and `PLANNING_CENTER_SECRET` — client credentials

There is a small probe script to inspect `event_instances` for specific event IDs (useful to confirm concrete `start_at`/`end_at` values are present):

PowerShell example:

```powershell
$env:PLANNING_CENTER_PAT = 'your_pat_here'; node scripts/probe-pco-instances.mjs
```

The script writes results to `logs/pco-instances.log` and prints a short summary to the console. The site also exposes a server-side proxy at `/api/planning-center/events` which fetches events and the next upcoming instances.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── app/                 # Next.js app router pages
│   ├── globals.css      # Global styles and Tailwind
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Homepage
├── components/          # Reusable React components
└── sanity/              # Sanity CMS integration
    ├── client.ts        # Sanity client configuration
    ├── queries.ts       # GROQ queries
    └── urlFor.ts        # Image URL helper
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run `npm run lint` to ensure code quality
5. Submit a pull request

## Deployment

The site is optimized for deployment on Vercel. Push to the main branch to trigger automatic deployments.

For manual deployment:
```bash
npm run build
npm run start
```

## TODO

- [ ] Create visit page - @username
- [ ] Create about page - @username
- [ ] Create ministries page - @username
- [ ] Create resources page - @username
- [ ] Create volunteer page - @username
- [ ] Create events page - @username
- [ ] Link the links - @username
- [ ] Add address to the "we exist to make mature and multiple disciples" section - @username
- [ ] Change the Events heading to "Get plugged in" - @username
- [ ] Include site map links at bottom of footer - @username

## License

This project is private and proprietary to Grace on the Ashley church.

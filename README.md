# Esdra's Personal Website

A modern, responsive personal website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- Modern design with smooth animations
- Responsive layout for all devices
- Interactive sections: Technologies, Projects, and Contact
- Built with Next.js 14 and TypeScript
- Styled with Tailwind CSS
- Smooth scrolling and transitions

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Payment Checkout

Configure payment links in `.env.local` to enable checkout by plan directly from the site:

```bash
NEXT_PUBLIC_PAYMENT_LINK_LANDING_EXPRESS=
NEXT_PUBLIC_PAYMENT_LINK_FUNNEL_CRM=
NEXT_PUBLIC_PAYMENT_LINK_AUTOMATION_PRO=
NEXT_PUBLIC_PAYMENT_LINK_ECOMMERCE_GROWTH=
NEXT_PUBLIC_PAYMENT_LINK_PLATFORM_CUSTOM=
```

## Deployment

The site is automatically deployed to GitHub Pages using GitHub Actions. Every push to the `main` branch triggers a new deployment.

The live site is available at: https://ezrafchev.github.io/esdra-visionary-site/

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Framer Motion
- Typed.js

# AG Design System Starter Kit

This is a simple starter kit built using the AG Design System, NextJS and Typescript. It is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

For more information about the AG Design System, please see the [documentation wesbite]([https://agriculturegovau.github.io/agds-next](https://design-system.agriculture.gov.au/)).

For examples of common user interfaces, please see the [example site](https://design-system.agriculture.gov.au/example-site).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## About Next.js

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Next.js GitHub repository](https://github.com/vercel/next.js/)

## Storybook

Storybook is installed in this starter kit. It helps you build UI components in isolation from your app's business logic, data, and context.
That makes it easy to develop hard-to-reach states. Save these UI states as **stories** to revisit during development, testing, or QA.

Run `yarn storybook` and it will open in your default browser. Browse example stories now by navigating to them in the sidebar.
Learn how stories work by browsing the `*.stories.tsx` files in the components directory of this repo.

We recommend building UIs with a [**component-driven**](https://componentdriven.org) process starting with atomic components and ending with pages.

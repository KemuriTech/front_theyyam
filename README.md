# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Firebase deployment notes

1) Copy your Firebase service account key json content
2) Save it in a Github action secret variable
3) Update https://github.com/KemuriTechnology/nuxt3-ts-tailwindui/blob/main/.github/workflows/firebase-build.yml#L15 with variable name and project id

# notes-svelte

## About this repository

This is a very simple note taking app. You create an account and then you can create / edit / delete your own notes.

This was my first shot at trying out server-side-rendering with some frontend framework (SvelteKit). I also did my first authentication, so that was pretty cool too.

Technologies used:

- SvelteKit for SSR, routing, acces to ORM, etc.
- Lucia library to make auth easy
- Postgres database for saving notes, auth users and sessions
- Prisma as an ORM
- Vite as builder
- Deployed to Vercel

## Building locally

- Clone the repo, then create .env file with database url such as:

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/notes-svelte?schema=public"
```

- Install packages:

```
npm install
```

- Push the Prisma scheme to the database:

```
npm run db:push
```

- Run development server with:

```
npm run dev
```

- Linting and prettier:

```
npm run format
npm run lint
```

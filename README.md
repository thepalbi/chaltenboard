# chaltenboard

Plan mountaineering / hiking / climbing trips, using a map as canvas, dropping markers and commenting on them.

## TODO

- [x] Add functionality to add new marker, with draggable enabled
- [x] Add sveltekit backend with sqlite
    - https://hartenfeller.dev/blog/sveltekit-with-sqlite
    - https://hartenfeller.dev/blog/sveltekit-diy-authentication-authorization
    - Use [this lib](https://github.com/WiseLibs/better-sqlite3) as the sqlite driver, that it's baked in with foreign keys enabled
- [ ] Check out some helper lib for better styling. Maybe [this](https://bulma.io/) which I don't know.
- [ ] Add ability to change map layer, and opacity of it

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

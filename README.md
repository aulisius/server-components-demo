# React Server Components Demo

- [React Server Components Demo](#react-server-components-demo)
  - [What is this?](#what-is-this)
  - [When will I be able to use this?](#when-will-i-be-able-to-use-this)
  - [Setup](#setup)
  - [Notes about this app](#notes-about-this-app)
  - [Built by (A-Z)](#built-by-a-z)
  - [License](#license)

## What is this?

This is a demo app built with Server Components, an experimental React feature. **I strongly recommend [watching the talk introducing Server Components](https://reactjs.org/server-components) before exploring this demo.** The talk includes a walkthrough of the demo code and highlights key points of how Server Components work and what features they provide.

## When will I be able to use this?

Server Components are an experimental feature and **are not ready for adoption**. For now, I recommend experimenting with Server Components via this demo app. **Use this in your projects at your own risk.**

## Setup

You will need to have nodejs >=14.9.0 in order to run this demo. [Node 14 LTS](https://nodejs.org/en/about/releases/) is a good choice!

  ```
  npm install
  npm start
  ```

(Or `npm run start:prod` for a production build.)

Then open http://localhost:4000.

## Notes about this app

The demo is a note-taking app called **codewordsgame**. It consists of a few major parts:

- It uses a Webpack plugin (not defined in this repo) that allows us to only include client components in build artifacts
- An Express server that:
  - Serves API endpoints used in the app
  - Renders Server Components into a special format that we can read on the client
- A React app containing Server and Client components used to build React Notes

This demo is built on top of a webpack plugin, but this is not how we envision using Server Components when they are stable. They are intended to be used in a framework that supports server rendering — for example, in Next.js. This is an early demo -- the real integration will be developed in the coming months. Learn more in the [announcement post](https://reactjs.org/server-components).

## Built by (A-Z)

- [Faizaan](https://aulisi.us)

## License
This demo is MIT licensed.

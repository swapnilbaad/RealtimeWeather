# RealtimeWeather

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

## Backend Setup

For this project, you will require the front-end and back-end running together.

You will also need an API Key:

- In the `backend` folder, rename `.env.sample` to `.env`
- Generate an API Key at https://www.weatherapi.com/
- Add your API Key to `backend/.env`

### Install dependencies
```
cd backend
npm install
```

### Launch the backend
```
nodemon index.js
```
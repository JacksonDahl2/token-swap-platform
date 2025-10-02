# Deployed application

Find it [here](https://token-swap-platform.vercel.app/)

# Installation/startup instructions

1. Create a env and add the following values inside

```bash
  FUNKIT_API_KEY="your api key"
  NODE_ENV="development
```

2. Install node version

```bash
  nvm use
```

3. Install node dependencies

```bash
  npm install
```

4. Run in development mode

```bash
  npm run dev
```

---

# Features

- **Token Selection**: Choose from multiple tokens (USDC, USDT, ETH, WBTC) across different chains
- **Swap Calculator**: Interactive calculator for token swaps with real-time exchange rates
- **Error Handling**: Graceful error handling for failed API calls and missing data
- **Type Safety**: Full TypeScript support with Zod schema validation
- **Testing**: Jest test suite for service functions and error scenarios
- **Mobile Friendly**: View is mobile friendly for users on their mobile devices

### Assumptions

I Read online that actual 'swaps' are based on the pool amount of each coin, and that just having an exchange rate between the two is not adequate in a real world circumstance. So I'm assuming that this is accurate enough.

I also assumed that the price returned from the server wasn't going to change that drastically during usage of this application, so it was fine to do a client side exchange calculation, as this is much more responsive than handling that calculation on the server

I assumed that the token list was just the one given, so I just hardcoded that without trying to find a list of all possible tokens

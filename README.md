# Send ITS message from avalanche-fuji to sui-test2

## Prerequisites

install dependencies:

```bash
bun install
```

Setup .env file:

```bash
PRIVATE_KEY=<evm private key>
```

## Send Deploy Message

```bash
bun run deploy
```

## Send Transfer Message

```bash
bun run transfer <tokenId>
```

This project was created using `bun init` in bun v1.1.33. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

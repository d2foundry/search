# @d2foundry/search

Tools and configs for Foundry's Search

## Goals

1. make it easier to define filter keywords, and also expose it so i can get more people working on it
~~2. have a neat way to transform/minify the bungie definitions into a space optimized/efficient search db to pipe over to the client~~
   - gonna use https://github.com/pieroxy/lz-string/ to compress the JSON
3. have a neat way to map keywords to the search db on the client side.
   - Arch for this has been solved more or less!

## Getting Started

We use [pnpm](https://pnpm.io/) as a package manager. Ensure it is first installed, and run the following after cloning the repo.

```bash
pnpm install
```


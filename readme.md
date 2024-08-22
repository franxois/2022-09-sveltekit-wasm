# Description

Experimentations with SvelteKit & Wasm

# Notes

## install

Ensure to have recent version of cargo watch

```bash
cargo install cargo-watch
cargo install wasm-pack
cargo install cargo-component
```

## On mac os

On mac os, I had to add the line `"persistent": true` to turbo.json [ref](https://github.com/vercel/turborepo/issues/7279)

## Test wasi file

```bash
wasmtime --dir .::/helloworld ./apps/sveltekit/static/wasi_hello_world.wasm
```

# TODOs

- [x] Wrap web worker with [Comlink](https://github.com/GoogleChromeLabs/comlink)
- [x] test shared worker

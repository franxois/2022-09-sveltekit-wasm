# Description

Experimentations with SvelteKit & Wasm

# Notes

## install

Ensure to have recent version of cargo watch

```bash
cargo install cargo-watch
cargo install wasm-pack
```

## Test wasi file

```bash
wasmtime --dir .::/helloworld ./apps/sveltekit/static/wasi_hello_world.wasm
```

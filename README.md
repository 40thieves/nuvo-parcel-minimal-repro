# Nuvo / Parcel minimal repro

Minimal reproduction of a bug where the [Nuvo importer](https://docs.getnuvo.com/sdk/start/) crashes if bundled using the [Parcel bundler](https://parceljs.org/).

The bug appears to be related the usage of the [`@nyariv/sandboxjs` package](https://github.com/nyariv/SandboxJS), since it uses `eval` and this is explicitly [not recommended by Parcel](https://parceljs.org/features/scope-hoisting/#avoid-eval) due to it's scope hoisting algorithm.

## Steps to reproduce

1. Clone this repo
2. `npm install`
3. `npm run repro`

This will run the production build using Parcel, then open a browser with the snippet of set up code (using the vanilla JS implementation) from the [docs](https://docs.getnuvo.com/sdk/start/#set-up-settings). If you open the JS console in Dev Tools you should see an error message like:

```
Uncaught SyntaxError: Identifier 'r' has already been declared
```

The Nuvo importer is also not initialised as expected.

Running the same app using `npm run dev` will not have these behaviours.

### Workaround

The short term workaround we found was to add a `.terserrc` file to the root with the following config:

```
{
    "mangle": {
        "eval": true
    }
}
```

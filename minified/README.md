### Process used to create minified version

- Disable save-language-subset.dev.js `import` at language-detector.js
- Remove function/export of `saveSubset()` at language-detector.js
- Remove public scope of `loadNgrams()`, from `const eld` at language-detector.js (Optional)
- Remove `loadNgrams('ngramsM60.js')` at language-detector.js
- Enable `import { ngramsData }` at language-data.js
- Enable setNgrams(ngramsData) at language-data.js
- Change `export { eld }` to `export { eld as default }` at language-detector.js
- Bundle code with Rollup: `> rollup language-detector.js --file bundle.js --format umd --name eld`
- Minify code with Terser: `> terser bundle.js --compress --mangle --output eld.min.js`

TODO, It would be a good idea to automate the process.
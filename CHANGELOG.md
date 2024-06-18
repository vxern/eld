# 1.1.0

- Tidied up package:
  - Added `@biomejs/biome` for formatting and linting.
  - Fixed filename conventions, converting from `camelCase` to `kebab-case`.
  - Removed some `for-in` loops being used on arrays instead of `for-of`, causing issues with polyfills.

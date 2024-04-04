import teslint from "typescript-eslint";

module.exports = teslint({
  ...teslint.configs.recommended,
  extends: "next/core-web-vitals",
});

/** @type {import('lint-staged').Configuration} */
export default {
  '*.{js,jsx,ts,tsx}': ['oxlint --fix', 'prettier --write'],
  '*.{js,jsx,ts,tsx,md,mdx,html,css,yml,yaml,json}': 'prettier --write',
}

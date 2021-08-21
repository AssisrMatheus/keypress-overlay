module.exports = {
  extends: ['stylelint-config-recommended', 'stylelint-config-styled-components'],
  rules: {
    // Fixes tailwind specific at. Ref: https://dev.to/oliverandrich/vscode-stylelint-tailwind-css-3oag
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind', 'apply', 'variants', 'responsive', 'screen', 'layer']
      }
    ],
    'declaration-block-trailing-semicolon': null,
    'no-descending-specificity': null
  }
};

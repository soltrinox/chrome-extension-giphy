module.exports = {
  extends: 'stylelint-config-sass-guidelines',
  rules: {
    indentation: 2,
    'number-leading-zero': 'always',
    'selector-no-qualifying-type': null,
    'order/order': null,
    'order/properties-order': null,
    'order/properties-alphabetical-order': null,
    'no-missing-end-of-source-newline': true,
    'value-list-max-empty-lines': 0,
    'selector-max-empty-lines': 0,
    'string-no-newline': true,
    'no-empty-first-line': true,
    'block-closing-brace-empty-line-before': 'never',
    'block-closing-brace-newline-before': 'always',
    'max-nesting-depth': 4,
    'declaration-property-value-disallowed-list': null,
    'max-empty-lines': 1,
    'max-line-length': [
      80,
      {
        ignore: ['non-comments']
      }
    ],
    'selector-class-pattern': [
      '^[a-z][a-zA-Z0-9]*(?:[a-z][a-zA-Z0-9]*)?$',
      {
        resolveNestedSelectors: true
      }
    ],
    'property-no-vendor-prefix': [
      true,
      {
        ignoreProperties: ['text-size-adjust']
      }
    ]
  }
};

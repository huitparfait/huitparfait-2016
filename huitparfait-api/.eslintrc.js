module.exports = {
    extends: 'eslint:recommended',
    env: {
        node: true,
        es6: true,
    },
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
    },
    rules: {

        // Possible Errors
        'comma-dangle': [2, 'always-multiline'],

        // Best Practices
        'accessor-pairs': 2,
        'block-scoped-var': 2,
        'curly': 2,
        'default-case': 2,
        'dot-notation': 2,
        'dot-location': [2, 'property'],
        'eqeqeq': [2, 'allow-null'],
        'guard-for-in': 2,
        'no-alert': 2,
        'no-caller': 2,
        'no-div-regex': 2,
        'no-else-return': 2,
        'no-empty-function': 2,
        'no-empty-pattern': 2,
        'no-eval': 2,
        'no-extend-native': 2,
        'no-extra-bind': 2,
        'no-floating-decimal': 2,
        'no-implicit-coercion': 2,
        'no-implied-eval': 2,
        'no-iterator': 2,
        'no-labels': 2,
        'no-lone-blocks': 2,
        'no-loop-func': 2,
        'no-multi-spaces': 2,
        'no-native-reassign': 2,
        'no-new-func': 2,
        'no-new-wrappers': 2,
        'no-octal-escape': 2,
        'no-param-reassign': [2, { 'props': false }],
        'no-proto': 2,
        'no-return-assign': [2, 'always'],
        'no-script-url': 2,
        'no-self-compare': 2,
        'no-sequences': 2,
        'no-throw-literal': 2,
        'no-useless-call': 2,
        'no-useless-escape': 2,
        'no-void': 2,
        'no-with': 2,
        'radix': 2,
        'wrap-iife': [2, 'inside'],
        'no-unmodified-loop-condition': 2,
        'array-callback-return': 2,
        'yoda': 2,

        // Variables
        'no-label-var': 2,
        'no-shadow-restricted-names': 2,
        'no-undef-init': 2,
        'no-use-before-define': [2, 'nofunc'],


        // Node.js
        'callback-return': 2,
        'handle-callback-err': 1,
        'no-mixed-requires': [2, true],
        'no-new-require': 2,
        'no-path-concat': 2,
        'no-restricted-modules': [2, 'freelist', 'smalloc', 'sys'],

        // Stylistic Issues
        'array-bracket-spacing': [2, 'never'],
        'brace-style': [2, '1tbs'],
        'camelcase': 0,
        'comma-spacing': [2, { before: false, after: true }],
        'comma-style': [2, 'last'],
        'computed-property-spacing': [2, 'never'],
        'eol-last': 2,
        'indent': ['error', 4],
        'key-spacing': [2, { beforeColon: false, afterColon: true }],
        'linebreak-style': [2, 'unix'],
        'new-parens': 2,
        'no-array-constructor': 2,
        'no-lonely-if': 2,
        'no-multiple-empty-lines': [2, { max: 2 }],
        'no-nested-ternary': 2,
        'no-new-object': 2,
        'no-spaced-func': 2,
        'no-trailing-spaces': 2,
        'object-curly-spacing': [2, 'always'],
        'max-statements-per-line': [2, { max: 1 }],
        'one-var': [2, 'never'],
        'one-var-declaration-per-line': [2, 'always'],
        'operator-assignment': [2, 'always'],
        'operator-linebreak': [2, 'after'],
        'quotes': [2, 'single'],
        'space-before-blocks': [2, 'always'],
        'space-before-function-paren': [2, { anonymous: 'always', named: 'never' }],
        'space-in-parens': [2, 'never'],
        'space-infix-ops': 2,
        'space-unary-ops': 2,
        'keyword-spacing': 2,
        'no-whitespace-before-property': 2,
        'quote-props': [2, 'as-needed', { 'keywords': false, 'unnecessary': true, 'numbers': false }],

        // ECMAScript 6
        'arrow-parens': 2,
        'arrow-spacing': [2, { before: true, after: true }],
        'generator-star-spacing': [2, { 'before': false, 'after': true }],
        'no-confusing-arrow': 2,
        'no-duplicate-imports': 2,
        'no-var': 2,
        'no-useless-computed-key': 2,
        'no-useless-constructor': 2,
        'object-shorthand': 2,
        'prefer-const': 2,
        'prefer-spread': 2,
        'prefer-rest-params': 2,
        'prefer-template': 2,
        'template-curly-spacing': [2, 'never'],

        // Custom
        'no-underscore-dangle': 0,
        'no-console': 0,
        'semi': ['error', 'never'],
        'no-new': 0,

        // Complexity
        'max-depth': [2, 1],
        'max-params': [2, 3],
        'max-nested-callbacks': [2, 2],
        'max-statements': [2, 10],
        'complexity': [2, 6],
    },
};

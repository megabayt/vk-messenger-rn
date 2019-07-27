module.exports = {
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    plugins: [
        'react',
        'import',
        '@typescript-eslint',
    ],
    extends: [
        'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
        'plugin:@typescript-eslint/recommended', // Uses the recommended rules from @typescript-eslint/eslint-plugin
    ],
    parserOptions: {
        ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
        ecmaFeatures: {
            jsx: true, // Allows for the parsing of JSX
        },
    },
    rules: {
        /** TYPESCRIPT RULES */
        // Предпочитать Array<...> формат с параметром (https://github.com/palantir/tslint/issues/2946)
        '@typescript-eslint/array-type': ['error', 'generic'],
        '@typescript-eslint/object-literal-sort-keys': 0,
        // I в IProps не нужно писать для интерфейсов (правильно просто Props)
        '@typescript-eslint/interface-name-prefix': ['error', 'always'],
        // Разрешает type A = {} вместо interface A {}
        '@typescript-eslint/prefer-interface': 'off',
        // Не использовать any
        '@typescript-eslint/no-explicit-any': 'warn',
        // У функций нужно определять return type
        '@typescript-eslint/explicit-function-return-type': ['warn', {
            allowExpressions: true,
            allowTypedFunctionExpressions: true,
            allowHigherOrderFunctions: true,
        }],
        // Можно использовать переменные до их объявления (нужно для Styled-components)
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/no-unused-vars': 'warn',
        '@typescript-eslint/indent': ["error", 2],


        /** COMMON RULES */
        // Нельзя console.log
        'no-console': ['error', { 'allow': ['warn', 'error'] }],
        'no-unused-expressions': 'error',
        'max-len': ['error', 100],
        'eol-last': ['error', 'always'],
        'comma-dangle': ['error', 'always-multiline'],
        'semi': ['error', 'always', { 'omitLastInOneLineBlock': true }],
        'quote-props': ['error', 'as-needed'],
        'quotes': ['error', "single", { "allowTemplateLiterals": true }],
        'no-multiple-empty-lines': ["error", { "max": 2, "maxEOF": 1 }],
        "object-curly-spacing": ["error", "always"],

        /** REACT RULES */
        // Можно прокидывать пропсы без значения в компоненты <A fullWidth />
        'react/jsx-boolean-value': ['error', 'never'],
        // Можно не проверять propTypes, так как есть Typescript Props
        'react/prop-types': 'off',
        'react/display-name': 'warn',

        "import/no-default-export": "error",
        "import/order": "warn",
    },
    settings: {
        react: {
            version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
        },
    },
};

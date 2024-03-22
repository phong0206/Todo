module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'airbnb',
        'airbnb/hooks',
        'airbnb-typescript',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:prettier/recommended',
    ],

    overrides: [
        {
            env: {
                node: true,
            },
            files: ['.eslintrc.{js,cjs}'],
            parserOptions: {
                sourceType: 'script',
            },
        },
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
    },
    plugins: ['prettier', '@typescript-eslint', 'react'],
    rules: {
        'react/react-in-jsx-scope': 0,
        'react/prop-types': 'off',
        '@typescript-eslint/no-explicit-any': ['off'],
        'react/no-unescaped-entities': 0,
        'jsx-a11y/anchor-is-valid': 0,
        'react/jsx-props-no-spreading': 0,
        '@typescript-eslint/no-shadow': 0,
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': 0,
        'react/no-unused-prop-types': 0,
        'prefer-template': 0,
        'react/require-default-props': 0,
        'import/prefer-default-export': 0,
        'react/function-component-definition':0,
        'import/extensions': 0,
        'react/display-name': 0,
        'import/newline-after-import': 0,
        "react/jsx-no-useless-fragment": "error",
        "import/no-duplicates": "error",
        'array-callback-return': 0,
        'consistent-return': 0,
        '@typescript-eslint/naming-convention': [
            0,
            "error",
            {
                "format": ["camelCase", "PascalCase", "UPPER_CASE"],
                "selector": "default",
                "leadingUnderscore": "allow"
            }
        ],
        'react/no-array-index-key': 0,
        'spaced-comment': 0,
        'import/no-mutable-exports': 0,
        'import/no-extraneous-dependencies': 0,
        'object-shorthand': 0,
        'import/order': 0,
        'prefer-const': 0,
        '@typescript-eslint/no-var-requires': 0,
        'import/no-absolute-path': 0,
        'prettier/prettier': [
            0,
            'error',
            {
                endOfLine: 'auto',
                singleQuote: true,
                parser: 'flow',
            },
        ],
    },
};

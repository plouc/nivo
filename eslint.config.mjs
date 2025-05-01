import { defineConfig } from 'eslint/config'
import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import eslintConfigPrettier from 'eslint-config-prettier/flat'
import globals from 'globals'
import reactPlugin from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import jsxA11y from 'eslint-plugin-jsx-a11y'

export default defineConfig([
    eslint.configs.recommended,
    tseslint.configs.recommended,
    tseslint.configs.stylistic,
    reactPlugin.configs.flat.recommended,
    reactPlugin.configs.flat['jsx-runtime'],
    reactHooks.configs['recommended-latest'],
    jsxA11y.flatConfigs.recommended,
    {
        files: [
            './packages/*/{src,tests}/**/*.{js,mjs,ts,tsx}',
        ],
        languageOptions: {
            globals: {
				...globals.browser,
			},
        },
        rules: {
            semi: 'off',
            'prefer-const': 'error',
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/consistent-type-definitions': 'warn',
            '@typescript-eslint/array-type': 'warn',
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    'args': 'all',
                    'argsIgnorePattern': '^_',
                    'caughtErrors': "all",
                    'caughtErrorsIgnorePattern': "^_",
                    'destructuredArrayIgnorePattern': "^_",
                    'varsIgnorePattern': "^_",
                    'ignoreRestSiblings': true
                }
            ],
            'react/prop-types': 'off',
            'react/display-name': 'off',
            'react-hooks/exhaustive-deps': 'error',
            'jsx-a11y/click-events-have-key-events': 'warn',
            'jsx-a11y/no-static-element-interactions': 'warn',
        },
        ignores: [
            '/branding/',
            '/stats/',
            '/storybook-static/',
            'node_modules/',
            'packages/*/dist/',
        ],
        settings: {
            react: {
                version: 'detect',
            },
        },
    },
    eslintPluginPrettierRecommended,
    eslintConfigPrettier,
    {
		files: [
            './packages/*/tests/**/*.{js,mjs,ts,tsx}',
        ],
		languageOptions: {
			globals: {
				it: 'readonly',
				describe: 'readonly',
                expect: 'readonly',
                test: 'readonly',
			},
		},
	},
])

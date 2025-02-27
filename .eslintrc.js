module.exports = {
	parser: '@typescript-eslint/parser',
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier',
	],
	plugins: ['react', 'react-hooks', '@typescript-eslint'],
	env: {
		browser: true,
		es6: true,
		node: true,
		jest: true,
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
	rules: {
		'react/prop-types': 'off',
		'react/react-in-jsx-scope': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-explicit-any': 'warn',
		'no-console': ['warn', { allow: ['warn', 'error'] }],
	},
}

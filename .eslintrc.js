const { createConfig } = require('@edx/frontend-build');

module.exports = createConfig('eslint', {
    "extends": [
        "plugin:react-hooks/recommended",
    ],
    "rules": {
        "import/no-extraneous-dependencies": "off",
        "jsx-a11y/anchor-is-valid": "off",
    }
});

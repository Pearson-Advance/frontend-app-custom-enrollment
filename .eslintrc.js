const { createConfig } = require('@edx/frontend-build');

module.exports = createConfig('eslint', {
    "extends": [
        "plugin:react-hooks/recommended",
    ],
    "rules": {
        "import/prefer-default-export": "off",
        "import/no-unresolved": "off",
        "import/no-extraneous-dependencies": "off",
        "react/jsx-filename-extension": "off",
        "jsx-a11y/anchor-is-valid":"off",
    }
});

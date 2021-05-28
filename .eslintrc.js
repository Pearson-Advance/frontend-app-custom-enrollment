const { createConfig } = require('@edx/frontend-build');

module.exports = createConfig('eslint', {
    "rules": {
        "react/jsx-filename-extension": [
            1,
            {
                "extensions": [
                    ".js", 
                    ".jsx"
                ]
            }
        ],
        "import/prefer-default-export": "off",
    }
});

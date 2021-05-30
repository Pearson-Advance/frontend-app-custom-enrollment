const { createConfig } = require('@edx/frontend-build');

module.exports = createConfig('eslint', {
    "rules": {
        "import/prefer-default-export": "off",
        "react/prop-types": "off",
        "react/jsx-filename-extension": [
            1,
            {
                "extensions": [
                    ".js", 
                    ".jsx"
                ]
            }
        ],
    }
});

module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 2015
    },
    "rules": {
        "indent": [
            "error",
            4
        ],
        "semi": [
            "error",
            "always"
        ],
        "quotes": [
            "error", "single",
            { "avoidEscape": true, "allowTemplateLiterals": true }
        ],
        "no-console": 0,
    }
};
module.exports = {
    'parser': 'babel-eslint',
    'env': {
        'node': true,
        'browser': true,
        'commonjs': true,
        'mocha': true,
        'es6': true
    },
    'extends': ['standard', 'vue'],
    'plugins': [
        'json',
        'mocha',
        'chai-friendly',
        'pug'
    ],
    'parserOptions': {
        'sourceType': 'module',
        'ecmaVersion': 6
    },
    'globals': {
        'assert': false,
        'expect': false,
        'should': false,
        'sinon': false,
        'Promise': false,
        'ES6Promise': false
    },
    'rules': {
        'indent': [
            'error',
            4
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'never'
        ],
        'global-require': [
            'error'
        ],
        'no-trailing-spaces': 2,
        'no-unused-expressions': 0,
        'chai-friendly/no-unused-expressions': 2
    }
}

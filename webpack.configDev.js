const merge = require('webpack-merge');
const commonConfig = require('./webpack.config.js');

module.exports = merge(commonConfig, () => {
    return {
        devtool: 'inline-source-map',
        mode: 'development',
    };
});
const merge = require('webpack-merge');

const commonConfig = require('./webpack.config');


module.exports = merge(commonConfig, () => {
    return {
        devtool: 'source-map',
        mode: 'production',
    };
});
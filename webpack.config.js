const path = require('path');

module.exports = {
    devServer: {
        // contentBase
        static: {
            directory: path.join(__dirname, '/public'),
        },
        port: 3000,
        host: '192.168.0.103',
        // publicPath
        // devMiddleware:{
        //    publicPath: '192.168.0.103',
        // },
        // hotOnly
        hot: 'only',
    },
};

'use strict'

var path = require('path');
var webpack = require('webpack');
var ManifestPlugin = require('webpack-manifest-plugin');
var OfflinePlugin = require('offline-plugin');

module.exports = {
    entry :{ 
       index: [
        "./app/index.js", "./app/index.tsx", "./app/index.scss", "./app/assets/sass/materialize.scss", "./app/assets/js/materialize.js"
    ],
        app : [
           "./app/app.js", "./app/app.tsx","./app/assets/sass/materialize.scss", "./app/assets/js/materialize.js", "./app/app.scss"
        ]
    },
    output : {
        path : __dirname + "/static",
        filename : "[name].js"
    },
    resolve : { 
        alias: {
            react: path.resolve(__dirname, './node_modules/react'),
            React: path.resolve(__dirname, './node_modules/react')
        },
        modules : ["node_modules","app"],
        extensions : [".jsx",".js",".html",".png",".jpg",".tsx",".ts",".d.ts",".css",".json",".scss",".woff",".woff2"]
    },
    module :{
        loaders : [
            {
                test : /\.tsx$/,
                loader : "ts-loader?" + JSON.stringify({transpileOnly:true}) 
            },
            {
                test : /\.css$/,
                loader : "style-loader!css-loader"
            },
            {
                test : /\.xhtml$/,
                loader : "html-loader"
            },
            {
                test: /\.wof.*$/,
                loader : 'url-loader?mimetype=application/font-woff'
            },
            {
                test: /\.png$/,
                loader : 'url-loader?mimetype=image/png'
            },
            {
                test : /\.scss$/,
                loaders: ['style-loader','css-loader', 'sass-loader']
            }
        ]
    },
    plugins :[
    new webpack.optimize.CommonsChunkPlugin({ name: 'commons', filename: 'commons.js', minChunks: 2,}),
    // new OfflinePlugin({caches : { main : ['commons.js','app.js','index.js'],
    // additional : ['/app',':externals:']
    // },
    // safeToUseOptionalCaches : true,
    // publicPath : "/static/"}),
    new ManifestPlugin({
        basePath : "/static/"
    })
  ]
}
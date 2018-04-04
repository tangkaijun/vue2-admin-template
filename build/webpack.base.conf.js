'use strict'
const path = require('path');
//导入配置
var config = require('../config');
//引入vue的loader配置
const vueLoaderConfig = require('./vue-loader.conf');

//检测
function resolve(dir) {
	return path.join(__dirname, '..', dir)
}

//配置ESLint静态代码检测工具
const createLintingRule = () => ({
	test: /\.(js|vue)$/,
	loader: 'eslint-loader',
	enforce: 'pre',
	include: [resolve('src'), resolve('test')],
	options: {
		formatter: require('eslint-friendly-formatter'),
		emitWarning: !config.dev.showEslintErrorsInOverlay
	}
})

module.exports = {
   //webpack编译入口
   entry: {
     app: './src/index.js'
   },
   //webpack资源出口配置
   output: {
   	 path: config.build.assetsRoot,//webpack输出的资源文件夹路径（如：dist)
     filename: '[name].js',//webpack输出bundle文件命名格式，基于文件的md5生成hash的script防止浏览器缓存
     publicPath: process.env.NODE_ENV === 'production'//webpack编译输出的发布路径（判断是正式环境或者开发环境）
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
   },
   resolve: {
		extensions: ['.js', '.vue', '.json'],//自动解析扩展名，导入模块时不用带扩展名
		alias: {//创建import获取require的别名，一些常用的或路径长的都可以使用别名
			'vue$': 'vue/dist/vue.esm.js',
			'@': resolve('src'),
			'assets': path.resolve(__dirname, '../src/assets'),
      		'components': path.resolve(__dirname, '../src/components'),
      		'scss_vars': path.resolve(__dirname, '../src/styles/vars.scss')
		}
   },
   module: {
	 rules: [
            ...(config.dev.useEslint ? [createLintingRule()] : []),
            //配置使用相关的loader加载对应类型的文件
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: vueLoaderConfig
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				include: [resolve('src'),resolve('test'),resolve('node_modules/element-ui'),resolve('node_modules/webpack-dev-server/client')]
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: utils.assetsPath('img/[name].[hash:7].[ext]')
				}
			},
			{
				test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: utils.assetsPath('media/[name].[hash:7].[ext]')
				}
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
				}
			}
	 ]
   }
};
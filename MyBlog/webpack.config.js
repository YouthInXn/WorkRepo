
const path = require('path')

module.export = {
	// webpack 入口
	entry:{
		main:path.resolve(_dirname, 'src/index.js')
	},
	// webpack 出口 打包的js文件输出位置
	output:{
		path:path.resolve(_dirname, 'dist'),
		filename:'bundle.js'
	}
}

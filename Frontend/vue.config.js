// vue.config.js
module.exports = {
  runtimeCompiler: true,
  devServer:{
  proxy: {
    // proxy all requests starting with /api to localhost
         '/api': {
             target: 'https://localhost:44389/',
             changeOrigin: true
         }
     }
    }
  
}
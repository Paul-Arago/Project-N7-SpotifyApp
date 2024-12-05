module.exports = {
    devServer: {
      proxy: {
        '/login': {
          target: 'http://localhost:3000/login',
          ws: true,
          changeOrigin: true
        },
        '/user': {
          target: 'http://localhost:3000/user',
          ws: true,
          changeOrigin: true
        },
      }
    }
  }
  
  
  
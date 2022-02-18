module.exports = {
  devServer: {
    proxy: {
      '/api': 'http://localhost:8080',
      '/actuator': 'http://localhost:8080',
    }
  }
};

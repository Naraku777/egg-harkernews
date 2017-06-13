//
// config/config.default.js

const fs = require('fs')
const path = require('path')

module.exports = appInfo => {
  const config = {
    // Cookie 安全字符串
    keys: `${appInfo.name}_201706131133277`,
    setFile: {
      '/favicon.ico': fs.readFileSync(path.join(appInfo.baseDir, 'app/public/favicon.ico'))
    },
    view: {
      defaultViewEngine: 'nunjucks',
      mapping: {
        '.njk': 'nunjucks'
      }
    },
    robot: {
      ua: [
        /Baiduspider/i
      ]
    },
    middleware: [
      'robot'
    ],
    news: {
      pageSize: 10,
      serverURL: 'https://hacker-news.firebaseio.com/v0',
    },
  }

  return config
}


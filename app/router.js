//
// app/router.js

module.exports = app => {
  app.get('/', app.controller.home.index)
  app.get('/news', app.controller.news.list)
  app.get('/news/user/:id', app.controller.news.user)
  app.get('/news/item/:id', app.controller.news.detail)
}
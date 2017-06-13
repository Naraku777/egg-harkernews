//
// app/controller/news.js


module.exports = app => {
  class NewsController extends app.Controller {
    * list() {
      const ctx = this.ctx
      const pageSize = this.config.news.pageSize
      const page = parseInt(ctx.query.page) || 1

      const idList = yield ctx.service.hackerNews.getTopStories(page)
      const newsList = yield idList.map(id => ctx.service.hackerNews.getItem(id))

      yield ctx.render('news/list.njk', { list: newsList, page, pageSize })
    }

    * detail() {
      const ctx = this.ctx
      const id = ctx.params.id

      const newsInfo = yield ctx.service.hackerNews.getItem(id)
      const commentList = yield (newsInfo.kids || [])
        .map(id => ctx.service.hackerNews.getItem(id))
      yield ctx.render('news/detail.njk', { item: newsInfo, comments: commentList })
    }

    *user() {
      const ctx = this.ctx
      const id = ctx.params.id

      const userInfo = yield ctx.service.hackerNews.getUser(id)
      yield ctx.render('news/user.njk', { user: userInfo })
    }
  }

  return NewsController
}
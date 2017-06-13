//
// app/service/news.js

module.exports = app => {
  class NewsService extends app.Service {
    * list(page = 1) {
      // 读取配置
      const { serverURL, pageSize } = this.app.config.news
      // 使用内置 http 获取数据
      const { data: idList } = yield this.ctx.curl(
        `${serverURL}/topstories.json`,
        {
          data: {
            orderBy: '"$key"',
            startAt: `"${pageSize * (page - 1)}"`,
            endAt: `"${pageSize * page - 1}"`
          },
          dataType: 'json'
        }
      )
      //
      const newList = yield Object.keys(idList).map(
        key => {
          const url = `${serverURL}/item/${idList[key]}.json`
          return this.ctx.curl(url, { dataType: 'json' })
        }
      )
      return newList.map(res => res.data)
    }
  }
  return NewsService
}
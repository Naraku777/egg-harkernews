//
//

'use strict'

module.exports = app => {
  class HackNews extends app.Service {

    constructor(ctx) {
      super(ctx)
      this.config = this.ctx.app.config.news
      this.serverURL = this.config.serverURL
      this.pageSize = this.config.pageSize
    }

    /**
     * request hacker-news api
     * 
     * @param {string} api - Api name
     * @param {Object} [opts] - urllib options
     * @returns {Promise} response.data
     * 
     * @memberof HackNews
     */
    * request(api, opts) {
      const options = Object.assign({
        dataType: 'json',
        timeout: ['30s', '30s'],
      }, opts)

      const result = yield this.ctx.curl(`${this.serverURL}/${api}`, options)
      return result.data
    }

    /**
     * get top story ids
     * 
     * @param {Number} [page] - page number, base 1
     * @param {Number} [pageSize] - page count
     * @returns {Promise} id list
     * 
     * @memberof HackNews
     */
    * getTopStories(page, pageSize) {
      page = page || 1
      pageSize = pageSize || this.pageSize

      const result = yield this.request('topstories.json', {
        data: {
          orderBy: '"$key"',
          startAt: `"${pageSize * (page - 1)}"`,
          endAt: `"${pageSize * page - 1}"`
        }
      })

      return Object.keys(result).map(key => result[key])
    }

    /**
     * query item
     * 
     * @param {Number} id - item id
     * @returns {Promise} item info
     * 
     * @memberof HackNews
     */
    * getItem(id) {
      return yield this.request(`item/${id}.json`)
    }


    /**
     * get user info
     * 
     * @param {Number} id - user id 
     * @returns {Promise} user info
     * 
     * @memberof HackNews
     */
    * getUser(id) {
      return yield this.request(`user/${id}.json`)
    }
  }

  return HackNews
}

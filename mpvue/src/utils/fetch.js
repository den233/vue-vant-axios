// 浏览器和React Native

var http = {

  /** get 请求
   * @param  {接口地址} url
   * @param  {请求参数} params
   */
  get: function (url, params) {
    return new Promise((resolve, reject) => {
      this.$fly.request({
        method: "get", //post/get 请求方式
        url: url,
        body: params
      }).then(res => {
        resolve(response.data);
      })
        .catch((error) => {
          reject(error);
        });

    })
  },
  /** post 请求
   * @param  {接口地址} url
   * @param  {请求参数} params
   */
  post: function (url, params) {
    return new Promise((resolve, reject) => {
      this.$fly.request({
        method: "post", //post/get 请求方式
        url: url,
        body: params
      }).then(res => {
        resolve(response.data);
      })
        .catch((error) => {
          reject(error);
        });
    })
  },
  /** post 请求
 * @param  {接口地址} url
 * @param  {请求参数} params
 */
  postLogin: function (url, params) {
    return new Promise((resolve, reject) => {
      this.$fly.request({
        method: "post", //post/get 请求方式
        url: url,
        body: params
      }).then(res => {
        resolve(response.data);
      })
        .catch((error) => {
          reject(error);
        });
    })
  }
}
export default http

export default {
  "proxy": {
    "/v2": {
      "target": "http://192.168.120.88:8080",
      "changeOrigin":true
    }
  },
}

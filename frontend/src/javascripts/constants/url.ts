// TODO: developmentとproductionにしか対応していないが、test環境の場合分けも必要かも
export const ROOT_URL = (() => {
  if (window.location.origin === 'http://localhost:4000') {
    return 'http://localhost:3000'
  } else {
    return window.location.origin
  }
})()

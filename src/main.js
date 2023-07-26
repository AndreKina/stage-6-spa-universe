import Router from "./routes/router.js"

const router = new Router()

router.changePageHandle()

// adjust to init and page change
window.onpopstate = () => router.changePageHandle()
window.route = () => {
  router.changePageHandle()
}

const routes = {
  "/": {
    path: "/pages/home.html",
    backgroundImageTag: "background-home",
  },
  "/home": {
    path: "/pages/home.html",
    backgroundImageTag: "background-home",
  },
  "/universe": {
    path: "/pages/universe.html",
    backgroundImageTag: "background-universe",
  },
  "/explore": {
    path: "/pages/explore.html",
    backgroundImageTag: "background-explore",
  },
}

export default class Router {
  constructor() {
    this.routes = routes
  }

  route(event) {
    event = event || window.event
    event.preventDefault()
    console.log(event.target)

    window.history.pushState({}, "", event.target.href)
  }

  changeBackground(pathname) {
    const backgroundImageTag =
      pathname in this.routes
        ? this.routes[pathname]["backgroundImageTag"]
        : "background-home"

    const root = document.documentElement
    root.className = ""
    root.classList.add(backgroundImageTag)
  }

  addBoldToNavOption(pathname) {
    const allLinks = document.querySelectorAll("a")
    const selected = document.querySelector(`[href='${pathname}']`)

    allLinks.forEach((a) => {
      a.classList.remove("selected")
    })
    console.log(selected)
    if (selected) {
      selected.classList.add("selected")
    }
  }

  changePageHandle() {
    const { pathname } = window.location
    const path =
      pathname in this.routes
        ? this.routes[pathname]["path"]
        : "/pages/404.html"

    this.changeBackground(pathname)
    this.addBoldToNavOption(pathname)

    fetch(path)
      .then((data) => data.text())
      .then((html) => (document.querySelector("main").innerHTML = html))
  }
}

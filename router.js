class Router {
  constructor (node, routes) {
    this.node = node;
    this.routes = routes;
  }

  start () {
    this.render();
    window.addEventListener("hashchange", (e) => {
      this.render();
    });
  }

  activeRoute () {
    return this.routes[window.location.hash.slice(1)];
  }

  render () {
    let component = this.activeRoute();
    this.node.innerHTML = "";

    if (component !== undefined) {
      let newContainer = component.render();
      this.node.appendChild(newContainer);
    }

  }
}


module.exports = Router;

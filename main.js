const Router = require('./router.js');
const MessageStore = require('./message_store.js');
const Inbox = require('./inbox.js');
const Sent = require('./sent.js');
const Compose = require('./compose.js');

document.addEventListener("DOMContentLoaded", (event) => {
  let sidebarNavLis = document.querySelectorAll('.sidebar-nav li');
  for (let i=0; i < sidebarNavLis.length; i++) {
    sidebarNavLis[i].addEventListener("click", (clickEvent) => {
      let name = clickEvent.currentTarget.innerText;
      name = name.toLowerCase();
      window.location.hash = name;
    });
  }

  let currentNode = document.querySelector('.content');
  let router = new Router(currentNode, routes);
  router.start();
  window.location.hash = 'inbox';
});

let routes = {
  inbox: Inbox,
  sent: Sent,
  compose: Compose
};

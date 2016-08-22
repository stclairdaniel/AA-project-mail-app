/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Router = __webpack_require__(1);
	const MessageStore = __webpack_require__(2);
	const Inbox = __webpack_require__(3);
	const Sent = __webpack_require__(4);
	const Compose = __webpack_require__(5);

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


/***/ },
/* 1 */
/***/ function(module, exports) {

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


/***/ },
/* 2 */
/***/ function(module, exports) {

	class Message {
	  constructor (from, to, subject, body) {
	    this.from = from;
	    this.to = to;
	    this.subject = subject;
	    this.body = body;
	  }
	}

	let messages = {
	  sent: [
	    {to: "friend@mail.com", subject: "Check this out", body: "It's so cool"},
	    {to: "person@mail.com", subject: "zzz", body: "so booring"}
	  ],
	  inbox: [
	    {from: "grandma@mail.com", subject: "hi sonny", body:"Content"},
	    {from: "person@mail.com", subject: "Questionnaire", body: "Something"}
	]
	};

	let MessageStore = {
	  messageDraft:  new Message,

	  getInboxMessages () {
	    return messages.inbox;
	  },

	  getSentMessages () {
	    return messages.sent;
	  },

	  updateDraftField(field, value) {
	    this.messageDraft[field] = value;
	  },

	  sendDraft () {
	    messages.sent.push(this.messageDraft);
	    messageDraft = new Message();
	  },

	  getMessageDraft () {
	    return this.messageDraft;
	  }

	};

	module.exports = MessageStore;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const MessageStore = __webpack_require__(2);


	let Inbox = {
	  render() {
	    let ul = document.createElement('ul');
	    let messages = MessageStore.getInboxMessages();

	    messages.forEach((message) => {
	      ul.appendChild(this.renderMessage(message));
	    });

	    ul.className = 'messages';
	    return ul;
	  },

	  renderMessage (message) {
	    let li = document.createElement('li');
	    li.className = 'message';
	    li.innerHTML = "";
	    li.innerHTML += `<span class='from'>${message.from}</span>`;
	    li.innerHTML += `<span class='subject'>${message.subject}</span>`;
	    li.innerHTML += `<span class='body'>${message.body}</span>`;

	    return li;
	  }
	};

	module.exports = Inbox;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	const MessageStore = __webpack_require__(2);


	let Sent = {
	  render() {
	    let ul = document.createElement('ul');
	    let messages = MessageStore.getSentMessages();

	    messages.forEach((message) => {
	      ul.appendChild(this.renderMessage(message));
	    });

	    ul.className = 'messages';
	    return ul;
	  },

	  renderMessage (message) {
	    let li = document.createElement('li');
	    li.className = 'message';
	    li.innerHTML = "";
	    li.innerHTML += `<span class='to'>${message.to}</span>`;
	    li.innerHTML += `<span class='subject'>${message.subject}</span>`;
	    li.innerHTML += `<span class='body'>${message.body}</span>`;

	    return li;
	  }
	};

	module.exports = Sent;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	const MessageStore = __webpack_require__(2);

	let Compose = {
	  render () {
	    let div = document.createElement('div');
	    div.className = "new-message";
	    div.innerHTML = this.renderForm();

	    div.addEventListener("change", (e) => {
	      MessageStore.updateDraftField(e.target.name, e.target.value)
	    });

	    div.addEventListener("submit", (e) => {
	      e.preventDefault();
	      MessageStore.sendDraft();
	      window.location.hash = "inbox";
	    });
	    
	    return div;
	  },

	  renderForm () {
	    let currentMessage = MessageStore.getMessageDraft();
	    let htmlString = "";
	    let formHTMLstring = "";
	    let to = (currentMessage.to === undefined) ? "" : currentMessage.to
	    let subject = (currentMessage.subject === undefined) ? "" : currentMessage.subject
	    let body = (currentMessage.body === undefined) ? "" : currentMessage.body
	    formHTMLstring += `<input placeholder="Recipient" name="to" type="text" value="${to}"></input>`;
	    formHTMLstring += `<input placeholder="Subject" name="subject" type="text" value="${subject}"></input>`;
	    formHTMLstring += `<textarea name="body" rows=20>${body}</textarea>`;
	    formHTMLstring += `<button type="submit" class="btn bnt-primary submit-message">Send</button>`;
	    htmlString += `<p class="new-message-header">New Message</p>`;
	    htmlString += `<form class="compose-form">${formHTMLstring}</form>`;

	    return htmlString;
	  }
	};

	module.exports = Compose;


/***/ }
/******/ ]);
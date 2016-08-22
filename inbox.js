const MessageStore = require('./message_store.js');


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

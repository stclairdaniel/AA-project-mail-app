const MessageStore = require('./message_store.js');

let Compose = {
  render () {
    let div = document.createElement('div');
    div.className = "new-message";
    div.innerHTML = this.renderForm();
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
    formHTMLstring += `<input placeholder="Subject" name="body" type="text" value="${subject}"></input>`;
    formHTMLstring += `<textarea name="body" rows=20>${body}</textarea>`;
    formHTMLstring += `<button type="submit" class="btn bnt-primary submit-message">Send</button>`;
    htmlString += `<p class="new-message-header">New Message</p>`;
    htmlString += `<form class="compose-form">${formHTMLstring}</form>`;

    return htmlString;
  }
};

module.exports = Compose;

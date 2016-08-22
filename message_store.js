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

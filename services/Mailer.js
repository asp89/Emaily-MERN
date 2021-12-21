const sendGridMail = require("@sendgrid/mail");
const keys = require("../config/keys");

class Mailer {
  constructor({ subject, recipients }, content) {
    sendGridMail.setApiKey(keys.sendGridKey);
    this.msg = {
      to: recipients.map(({ email }) => email),
      from: "anjaney08@gmail.com",
      subject: subject,
      html: content,
      trackingSettings: {
        enable_text: true,
        enabled: true,
      },
    };
  }

  async send() {
    const response = await sendGridMail.send(this.msg);
    return response;
  }

  //   formatAddresses(recipients) {
  //     return recipients.map(({ email }) => {
  //       return new helper.Email(email);
  //     });
  //   }
  //   addClickTracking() {
  //     const trackingSettings = new helper.TrackingSettings();
  //     const clickTracking = new helper.ClickTracking(true, true);
  //     trackingSettings.setClickTrackings(clickTracking);
  //     this.addTrackingSettings(trackingSettings);
  //   }
  //   addRecipients() {
  //     const personalize = new helper.Personalization();
  //     this.recipients.forEach((recipient) => {
  //       personalize.addTo(recipient);
  //     });
  //     this.addPersonalization(personalize);
  //   }
  //   async send() {
  //     const request = this.sendGridApi.emptyRequest({
  //       method: "POST",
  //       path: "/v3/mail/send",
  //       body: this.toJSON(),
  //     });
  //     const response = await this.sendGridApi.API(request);
  //     return response;
  //   }
}

module.exports = Mailer;

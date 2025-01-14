class RotaryInteraction extends Interaction {
  socketNotificationReceived(notification, payload) {
    switch (notification) {
      case "ROTARY_PREV":
        this.controller.prev();
        break;

      case "ROTARY_NEXT":
        this.controller.next();
        break;

      case "ROTARY_PRESS":
        this.controller.press();
        break;

      default:
        return;
    }
  }

  initSocketNotification = (mmm) => {
    mmm.sendSocketNotification("ROTARY_INIT");
  };
}

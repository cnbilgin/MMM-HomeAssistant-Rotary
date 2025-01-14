const gpio = require("@iiot2k/gpiox");

class Button {
  PIN;
  eventList = {};
  state = {
    active: false,
    lastChange: 0
  };
  constructor(pin) {
    this.PIN = pin;

    this._registerListener();
  }

  cleanup() {
    gpio.deinit_gpio(this.PIN);
  }

  _appendEvent(eventType, callback) {
    this.eventList[eventType] = this.eventList[eventType] || [];

    this.eventList[eventType].push(callback);
  }
  _triggerEvent(eventType) {
    if (!this.eventList[eventType] || this.eventList[eventType].length === 0)
      return;

    this.eventList[eventType].forEach((eventCallback) => {
      eventCallback();
    });
  }

  _registerListener() {
    gpio.watch_gpio(
      this.PIN,
      gpio.GPIO_MODE_INPUT_PULLUP,
      0,
      gpio.GPIO_EDGE_BOTH,
      (btnState) => {
        const now = Date.now();
        if (!btnState) {
          this._triggerEvent("press");

          if (now - this.state.lastChange > 600)
            this._triggerEvent("longPress");
          else this._triggerEvent("shortPress");
        }

        this.state = {
          active: btnState,
          lastChange: now
        };
      }
    );
  }

  onPress(callback) {
    this._appendEvent("press", callback);
  }

  onShortPress(callback) {
    this._appendEvent("shortPress", callback);
  }

  onLongPress(callback) {
    this._appendEvent("longPress", callback);
  }
}

exports.Button = Button;

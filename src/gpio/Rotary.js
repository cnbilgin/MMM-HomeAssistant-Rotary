const gpio = require("@iiot2k/gpiox");
const { Button } = require("./Button.js");
const { init_gpio, deinit_gpio, watch_gpio, get_gpio } = gpio;

class Rotary {
  pins;
  button;
  eventList = {};
  constructor({ SW, CLK, DT }) {
    this.pins = {
      SW,
      CLK,
      DT
    };

    init_gpio(DT, gpio.GPIO_MODE_INPUT_PULLUP, 100);
    this.button = new Button(SW);
    this._registerListener();
  }

  cleanup() {
    deinit_gpio(this.pins.CLK);
    deinit_gpio(this.pins.DT);
    this.button.cleanup();
  }

  _appendEvent(eventType, callback) {
    this.eventList[eventType] = this.eventList[eventType] || [];

    this.eventList[eventType].push(callback);
  }
  _triggerEvent(eventType, event) {
    if (!this.eventList[eventType] || this.eventList[eventType].length === 0)
      return;

    this.eventList[eventType].forEach((eventCallback) => {
      eventCallback(event);
    });
  }

  _registerListener() {
    watch_gpio(
      this.pins.CLK,
      gpio.GPIO_MODE_INPUT_PULLUP,
      400,
      gpio.GPIO_EDGE_BOTH,
      (state) => {
        if (state === 1) {
          const dtValue = get_gpio(this.pins.DT);
          const direction = dtValue ? "left" : "right";
          this._triggerEvent("turn", { direction });
          this._triggerEvent(direction === "left" ? "turnLeft" : "turnRight");
        }
      }
    );

    this.button.onPress(() => {
      this._triggerEvent("press");
    });

    this.button.onShortPress(() => {
      this._triggerEvent("shortPress");
    });

    this.button.onLongPress(() => {
      this._triggerEvent("longPress");
    });
  }

  onTurn(callback) {
    this._appendEvent("turn", callback);
  }

  onTurnLeft(callback) {
    this._appendEvent("turnLeft", callback);
  }
  onTurnRight(callback) {
    this._appendEvent("turnRight", callback);
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

exports.Rotary = Rotary;

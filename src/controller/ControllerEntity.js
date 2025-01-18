class ControllerEntity {
  focused = false;
  active = false;
  id;
  events = {};

  constructor(id, controller) {
    this.id = id;
    this.controller = controller;

    this.controller.register(this);
  }

  focus() {
    this.focused = true;
  }

  blur() {
    this.focused = false;
  }

  setActive(active) {
    this.active = active;
  }

  onPress(cb) {
    this._addListener("press", cb);
  }
  press() {
    this._trigger("press");
  }

  _addListener(eventName, cb) {
    this.events[eventName] = this.events[eventName] || [];

    this.events[eventName].push(cb);
  }
  _trigger(eventName) {
    const events = this.events[eventName] || [];

    events.forEach((event) => {
      event();
    });
  }
}

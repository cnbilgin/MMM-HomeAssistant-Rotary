class ControllerEntity {
  focused = false;
  active = false;

  constructor(controller) {
    this.controller = controller;

    this.controller.register(this);
  }

  focus() {
    this.focused = true;
  }

  blur() {
    this.focused = false;
  }

  press() {
    this.active = !this.active;
  }
}

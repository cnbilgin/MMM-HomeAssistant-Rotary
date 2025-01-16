class ControllerEntity {
  focused = false;
  active = false;
  id;

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

  press() {
    this.active = !this.active;
  }

  setActive(active) {
    this.active = active;
  }
}

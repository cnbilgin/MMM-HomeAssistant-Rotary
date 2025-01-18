class UIEntity extends ControllerEntity {
  dom;
  constructor(config, controller) {
    super(config.id, controller);
    this.config = config;
  }

  createElement() {
    const entity = document.createElement("div");
    entity.id = this.id;
    entity.classList.add("ha-entity");

    this.dom = entity;
    return entity;
  }

  render() {
    const entity = this.dom;
    entity.className = "ha-entity";

    if (this.focused) entity.classList.add("ha-focused");
    if (this.active) entity.classList.add("ha-active");
  }

  focus() {
    super.focus();
    this.render();
  }

  blur() {
    super.blur();
    this.render();
  }

  press() {
    super.press();
    this.render();
  }

  setActive(active) {
    super.setActive(active);
    this.render();
  }
}

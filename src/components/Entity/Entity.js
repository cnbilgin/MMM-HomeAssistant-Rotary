class Entity {
  focused = false;
  active = false;
  dom = null;

  constructor(config, icon, controller) {
    this.config = config;
    this.icon = icon;
    this.id = `ha_entity_${config.id}`;
    this.controller = controller;
  }

  createElement() {
    const entity = document.createElement("div");
    entity.id = this.id;
    entity.classList.add("ha-entity");

    const button = document.createElement("button");

    const icon = document.createElement("i");
    icon.classList.add("ha-entity-icon");
    icon.classList.add("fa-solid");
    if (this.icon) icon.classList.add(this.icon);

    const info = document.createElement("div");
    info.classList.add("ha-entity-info");

    const name = document.createElement("div");
    name.classList.add("ha-entity-name");
    name.innerText = this.config.name;

    info.append(name);

    button.append(icon);
    button.append(info);

    entity.append(button);

    this.dom = entity;
    this.controller.register(this);
    return entity;
  }

  render() {
    const entity = this.dom;
    entity.className = "ha-entity";

    if (this.focused) entity.classList.add("ha-focused");
    if (this.active) entity.classList.add("ha-active");
  }

  focus() {
    this.focused = true;
    this.render();
  }

  blur() {
    this.focused = false;
    this.render();
  }

  press() {
    this.active = !this.active;
    this.render();
  }
}

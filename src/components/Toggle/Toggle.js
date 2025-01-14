class Toggle extends UIEntity {
  createElement() {
    const entity = super.createElement();
    this._addEntityClasses(entity);

    const button = document.createElement("button");

    const icon = document.createElement("i");
    icon.classList.add("ha-toggle-icon");
    icon.classList.add("fa-solid");
    if (this.config.icon) icon.classList.add(this.config.icon);

    const info = document.createElement("div");
    info.classList.add("ha-toggle-info");

    const name = document.createElement("div");
    name.classList.add("ha-toggle-name");
    name.innerText = this.config.name;

    info.append(name);

    button.append(icon);
    button.append(info);

    entity.append(button);

    this.dom = entity;
    return entity;
  }

  render() {
    super.render();

    const entity = this.dom;
    this._addEntityClasses(entity);
  }

  focus() {
    super.focus();
  }

  blur() {
    super.blur();
  }

  press() {
    super.press();
  }

  _addEntityClasses(entity) {
    entity.classList.add("ha-toggle");
    if (this.config.color) entity.classList.add(this.config.color);
  }
}

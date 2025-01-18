class Section {
  constructor(id, config, controller) {
    this.config = config;
    this.id = `ha_section_${id}`;
    this.controller = controller;

    this.loadEntities();
  }

  createElement() {
    const section = document.createElement("div");
    section.id = this.id;
    section.classList.add("ha-section");

    const title = document.createElement("div");
    title.classList.add("ha-section-title");
    title.innerText = this.config.name;

    const container = document.createElement("div");
    container.classList.add("ha-section-container");

    for (const entity of this.entities) {
      container.append(entity.createElement());
    }

    section.append(title);
    section.append(container);

    return section;
  }

  loadEntities() {
    this.entities = [];
    for (const entity of this.config.entities) {
      const EntityClass = this.entityFactory(entity);
      this.entities.push(new EntityClass(entity, this.controller));
    }
  }

  entityFactory(config) {
    const type = config.id.split(".")[0];
    switch (type) {
      case "switch":
        return Toggle;
    }
  }
}

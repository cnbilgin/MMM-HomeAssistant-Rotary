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

  // render() {
  //   const section = document.getElementById(this.id);
  //   const container = section.querySelector(".ha-section-container");

  //   container.innerHTML = "";
  //   for (const entity of this.entities) {
  //     container.append(entity.getContainer());
  //   }
  // }

  loadEntities() {
    this.entities = [];
    for (const entity of this.config.entities) {
      this.entities.push(new Entity(entity, "fa-lightbulb", this.controller));
    }
  }
}

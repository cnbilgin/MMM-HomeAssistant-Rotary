Module.register("MMM-HomeAssistant-Rotary", {
  defaults: {
    host: "http://127.0.0.1",
    port: 8123,
    token: "SECRET_TOKEN",
    sections: []
  },

  getStyles() {
    return ["MMM-HomeAssistant-Rotary.css", "font-awesome.css"];
  },
  getScripts() {
    return [
      this.file("./src/controller/Controller.js"),
      this.file("./src/controller/ControllerEntity.js"),
      this.file("./src/components/UIEntity/UIEntity.js"),
      this.file("./src/components/Toggle/Toggle.js"),
      this.file("./src/components/Section/Section.js"),
      this.file("./src/interactions/Interaction.js"),
      this.file("./src/interactions/KeyboardInteraction.js"),
      this.file("./src/interactions/RotaryInteraction/RotaryInteraction.js")
    ];
  },

  start() {
    this.controller = new Controller();
    this.loadSections(this.controller);

    this.initInteractions();
    this.interactions.rotary.initSocketNotification(this);
  },

  getDom() {
    const wrapper = document.createElement("div");
    for (const section of this.sections) {
      wrapper.append(section.createElement());
    }

    this.interactions.keyboard.initListener(document);

    return wrapper;
  },

  /**
   * Handle notifications received by the node helper.
   * So we can communicate between the node helper and the module.
   *
   * @param {string} notification - The notification identifier.
   * @param {any} payload - The payload data`returned by the node helper.
   */
  socketNotificationReceived(notification, payload) {
    this.interactions.rotary.socketNotificationReceived(notification, payload);
  },

  initInteractions() {
    this.interactions = {
      keyboard: new KeyboardInteraction(this.controller),
      rotary: new RotaryInteraction(this.controller)
    };
  },

  loadSections(controller) {
    this.sections = [];
    for (const [i, sec] of this.config.sections.entries()) {
      const section = new Section(i, sec, controller);
      this.sections.push(section);
    }
  }
});

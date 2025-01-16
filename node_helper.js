const NodeHelper = require("node_helper");
const {
  RotaryInteractionNodeHelper
} = require("./src/interactions/RotaryInteraction/RotaryInteractionNodeHelper.js");
const {
  createLongLivedTokenAuth,
  createConnection,
  subscribeEntities
} = require("home-assistant-js-websocket");

module.exports = NodeHelper.create({
  clients: {},
  start() {
    this.rotaryHelper = new RotaryInteractionNodeHelper(this, {
      SW: 27,
      CLK: 17,
      DT: 18
    });
  },

  async socketNotificationReceived(notification, payload) {
    this.rotaryHelper.socketNotificationReceived(notification, payload);

    switch (notification) {
      case "INIT":
        this._init(payload);
        break;
    }
  },

  _init({ identifier, haConfig, entityIds }) {
    const clientStates = {};
    clientStates.entites = [];

    this.clients[identifier] = clientStates;

    this.connectWs(identifier, haConfig, entityIds);
  },

  async connectWs(identifier, { host, port, token }, entityIds) {
    const auth = createLongLivedTokenAuth(`${host}:${port}`, token);
    const connection = await createConnection({ auth });

    this.clients[identifier].connection = connection;

    subscribeEntities(connection, (entities) =>
      this.updateEntities(identifier, entityIds, entities)
    );
  },

  updateEntities(identifier, entityIds, entities) {
    entityIds.forEach((entityId) => {
      const entity = entities[entityId];
      if (entity) this.updateEntity(identifier, entity);
    });

    this.sendSocketNotification(
      "ENTITIES_UPDATE",
      this.clients[identifier].entities
    );
  },

  updateEntity(identifier, entity) {
    const entities = this.clients[identifier].entities || {};
    const slimEntity = {
      id: entity.entity_id,
      state: entity.state,
      name: entity.attributes.friendly_name
    };
    entities[slimEntity.id] = slimEntity;

    this.clients[identifier].entities = entities;
  }
});
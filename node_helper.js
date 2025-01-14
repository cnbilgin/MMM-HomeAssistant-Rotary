const NodeHelper = require("node_helper");
const { RotaryInteractionNodeHelper } = require("./src/interactions/RotaryInteraction/RotaryInteractionNodeHelper.js");

module.exports = NodeHelper.create({
	start() {
		this.rotaryHelper = new RotaryInteractionNodeHelper(this, {
			SW: 27,
			CLK: 17,
			DT: 18
		});
	},

	async socketNotificationReceived(notification, payload) {
		this.rotaryHelper.socketNotificationReceived(notification, payload);
	}
});

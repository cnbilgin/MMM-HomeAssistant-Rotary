const { Rotary } = require("../../gpio/Rotary.js");

class RotaryInteractionNodeHelper {
	rotary;
	constructor(nodeHelper, rotaryPins) {
		this.nodeHelper = nodeHelper;
		this.rotaryPins = rotaryPins;
	}

	socketNotificationReceived(notification, payload) {
		if (notification === "ROTARY_INIT") this._init();
	}

	_init() {
		if (this.rotary) return;

		this.rotary = new Rotary(this.rotaryPins);

		this.rotary.onTurnLeft(() => {
			this.nodeHelper.sendSocketNotification("ROTARY_PREV");
		});

		this.rotary.onTurnRight(() => {
			this.nodeHelper.sendSocketNotification("ROTARY_NEXT");
		});

		this.rotary.onPress(() => {
			this.nodeHelper.sendSocketNotification("ROTARY_PRESS");
		});
	}
}

module.exports = {
	RotaryInteractionNodeHelper
};

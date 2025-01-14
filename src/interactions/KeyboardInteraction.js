class KeyboardInteraction extends Interaction {
	initListener(container) {
		container.addEventListener("keyup", (e) => {
			switch (e.key) {
				case "ArrowLeft":
					this.controller.prev();
					break;
				case "ArrowRight":
					this.controller.next();
					break;
				case "Enter":
					this.controller.press();
			}
		});
	}
}

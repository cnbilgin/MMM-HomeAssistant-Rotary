class Controller {
  entityList = [];
  activeEntity = null;
  constructor(updateFn) {
    this.updateFn = updateFn;
  }

  next() {
    if (this.activeEntity) this.activeEntity.blur();

    let nextIndex =
      this.entityList.findIndex((p) => p === this.activeEntity) + 1;
    if (nextIndex >= this.entityList.length) nextIndex = 0;

    this.activeEntity = this.entityList[nextIndex];
    this.activeEntity.focus();
  }

  prev() {
    if (this.activeEntity) this.activeEntity.blur();

    let prevIndex =
      this.entityList.findIndex((p) => p === this.activeEntity) - 1;
    if (prevIndex < 0) prevIndex = this.entityList.length - 1;

    this.activeEntity = this.entityList[prevIndex];
    this.activeEntity.focus();
  }

  press() {
    if (!this.activeEntity) return;

    this.activeEntity.press();
  }

  register(entity) {
    entity.onPress(() => {
      this.updateFn(entity.id);
    });

    this.entityList.push(entity);
  }

  socketNotificationReceived(notification, payload) {
    if (notification !== "ENTITIES_UPDATE") return;

    Object.values(payload).forEach((entityData) => {
      const entity = this.entityList.find((p) => p.id === entityData.id);
      if (entity) {
        entity.setActive(entityData.state === "on");
      }
    });
  }
}

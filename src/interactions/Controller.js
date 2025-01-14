class Controller {
  entityList = [];
  activeEntity = null;

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
    this.entityList.push(entity);
  }
}

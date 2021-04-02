import ReactDOM from "react-dom";
import Phaser from "phaser";
import React from "react";
import { moveVelocity } from "./config";

export default class Dom {
  private el: HTMLElement;
  private obj: Phaser.GameObjects.DOMElement;
  private movement?: Phaser.Tweens.Tween;
  private scene: Phaser.Scene;
  private audioIndicator: Phaser.Geom.Ellipse;

  constructor(scene: Phaser.Scene, el: JSX.Element, size: number) {
    this.scene = scene;
    this.audioIndicator = new Phaser.Geom.Ellipse(0, 0, 0, 0);

    this.el = document.createElement("div");
    ReactDOM.render(<React.StrictMode>{el}</React.StrictMode>, this.el);
    this.obj = scene.add.dom(
      scene.scale.width / 2,
      scene.scale.height / 2,
      this.el
    );
    scene.physics.add.existing(this.obj);

    /*
    this.obj.setInteractive(
      new Phaser.Geom.Ellipse(0, 0, size, size),
      Phaser.Geom.Ellipse.Contains
    );
    this.obj.addListener(Phaser.Input.Events.POINTER_UP);
    this.obj.addListener(Phaser.Input.Events.POINTER_OVER);
    this.obj.addListener(Phaser.Input.Events.POINTER_OUT);
    this.obj.on(Phaser.Input.Events.POINTER_UP, this.onPointerUp, this);
    this.obj.on(Phaser.Input.Events.POINTER_OVER, this.onPointerOver, this);
    this.obj.on(Phaser.Input.Events.POINTER_OUT, this.onPointerOut, this);
    */
  }

  onPointerUp(
    pointer: Phaser.Input.Pointer,
    localX: number,
    localY: number,
    event: Phaser.Types.Input.EventData
  ) {
    event.stopPropagation();
  }

  onPointerOver(
    pointer: Phaser.Input.Pointer,
    localX: number,
    localY: number,
    event: Phaser.Types.Input.EventData
  ) {}

  onPointerOut(
    pointer: Phaser.Input.Pointer,
    localX: number,
    localY: number,
    event: Phaser.Types.Input.EventData
  ) {}

  destroy() {
    ReactDOM.unmountComponentAtNode(this.el);
    this.obj.removeAllListeners();
    this.obj.destroy();
  }

  moveTo(x: number, y: number) {
    const dist = Phaser.Math.Distance.Between(this.obj.x, this.obj.y, x, y);
    this.movement?.stop();
    this.movement = this.scene.tweens.add({
      targets: [this.obj, this.audioIndicator],
      x,
      y,
      duration: (500 * dist) / moveVelocity,
    });
  }

  setPosition(x: number, y: number) {
    this.movement?.stop();
    this.obj.setPosition(x, y);
    this.audioIndicator.setPosition(x, y);
  }

  position() {
    return { x: this.obj.x, y: this.obj.y };
  }

  visible() {
    return this.obj.visible;
  }

  setVisible(value: boolean) {
    this.obj.setVisible(value);
  }

  captureMainCamera() {
    this.scene.cameras.main.startFollow(this.obj);
  }
}

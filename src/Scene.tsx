import Phaser from "phaser";
import { avatarSize, moveVelocity } from "./config";
import Dom from "./Dom";
import React from "react";
import Avatar from "./Avatar";

const maxZoomLevel = 6;

class Scene extends Phaser.Scene {
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  zoomLevel: number;

  me?: Dom;

  constructor() {
    super("PlayGame");
    this.zoomLevel = 1;
  }

  preload() {}

  create() {
    const width = this.scale.width;
    const height = this.scale.height;

    this.cameras.main.setBounds(0, 0, width, height);

    const floor = this.add.tileSprite(
      width / 2,
      height / 2,
      width,
      height,
      "fake-background"
    );

    this.cursors = this.input.keyboard.createCursorKeys();
    this.zoomTo(3);

    this.input.on(Phaser.Input.Events.POINTER_WHEEL, this.onPointerWheel, this);
    this.input.on(Phaser.Input.Events.POINTER_UP, this.onPointerUp, this);
    this.events.on(Phaser.Scenes.Events.DESTROY, this.onDestroy, this);

    this.me = new Dom(this, <Avatar id="id" mini />, avatarSize);
    this.me.captureMainCamera();
  }

  zoomTo(level: number) {
    this.zoomLevel = Math.max(1, Math.min(maxZoomLevel, level));
    this.cameras.main.zoomEffect.reset();
    this.cameras.main.zoomTo(this.zoomLevel, 150);
  }

  update() {
    if (this.input.activePointer.isDown) {
      console.info(
        this.input.activePointer.worldX,
        this.input.activePointer.worldY
      );
    }
    if (this.me) {
      const cursors = this.cursors!;
      const d = moveVelocity / 10;
      let { x, y } = this.me.position();
      let toX = x;
      let toY = y;

      if (cursors.left.isDown) {
        toX -= d;
      } else if (cursors.right.isDown) {
        toX += d;
      }
      if (cursors.up.isDown) {
        toY -= d;
      } else if (cursors.down.isDown) {
        toY += d;
      }

      if (Phaser.Math.Distance.Between(x, y, toX, toY) > 1) {
        this.me.moveTo(toX, toY);
      }
    }
  }

  onDestroy() {
    if (this.me) this.me.destroy();
  }

  onPointerWheel(
    pointer: any,
    gameObjects: any,
    deltaX: any,
    deltaY: any,
    deltaZ: any
  ) {
    this.zoomTo(this.zoomLevel - (deltaY * this.zoomLevel) / 1600);
  }

  onPointerUp(pointer: Phaser.Input.Pointer) {
    console.log("mouse down");
    if (this.me && pointer.button != 2 /* skip right click */) {
      this.me.moveTo(pointer.worldX, pointer.worldY);
    }
  }
}

const config = {
  type: Phaser.AUTO,
  parent: "stage",
  width: 900,
  height: 900,
  pixelArt: true,
  dom: {
    createContainer: true,
  },
  physics: {
    default: "arcade",
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  backgroundColor: "#efefef",
  scene: Scene,
};

export function makeGame() {
  return new Phaser.Game(config);
}

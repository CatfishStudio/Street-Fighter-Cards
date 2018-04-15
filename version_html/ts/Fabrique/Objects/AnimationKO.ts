module Fabrique {
    export class AnimationKO extends Phaser.Sprite {
        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, Images.KOLevel);
            this.init();
        }

        private init(): void {
            this.scale.set(0, 0);
            let tween: Phaser.Tween = this.game.add.tween(this.scale);
            tween.to({ x: 1, y: 1 }, 250, 'Linear');
            tween.start();
        }
    }
}
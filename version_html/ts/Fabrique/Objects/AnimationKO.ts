module Fabrique {
    export class AnimationKO extends Phaser.Sprite {
        private xEnd:number;
        private yEnd:number;

        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, Images.KOLevel);
            this.init(x, y);
        }

        private init(x: number, y: number): void {
            this.xEnd = x;
            this.yEnd = y;
            this.x = x + (this.width / 2);
            this.y = x + (this.height / 2);
            this.scale.set(0, 0);

            let tweenScale: Phaser.Tween = this.game.add.tween(this.scale);
            tweenScale.to({ x: 1, y: 1 }, 250, 'Linear');
            tweenScale.start();

            let tweenPosition: Phaser.Tween = this.game.add.tween(this);
            tweenPosition.to({ x: this.xEnd, y: this.yEnd }, 250, 'Linear');
            tweenPosition.start();
        }
    }
}
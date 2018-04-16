module Fabrique {
    export class AnimationFight extends Phaser.Sprite {
        private x1:number;
        private y1:number;
        private x2:number;
        private y2:number;


        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, Images.FightLevel);
            this.init(x, y);
        }

        private init(x: number, y: number): void {
            this.x1 = x;
            this.y1 = y;
            this.x2 = x + (this.width / 2);
            this.y2 = x + (this.height / 4);

            this.scale.set(0, 0);
            this.x = this.x2;
            this.y = this.y2

            let tweenScale: Phaser.Tween = this.game.add.tween(this.scale);
            tweenScale.onComplete.add(this.onTweenMaxScaleComplete, this);
            tweenScale.to({ x: 1, y: 1 }, 500, 'Linear');
            tweenScale.start();

            let tweenPosition: Phaser.Tween = this.game.add.tween(this);
            tweenPosition.onComplete.add(this.onTweenPositionComplete, this);
            tweenPosition.to({ x: this.x1, y: this.y1 }, 500, 'Linear');
            tweenPosition.start();
        }

        private onTweenPositionComplete():void {
            let tweenPosition: Phaser.Tween = this.game.add.tween(this);
            tweenPosition.to({ x: this.x2, y: this.y2 }, 500, 'Linear');
            tweenPosition.start();
        }

        private onTweenMaxScaleComplete():void {
            let tweenScale: Phaser.Tween = this.game.add.tween(this.scale);
            tweenScale.onComplete.add(this.onTweenMinScaleComplete, this);
            tweenScale.to({ x: 0, y: 0 }, 500, 'Linear');
            tweenScale.start();
        }

        private onTweenMinScaleComplete():void {
            this.removeChildren();
        }
    }
}
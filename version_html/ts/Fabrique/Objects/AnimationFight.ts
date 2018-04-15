module Fabrique {
    export class AnimationFight extends Phaser.Sprite {
        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, Images.FightLevel);
            this.init();
        }

        private init(): void {
            this.scale.set(0, 0);

            let tween: Phaser.Tween = this.game.add.tween(this.scale);
            tween.onComplete.add(this.onTweenUpComplete, this);
            tween.to({ x: 1, y: 1 }, 500, 'Linear');
            tween.start();
        }

        private onTweenUpComplete():void {
            let tween: Phaser.Tween = this.game.add.tween(this.scale);
            tween.onComplete.add(this.onTweenUpComplete, this);
            tween.to({ x: 0, y: 0 }, 500, 'Linear');
            tween.start();
        }

        private onTweenDownComplete():void {
            this.removeChildren();
        }
    }
}
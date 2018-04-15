module Fabrique {
    export class AnimationFlash extends Phaser.Sprite {
        private animation: Phaser.Animation;

        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, Atlases.Flash, 0);
            this.init();
        }

        private init(): void {
            this.visible = false;
            this.animation = this.animations.add(Atlases.Flash);
            this.animation.onComplete.add(this.onComplete, this);
        }

        private onComplete(): void {
            this.visible = false;
        }

        public playAnimation(): void {
            this.visible = true;
            this.animation.frame = 0;
            this.animation.play(10, false, false);
        }
    }
}
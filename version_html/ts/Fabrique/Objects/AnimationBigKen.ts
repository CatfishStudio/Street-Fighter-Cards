module Fabrique {
    export class AnimationBigKen extends Phaser.Sprite {
        constructor(game:Phaser.Game){
            super(game, 0, 0, Atlases.BigKen, 0);
            this.init();
        }

        private init():void {
            let anim: Phaser.Animation = this.animations.add(Atlases.BigKen);
            anim.onComplete.add(this.onCompleteVideo, this);
            anim.play(10, true, false);
        }

        private onCompleteVideo():void {

        }
    }
}
module Fabrique {
    export class AnimationFighter extends Phaser.Sprite {
        
        constructor(game:Phaser.Game, atlas:string){
            super(game, 0, 0, atlas, 54);
            this.init(atlas);
        }

        private init(atlas:string):void {
            let anim: Phaser.Animation = this.animations.add(atlas, [54,55,56,57,58,59,60,61,62,63]);
            anim.onComplete.add(this.onComplete, this);
            anim.play(10, true, false);
        }

        private onComplete():void {

        }
    }
}
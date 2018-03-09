module Fabrique {
    export class AnimationFighter extends Phaser.Sprite {
        
        constructor(game:Phaser.Game, personageName: string, personageAnim:string[]){
            super(game, 0, 0, personageName, 54);
            this.init(personageName, personageAnim);
        }

        private init(personageName: string, personageAnim:string[]):void {
            let anim: Phaser.Animation = this.animations.add(personageName, personageAnim);
            anim.onComplete.add(this.onComplete, this);
            anim.play(10, true, false);
        }

        private onComplete():void {

        }
    }
}
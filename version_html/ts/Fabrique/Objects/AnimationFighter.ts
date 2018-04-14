module Fabrique {
    export class AnimationFighter extends Phaser.Sprite {
        public event: Phaser.Signal;
        private animation: Phaser.Animation;
        private personageAnimation: GameData.IPersonage;
        private fighterType: string;
        private animationType: string;

        constructor(game: Phaser.Game, fighterType: string, personageName: string, personageAnim: GameData.IPersonage) {
            super(game, 0, 0, personageName, 54);
            this.fighterType = fighterType;
            this.personageAnimation = personageAnim;
            this.init();
        }

        private init(): void {
            this.event = new Phaser.Signal();

            this.animationType = Constants.ANIMATION_TYPE_STANCE;
            this.animation = this.animations.add(this.personageAnimation.name, this.personageAnimation.animStance);
            this.animation.onComplete.add(this.onComplete, this);
            this.animation.play(15, true, false);
        }

        private onComplete(sprite, animation): void {
            //console.log( (sprite as AnimationFighter).animation);
            
            if(this.animationType === Constants.ANIMATION_TYPE_STANCE) return;

            if(this.fighterType === Constants.ACTIVE_PLAYER){
                this.event.dispatch(Constants.ANIMATION_PLAYER_COMPLETE, this.animationType);
            }else{
                this.event.dispatch(Constants.ANIMATION_OPPONENT_COMPLETE, this.animationType);
            }
        }

        public stanceAnimation():void{
            this.animation.stop();
            this.animationType = Constants.ANIMATION_TYPE_STANCE;
            this.animation = this.animations.add(this.personageAnimation.name, this.personageAnimation.animStance);
            this.animation.onComplete.add(this.onComplete, this);
            this.animation.play(15, true, false);
        }

        public hitAnimation(cardData: GameData.ICard): void {
            this.animation.stop();            
            
            if(cardData.type === Constants.CARD_TYPE_ATTACK){
                this.animationType = Constants.ANIMATION_TYPE_HIT;

                if (cardData.power > 20) {
                    this.animation = this.animations.add(this.personageAnimation.name, this.personageAnimation.animHitLeg);
                } else {
                    this.animation = this.animations.add(this.personageAnimation.name, this.personageAnimation.animHitHand);
                }
            }else{
                this.animationType = Constants.ANIMATION_TYPE_BLOCK;
                
                this.animation = this.animations.add(this.personageAnimation.name, this.personageAnimation.animBlock);
            }
            
            this.animation.onComplete.add(this.onComplete, this);
            this.animation.play(15, false, false);
        }

        public damageAnimation():void {
            this.animationType = Constants.ANIMATION_TYPE_DAMAGE;
            this.animation.stop();
            this.animation = this.animations.add(this.personageAnimation.name, this.personageAnimation.animDamage);
            this.animation.onComplete.add(this.onComplete, this);
            this.animation.play(15, false, false);
        }

        public loseAnimation():void {
            this.animationType = Constants.ANIMATION_TYPE_LOSE;
            this.animation.stop();
            this.animation = this.animations.add(this.personageAnimation.name, this.personageAnimation.animLose);
            this.animation.onComplete.add(this.onComplete, this);
            this.animation.play(15, false, false);
        }

        public winAnimation():void {
            this.animationType = Constants.ANIMATION_TYPE_WIN;
            this.animation.stop();
            this.animation = this.animations.add(this.personageAnimation.name, this.personageAnimation.animWin);
            this.animation.onComplete.add(this.onComplete, this);
            this.animation.play(15, false, false);
        }
    }
}
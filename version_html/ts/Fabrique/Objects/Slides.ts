module Fabrique {

    export class Slides extends Phaser.Group {
        private slideGroup:Phaser.Group;
        private buttonLeft:Phaser.Button;
        private buttonRight:Phaser.Button;

        private canClick:boolean;
        
        private fighters:GameData.IFighter[] = [];
        
        constructor(game:Phaser.Game, parent:Phaser.Group){
            super(game, parent);
            this.init();
            this.createSlides();
        }

        public shutdown():void {
            this.slideGroup.removeAll();
            this.removeAll();
        }

        private init():void {
            GameData.Data.fighterIndex = 1;
            for(let i:number = 0; i < GameData.Data.fighters.length; i++){
                let fighter:GameData.IFighter = <GameData.IFighter>{};
                fighter.id = GameData.Data.fighters[i][0];
                fighter.name = GameData.Data.fighters[i][1];
                fighter.frame = GameData.Data.fighters[i][2];
                this.fighters.push(fighter); 
            }
            this.canClick = true;
        }
        
        private createSlides():void{
            this.slideGroup = new Phaser.Group(this.game, this);
            
            let posX:number = 5;
            let posY:number = 90;
            for(let i:number = 0; i < this.fighters.length; i++){
                let fCard:Fabrique.FighterCard = new Fabrique.FighterCard(this.game, posX + (300 * i), posY, this.fighters[i]);
                this.slideGroup.addChild(fCard);
            }

            this.buttonLeft = new Phaser.Button(this.game, 205, 190, Images.ArrowLeft, this.onButtonClick, this);
            this.buttonLeft.name = Constants.BUTTON_ARROW_LEFT;
            this.addChild(this.buttonLeft);

            this.buttonRight = new Phaser.Button(this.game, 505, 190, Images.ArrowRight, this.onButtonClick, this);
            this.buttonRight.name = Constants.BUTTON_ARROW_RIGHT;
            this.addChild(this.buttonRight);            
        }

        private onButtonClick(event) {
            switch (event.name) {
                case Constants.BUTTON_ARROW_LEFT:
                    {
                        if(this.canClick){
                            this.canClick = false;
                            GameData.Data.fighterIndex--;
                            let tween: Phaser.Tween = this.game.add.tween(this.slideGroup);
                            tween.to({ x: this.slideGroup.x + 300}, 250, 'Linear');
                            tween.onComplete.add(this.onTweenComplete, this);
                            tween.start();
                        }
                        break;
                    }
                case Constants.BUTTON_ARROW_RIGHT:
                    {
                        if(this.canClick){
                            this.canClick = false;
                            GameData.Data.fighterIndex++;
                            let tween: Phaser.Tween = this.game.add.tween(this.slideGroup);
                            tween.to({ x: this.slideGroup.x - 300}, 250, 'Linear');
                            tween.onComplete.add(this.onTweenComplete, this);
                            tween.start();
                        }
                        break;
                    }                
                default:
                    break;
            }
        }

        private onTweenComplete(event:any):void {
            if(GameData.Data.fighterIndex === 0){
                this.buttonLeft.visible = false;
                this.buttonRight.visible = true;
            }else if(GameData.Data.fighterIndex === this.fighters.length-1){
                this.buttonLeft.visible = true;
                this.buttonRight.visible = false;
            }else{
                this.buttonLeft.visible = true;
                this.buttonRight.visible = true;
            }
            
            this.canClick = true;
        }
    }

}
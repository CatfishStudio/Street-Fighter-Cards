module Fabrique {

    export class Slides extends Phaser.Group {
        private slideGroup:Phaser.Group;
        private buttonLeft:Phaser.Button;
        private buttonRight:Phaser.Button;
        private infoBox:Fabrique.InfoBox;
        private canClick:boolean;
        private fighterIndex:number = 0;

        private fighters:Game.IFighter[] = [];
        private data:any[][] = [
            [0, 'Cyrex', 'cyrex.png'],
            [1, 'Scorpion', 'scorpion.png'],
            [2, 'Sub-Zero', 'sub-zero.png']
        ];

        constructor(game:Phaser.Game, parent:Phaser.Group){
            super(game, parent);
            this.visible = false;
            this.canClick = false;
            this.init();
        }

        private init():void{
            this.fighterIndex = 1;
            for(let i:number = 0; i < this.data.length; i++){
                let fighter:Game.IFighter = <Game.IFighter>{};
                fighter.id = this.data[i][0];
                fighter.name = this.data[i][1];
                fighter.frame = this.data[i][2];
                this.fighters.push(fighter);
            }
            this.createSlides();
            this.createInfoBox();
        }

        private createSlides():void{
            this.slideGroup = new Phaser.Group(this.game, this);
            
            let posX:number = 25;
            let posY:number = 150;
            for(let i:number = 0; i < this.fighters.length; i++){
                let fCard:Fabrique.FighterCard = new Fabrique.FighterCard(this.game, posX + (300 * i), posY, this.fighters[i]);
                this.slideGroup.addChild(fCard);
            }

            this.buttonLeft = new Phaser.Button(this.game, 240, 250, Images.ButtonLeft, this.onButtonClick, this);
            this.buttonLeft.name = 'button_left';
            this.addChild(this.buttonLeft);

            this.buttonRight = new Phaser.Button(this.game, 540, 250, Images.ButtonRight, this.onButtonClick, this);
            this.buttonRight.name = 'button_right';
            this.addChild(this.buttonRight);            
        }

        private createInfoBox():void{
            this.infoBox = new Fabrique.InfoBox(this.game, this, this.fighters[this.fighterIndex]);
        }

        public show():void{
            this.alpha = 0;
            this.visible = true;
            this.canClick = true;
            let tween: Phaser.Tween = this.game.add.tween(this);
            tween.to({ alpha: 1}, 500, 'Linear');
            tween.start();

        }

        private onButtonClick(event) {
            switch (event.name) {
                case 'button_left':
                    {
                        if(this.canClick){
                            this.canClick = false;
                            this.fighterIndex--;
                            let tween: Phaser.Tween = this.game.add.tween(this.slideGroup);
                            tween.to({ x: this.slideGroup.x + 300}, 500, 'Linear');
                            tween.onComplete.add(this.onTweenComplete, this);
                            tween.start();
                        }
                        break;
                    }
                case 'button_right':
                    {
                        if(this.canClick){
                            this.canClick = false;
                            this.fighterIndex++;
                            let tween: Phaser.Tween = this.game.add.tween(this.slideGroup);
                            tween.to({ x: this.slideGroup.x - 300}, 500, 'Linear');
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
            if(this.fighterIndex === 0){
                this.buttonLeft.visible = false;
                this.buttonRight.visible = true;
            }else if(this.fighterIndex === this.fighters.length-1){
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
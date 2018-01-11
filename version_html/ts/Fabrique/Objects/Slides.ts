module Fabrique {

    export class Slides extends Phaser.Group {
        private slideGroup:Phaser.Group;
        private buttonLeft:Phaser.Button;
        private buttonRight:Phaser.Button;

        private canClick:boolean;
        private fighterIndex:number = 0;

        private fighters:Game.IFighter[] = [];
        private data:any[][] = [
            [0, 'Akuma', 'akuma_card.png'],
            [1, 'Alex', 'alex_card.png'],
            [2, 'Chun Li', 'chun_li_card.png'],
            [3, 'Dudley', 'dudley_card.png'],
            [4, 'Elena', 'elena_card.png'],
            [5, 'Gill', 'gill_card.png'],
            [6, 'Hugo', 'hugo_card.png'],
            [7, 'Ibuki', 'ibuki_card.png'],
            [8, 'Ken', 'ken_card.png'],
            [9, 'Makoto', 'makoto_card.png'],
            [10, 'Necro', 'necro_card.png'],
            [11, 'Oro', 'oro_card.png'],
            [12, 'Q', 'q_card.png'],
            [13, 'Remy', 'remy_card.png'],
            [14, 'Ryu', 'ryu_card.png'],
            [15, 'Sean', 'sean_card.png'],
            [16, 'Twelve', 'twelve_card.png'],
            [17, 'Urien', 'urien_card.png'],
            [18, 'Yang', 'yang_card.png'],
            [19, 'Yun', 'yun_card.png']
        ];

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
            this.fighterIndex = 1;
            for(let i:number = 0; i < this.data.length; i++){
                let fighter:Game.IFighter = <Game.IFighter>{};
                fighter.id = this.data[i][0];
                fighter.name = this.data[i][1];
                fighter.frame = this.data[i][2];
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
                            this.fighterIndex--;
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
                            this.fighterIndex++;
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
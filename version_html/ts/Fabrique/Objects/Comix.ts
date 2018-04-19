module Fabrique {
    import ButtonComix = Fabrique.ButtonComix;

    export class Comix extends Phaser.Group {
        public event: Phaser.Signal;
        private buttonNext: ButtonComix;
        private background: Phaser.Sprite;
        private index:number;

        constructor(game:Phaser.Game, parent:Phaser.Group){
            super(game, parent);

            if(GameData.Data.comixIndex >= (GameData.Data.progressIndex+2)){
                this.removeAll();
            }else{
                this.init();
            }
        }

        public shutdown():void {
            GameData.Data.comixIndex++;
            this.buttonNext.shutdown();
            this.removeAll();
        }

        private init():void {
            this.event = new Phaser.Signal();
            this.index = 0;
            this.createBackground();
            this.createButton();
            this.createBorder();
        }

        private createBackground():void {
            this.background = new Phaser.Sprite(this.game, 0, 0, GameData.Data.comixes[GameData.Data.comixIndex][this.index]);
            this.addChild(this.background);
        }

        private createButton():void {
            if(GameData.Data.comixIndex < 20){
                this.buttonNext = new ButtonComix(this.game, this, Constants.BUTTON_NEXT, 'ДАЛЕЕ', 60, 600, 530);
            }else{
                this.buttonNext = new ButtonComix(this.game, this, Constants.BUTTON_NEXT, 'ВЫХОД', 60, 600, 530);
            }
            
            this.buttonNext.event.add(this.onButtonClick, this);
        }

        private createBorder():void {
            let border: Phaser.Sprite = new Phaser.Sprite(this.game, 0, 0, Images.BorderImage);
            this.addChild(border);
        }

        private onButtonClick(event) {
            if((GameData.Data.comixes[GameData.Data.comixIndex].length-1) === this.index){
                this.shutdown();
                this.parent.removeChild(this);
                if(GameData.Data.comixIndex === 21){
                    this.event.dispatch(Constants.GAME_OVER);
                }
            }else{
                this.index++;
                this.background.loadTexture(GameData.Data.comixes[GameData.Data.comixIndex][this.index]);
            }
        }
    }
}
module Fabrique {
    import ButtonComix = Fabrique.ButtonComix;

    export class Comix extends Phaser.Group {
        private buttonNext: ButtonComix;

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
            this.createBackground();
            this.createButton();
            this.createBorder();
        }

        private createBackground():void {
            let background: Phaser.Sprite = new Phaser.Sprite(this.game, 0, 0, GameData.Data.comixes[GameData.Data.comixIndex]);
            this.addChild(background);
        }

        private createButton():void {
            this.buttonNext = new ButtonComix(this.game, this, Constants.BUTTON_NEXT, 'ДАЛЕЕ', 60, 600, 530);
            this.buttonNext.event.add(this.onButtonClick, this);
        }

        private createBorder():void {
            let border: Phaser.Sprite = new Phaser.Sprite(this.game, 0, 0, Images.BorderImage);
            this.addChild(border);
        }

        private onButtonClick(event) {
            this.shutdown();
            this.parent.removeChild(this);
        }
    }
}
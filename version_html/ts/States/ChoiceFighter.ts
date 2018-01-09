module StreetFighterCards {
    import ButtonComix = Fabrique.ButtonComix;

    export class ChoiceFighter extends Phaser.State{

        public static Name: string = "choce_fighter";
        public name: string = Menu.Name;

        private groupWindow: Phaser.Group;
        private backgroundSprite:Phaser.Sprite;

        private buttonBack: ButtonComix;

        constructor() {
            super();
        }

        public create() {
            this.groupWindow = new Phaser.Group(this.game, this.stage);
            
            this.backgroundSprite = new Phaser.Sprite(this.game, 0, 0, Images.ChoiceImage)
            this.groupWindow.addChild(this.backgroundSprite);

            this.createButtons();
        }

        public shutdown(){
            this.buttonBack.removeAll();
            this.groupWindow.removeAll();
            this.game.stage.removeChildren();
        }

        private createButtons(){
            this.buttonBack = new ButtonComix(this.game, this.groupWindow, 'back', 'НАЗАД', 55, 10, 10);
            this.buttonBack.event.add(this.onButtonClick, this);

        }

        private onButtonClick(event) {
            switch (event.name) {
                case 'back':
                    {
                        this.game.state.start(Menu.Name, true, false);
                        break;
                    }
                            
                default:
                    break;
            }
        }


    }
}
module StreetFighterCards {
    import ButtonComix = Fabrique.ButtonComix;

    export class ChoiceFighter extends Phaser.State{

        public static Name: string = "choce_fighter";
        public name: string = Menu.Name;

        private groupWindow: Phaser.Group;
        
        private buttonBack: ButtonComix;
        private buttonSettings: ButtonComix;
        private buttonSelect: ButtonComix;

        constructor() {
            super();
        }

        public create() {
            this.groupWindow = new Phaser.Group(this.game, this.stage);
            
            this.createBackground();
            this.createButtons();
            this.createBorder();
        }

        public shutdown(){
            this.buttonBack.removeAll();
            this.buttonSelect.removeAll();
            this.buttonSettings.removeAll();
            this.groupWindow.removeAll();
            this.game.stage.removeChildren();
        }

        private createBackground(){
            let backgroundSprite:Phaser.Sprite = new Phaser.Sprite(this.game, 0, 0, Images.ChoiceImage);
            this.groupWindow.addChild(backgroundSprite);
        }

        private createButtons(){
            this.buttonBack = new ButtonComix(this.game, this.groupWindow, Constants.BUTTON_BACK, 'НАЗАД', 55, 10, 10);
            this.buttonBack.event.add(this.onButtonClick, this);

            this.buttonSettings = new ButtonComix(this.game, this.groupWindow, Constants.BUTTON_SETTINGS, 'НАСТРОЙКИ', 35, 300, 530);
            this.buttonSettings.event.add(this.onButtonClick, this);

            this.buttonSelect = new ButtonComix(this.game, this.groupWindow, Constants.BUTTON_SELECT, 'ВЫБРАТЬ', 50, 600, 530);
            this.buttonSelect.event.add(this.onButtonClick, this);
        }

        private createBorder(){
            let borderSprite:Phaser.Sprite = new Phaser.Sprite(this.game, 0, 0, Images.BorderImage);
            this.groupWindow.addChild(borderSprite);
        }

        private onButtonClick(event) {
            switch (event.name) {
                case Constants.BUTTON_BACK:
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
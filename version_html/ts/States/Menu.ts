module StreetFighterCards {

    import Tutorial = Fabrique.Tutorial;
    import Settings = Fabrique.Settings;

    export class Menu extends Phaser.State{
        public static Name: string = "menu";
        public name: string = Menu.Name;
        private menuSprite:Phaser.Sprite;
        private groupMenu: Phaser.Group;
        private groupButtons: Phaser.Group;
        
        constructor() {
            super();
        }
        
        public create() {
            this.groupMenu = new Phaser.Group(this.game, this.stage);
            
            this.menuSprite = new Phaser.Sprite(this.game, 0, 0, Images.MenuImage)
            this.groupMenu.addChild(this.menuSprite);
            
            this.createButtons();
        }

        public shutdown(){
            this.groupMenu.removeAll();
            this.game.stage.removeChildren();
        }

        public createButtons()
        {
            this.groupButtons = new Phaser.Group(this.game, this.groupMenu);
            this.groupButtons.x = 300;
            this.groupButtons.y = 300;

            let buttonStart = new Phaser.Button(this.game, 0, 0, Sheet.ButtonStyle1, this.onButtonClick, this, 1, 2);
            buttonStart.name = 'start';
            this.groupButtons.addChild(buttonStart);

        }

        private onButtonClick(event) {
            switch (event.name) {
                case 'start':
                    {
                        //this.game.state.start(Store.Name, true, false);
                        break;
                    }
                case 'continue':
                    {
                        
                        break;
                    }
                case 'settings':
                    {
                        //this.settingsCreate();
                        break;
                    }
                case 'setting_close':
                    {
                        //this.settingsClose();
                        break;
                    }
                case 'invite':
                    {
                        
                        break;
                    }                
                default:
                    break;
            }
        }

    }
}
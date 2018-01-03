module StreetFighterCards {

    import Tutorial = Fabrique.Tutorial;
    import Settings = Fabrique.Settings;
    import ButtonOrange = Fabrique.ButtonOrange;

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
            this.groupMenu.removeChildren();
            this.groupMenu.removeAll();
            this.groupButtons.removeChildren();
            this.groupButtons.removeAll();
            this.game.stage.removeChildren();
        }

        public createButtons()
        {
            this.groupButtons = new Phaser.Group(this.game, this.groupMenu);
            this.groupButtons.x = 300;
            this.groupButtons.y = 300;

            let buttonStart = new ButtonOrange(this.game, this.groupButtons, 'start', 0, 0);
            buttonStart.event.add(this.onButtonClick.bind(this));
        }

        private onButtonClick(event) {
            switch (event.name) {
                case 'start':
                    {
                        //this.game.state.start(Store.Name, true, false);
                        console.log("START");
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
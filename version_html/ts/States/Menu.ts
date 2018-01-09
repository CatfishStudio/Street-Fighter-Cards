module StreetFighterCards {

    import Tutorial = Fabrique.Tutorial;
    import Settings = Fabrique.Settings;
    import ButtonOrange = Fabrique.ButtonOrange;
    import AnimationBigKen = Fabrique.AnimationBigKen;
    import AnimationBigRyu = Fabrique.AnimationBigRyu;

    export class Menu extends Phaser.State{

        public static Name: string = "menu";
        public name: string = Menu.Name;

        private menuSprite:Phaser.Sprite;
        private groupMenu: Phaser.Group;
        private groupButtons: Phaser.Group;
        
        private buttonStart:ButtonOrange;
        private buttonSettings:ButtonOrange;
        private buttonInvate:ButtonOrange;

        constructor() {
            super();
        }
        
        public create() {
            this.groupMenu = new Phaser.Group(this.game, this.stage);
            
            this.menuSprite = new Phaser.Sprite(this.game, 0, 0, Images.MenuImage)
            this.groupMenu.addChild(this.menuSprite);

            let bigKen:AnimationBigKen = new AnimationBigKen(this.game);
            bigKen.scale.setTo(0.4, 0.4);
            bigKen.x = 35;
            bigKen.y = 225;
            this.groupMenu.addChild(bigKen);

            let bigRyu:AnimationBigRyu = new AnimationBigRyu(this.game);
            bigRyu.scale.setTo(0.4, 0.4);
            bigRyu.x = 555;
            bigRyu.y = 225;
            this.groupMenu.addChild(bigRyu);

            this.createButtons();
        }

        public shutdown(){
            this.buttonStart.removeAll();
            this.buttonSettings.removeAll();
            this.buttonInvate.removeAll();
            this.groupMenu.removeAll();
            this.groupButtons.removeAll();
            this.game.stage.removeChildren();
        }

        public createButtons()
        {
            this.groupButtons = new Phaser.Group(this.game, this.groupMenu);
            this.groupButtons.x = 300;
            this.groupButtons.y = 300;

            this.buttonStart = new ButtonOrange(this.game, this.groupButtons, 'start', 'НАЧАТЬ ИГРУ', 30, 0, 0);
            this.buttonStart.event.add(this.onButtonClick.bind(this));

            this.buttonSettings = new ButtonOrange(this.game, this.groupButtons, 'settings', 'НАСТРОЙКИ', 35,  0, 50);
            this.buttonSettings.event.add(this.onButtonClick.bind(this));

            this.buttonInvate = new ButtonOrange(this.game, this.groupButtons, 'invate', 'ПРИГЛАСИТЬ', 30,  0, 100);
            this.buttonSettings.event.add(this.onButtonClick.bind(this));
        }

        private onButtonClick(event) {
            switch (event.name) {
                case 'start':
                    {
                        this.game.state.start(ChoiceFighter.Name, true, false);
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
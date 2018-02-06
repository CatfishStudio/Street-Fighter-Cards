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
        private settings:Settings;

        constructor() {
            super();
        }
        
        public create():void {
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

        public shutdown():void {
            this.buttonStart.shutdown();
            this.buttonSettings.shutdown();
            this.buttonInvate.shutdown();
            this.groupMenu.removeAll();
            this.groupButtons.removeAll();
            this.game.stage.removeChildren();
        }

        public createButtons():void {
            this.groupButtons = new Phaser.Group(this.game, this.groupMenu);
            this.groupButtons.x = 300;
            this.groupButtons.y = 300;

            this.buttonStart = new ButtonOrange(this.game, this.groupButtons, Constants.BUTTON_PLAY, 'НАЧАТЬ ИГРУ', 30, 0, 0);
            this.buttonStart.event.add(this.onButtonClick, this);

            this.buttonSettings = new ButtonOrange(this.game, this.groupButtons, Constants.BUTTON_SETTINGS, 'НАСТРОЙКИ', 35,  0, 50);
            this.buttonSettings.event.add(this.onButtonClick, this);

            this.buttonInvate = new ButtonOrange(this.game, this.groupButtons, Constants.BUTTON_INVATE, 'ПРИГЛАСИТЬ', 30,  0, 100);
            this.buttonSettings.event.add(this.onButtonClick, this);
        }

        private dataInit():void {
            let deck1 = this.game.cache.getJSON('deck1').Deck;
            console.log(deck1);
            for(let key in deck1.cards){
                console.log(key);
                console.log(deck1.cards[key].type);
            }
        }

        private onButtonClick(event):void {
            switch (event.name) {
                case Constants.BUTTON_PLAY:
                    {
                        this.dataInit();
                        this.game.state.start(ChoiceFighter.Name, true, false);
                        break;
                    }
                case 'continue':
                    {
                        
                        break;
                    }
                case Constants.BUTTON_SETTINGS:
                    {
                        this.settingsCreate();
                        break;
                    }
                case Constants.BUTTON_SETTINGS_CLOSE:
                    {
                        this.settingsClose();
                        break;
                    }
                case Constants.BUTTON_INVATE:
                    {
                        
                        break;
                    }                
                default:
                    break;
            }
        }

        private settingsCreate() {
            this.settings = new Settings(this.game, this.groupMenu);
            this.settings.event.add(this.onButtonClick, this);
        }
        
        private settingsClose() {
            this.settings.removeAll();
            this.groupMenu.removeChild(this.settings);
        }
    }
}
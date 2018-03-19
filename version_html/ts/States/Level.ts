module StreetFighterCards {
    import AnimationFighter = Fabrique.AnimationFighter;
    import ButtonComix = Fabrique.ButtonComix;
    import Settings = Fabrique.Settings;

    export class Level extends Phaser.State {
        public static Name: string = "level";
        public name: string = Level.Name;

        private group: Phaser.Group;
        private playerAnimation: AnimationFighter;
        private opponentAnimation: AnimationFighter;
        private settings:Settings;
        private buttonExit: ButtonComix;
        private buttonSettings: ButtonComix;

        private playerDeck: GameData.ICard[];
        private playerHand: GameData.ICard[];
        private playerSlots: GameData.ICard[];

        private opponentDeck: GameData.ICard[];
        private opponentHand: GameData.ICard[];
        private opponentSlots: GameData.ICard[];
        
        constructor() {
            super();
        }

        public create():void {
            this.group = new Phaser.Group(this.game, this.stage);

            GameData.Data.deckMix(GameData.Data.fighterIndex);
            this.playerDeck = GameData.Data.personages[GameData.Data.fighterIndex].deck;
            this.playerHand = [null, null, null, null, null];
            this.playerSlots = [null, null, null];
            
            GameData.Data.deckMix(GameData.Data.progressIndex);
            this.opponentDeck = GameData.Data.personages[GameData.Data.progressIndex].deck;
            this.opponentHand = [null, null, null, null, null];
            this.opponentSlots = [null, null, null];

            this.createBackground();
            this.createFighters();
            this.createButtons();
            this.createHand();
            this.createBorder();
        }

        public shutdown():void {
            this.buttonExit.shutdown();
            this.buttonSettings.shutdown();
            this.group.removeAll();
            this.game.stage.removeChildren();
        }

        private createBackground():void {
            let opponentID: number = GameData.Data.tournamentListIds[GameData.Data.progressIndex];
            let levelTexture: string = GameData.Data.personages[opponentID].level;
            let background: Phaser.Sprite = new Phaser.Sprite(this.game, 0, 0, levelTexture);
            this.group.addChild(background);
        }

        private createHand():void {
            let background: Phaser.Sprite = new Phaser.Sprite(this.game, 0, 375, Images.HandBackground);
            this.group.addChild(background);
        }

        private createFighters():void {
            let playerPersonage:GameData.IPersonage = GameData.Data.personages[GameData.Data.fighterIndex];
            this.playerAnimation = new AnimationFighter(this.game, playerPersonage.name, playerPersonage.animStance);
            this.playerAnimation.x = 280;
            this.playerAnimation.y = 185;
            this.group.addChild(this.playerAnimation);

            let opponentPersonage:GameData.IPersonage = GameData.Data.personages[GameData.Data.tournamentListIds[GameData.Data.progressIndex]];
            this.opponentAnimation = new AnimationFighter(this.game, opponentPersonage.name, opponentPersonage.animStance);
            this.opponentAnimation.x = 480;
            this.opponentAnimation.y = 185;
            this.opponentAnimation.anchor.setTo(.5,.5);
            this.opponentAnimation.scale.x *= -1;
            this.group.addChild(this.opponentAnimation);
        }

        private createButtons():void {
            this.buttonExit = new ButtonComix(this.game, this.group, Constants.BUTTON_EXIT_BATTLE, 'ВЫЙТИ ИЗ БОЯ', 27, 20, 310);
            this.buttonExit.event.add(this.onButtonClick, this);

            this.buttonSettings = new ButtonComix(this.game, this.group, Constants.BUTTON_SETTINGS, 'НАСТРОЙКИ', 40, 600, 310);
            this.buttonSettings.event.add(this.onButtonClick, this);
        }

        private createBorder():void {
            let border: Phaser.Sprite = new Phaser.Sprite(this.game, 0, 0, Images.BorderLevel);
            this.group.addChild(border);
        }

        private settingsCreate() {
            this.settings = new Settings(this.game, this.group);
            this.settings.event.add(this.onButtonClick, this);
        }
        
        private settingsClose() {
            this.settings.removeAll();
            this.group.removeChild(this.settings);
        }

        private onButtonClick(event) {
            switch (event.name) {
                case Constants.BUTTON_EXIT_BATTLE:
                    {
                        this.game.state.start(Menu.Name, true, false);
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
                default:
                    break;
            }
        }

    }
}
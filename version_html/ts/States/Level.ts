module StreetFighterCards {
    import AnimationFighter = Fabrique.AnimationFighter;
    import ButtonComix = Fabrique.ButtonComix;
    import Settings = Fabrique.Settings;
    import Card = Fabrique.Card;

    export class Level extends Phaser.State {
        public static Name: string = "level";
        public name: string = Level.Name;

        private group: Phaser.Group;
        private playerAnimation: AnimationFighter;
        private opponentAnimation: AnimationFighter;
        private settings: Settings;
        private buttonExit: ButtonComix;
        private buttonSettings: ButtonComix;
        private shirt: Phaser.Sprite;
        private tween: Phaser.Tween;

        private playerDeck: Card[];
        private playerHand: Card[];
        private playerSlots: Card[];

        private opponentDeck: Card[];
        private opponentHand: Card[];
        private opponentSlots: Card[];

        constructor() {
            super();
        }

        public create(): void {
            this.group = new Phaser.Group(this.game, this.stage);

            GameData.Data.deckMix(GameData.Data.fighterIndex);
            
            this.createBackground();
            this.createFighters();
            this.createButtons();
            this.createHand();
            this.createDeck();
            this.createBorder();
        }

        public shutdown(): void {
            this.buttonExit.shutdown();
            this.buttonSettings.shutdown();
            this.group.removeAll();
            this.game.stage.removeChildren();
        }

        private createBackground(): void {
            let opponentID: number = GameData.Data.tournamentListIds[GameData.Data.progressIndex];
            let levelTexture: string = GameData.Data.personages[opponentID].level;
            let background: Phaser.Sprite = new Phaser.Sprite(this.game, 0, 0, levelTexture);
            this.group.addChild(background);
        }

        private createHand(): void {
            let background: Phaser.Sprite = new Phaser.Sprite(this.game, 0, 375, Images.HandBackground);
            this.group.addChild(background);
        }

        private createFighters(): void {
            let playerPersonage: GameData.IPersonage = GameData.Data.personages[GameData.Data.fighterIndex];
            this.playerAnimation = new AnimationFighter(this.game, playerPersonage.name, playerPersonage.animStance);
            this.playerAnimation.x = 280;
            this.playerAnimation.y = 185;
            this.group.addChild(this.playerAnimation);

            let opponentPersonage: GameData.IPersonage = GameData.Data.personages[GameData.Data.tournamentListIds[GameData.Data.progressIndex]];
            this.opponentAnimation = new AnimationFighter(this.game, opponentPersonage.name, opponentPersonage.animStance);
            this.opponentAnimation.x = 480;
            this.opponentAnimation.y = 185;
            this.opponentAnimation.anchor.setTo(.5, .5);
            this.opponentAnimation.scale.x *= -1;
            this.group.addChild(this.opponentAnimation);
        }

        private createButtons(): void {
            this.buttonExit = new ButtonComix(this.game, this.group, Constants.BUTTON_EXIT_BATTLE, 'ВЫЙТИ ИЗ БОЯ', 27, 20, 310);
            this.buttonExit.event.add(this.onButtonClick, this);

            this.buttonSettings = new ButtonComix(this.game, this.group, Constants.BUTTON_SETTINGS, 'НАСТРОЙКИ', 40, 600, 310);
            this.buttonSettings.event.add(this.onButtonClick, this);
        }

        private createBorder(): void {
            let border: Phaser.Sprite = new Phaser.Sprite(this.game, 0, 0, Images.BorderLevel);
            this.group.addChild(border);
        }

        private createDeck():void {
            // PLAYER
            this.playerDeck = [];
            let playerName: string = GameData.Data.personages[GameData.Data.fighterIndex].name;
            GameData.Data.personages[GameData.Data.fighterIndex].deck.forEach((cardData: GameData.ICard) => {
                this.playerDeck.push(new Card(this.game, this.group, playerName, cardData));
                this.playerDeck[this.playerDeck.length-1].x = 660;
                this.playerDeck[this.playerDeck.length-1].y = 390;
            });
            this.playerHand = [];
            this.playerSlots = [];
            
            this.shirt = new Phaser.Sprite(this.game, 660, 390, Atlases.Cards, "card_back.png");
            this.group.addChild(this.shirt);

            // OPPONENT
            this.opponentDeck = [];
            let opponentName: string = GameData.Data.personages[GameData.Data.tournamentListIds[GameData.Data.progressIndex]].name;
            GameData.Data.personages[GameData.Data.tournamentListIds[GameData.Data.progressIndex]].deck.forEach((cardData: GameData.ICard) => {
                this.opponentDeck.push(new Card(this.game, this.group, opponentName, cardData));
                this.opponentDeck[this.opponentDeck.length-1].x = 0;
                this.opponentDeck[this.opponentDeck.length-1].y = 0;
            });
            this.opponentHand = [];
            this.opponentSlots = [];

            this.moveCardDeckToHand();
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

        private moveCardDeckToHand():void {
            if(this.playerHand.length < 5){
                this.playerHand.push(this.playerDeck.shift());
                this.tween = this.game.add.tween(this.playerHand[this.playerHand.length-1]);
                this.tween.onComplete.add(this.moveCardDeckToHand, this);
                this.tween.to({x: 20 + (128 * (this.playerHand.length-1))}, 500, 'Linear');
                this.tween.start();
            }
        }

        
    }
}
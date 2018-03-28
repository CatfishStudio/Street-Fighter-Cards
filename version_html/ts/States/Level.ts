module StreetFighterCards {
    import AnimationFighter = Fabrique.AnimationFighter;
    import ButtonComix = Fabrique.ButtonComix;
    import Settings = Fabrique.Settings;
    import Card = Fabrique.Card;
    import FighterProgressBar = Fabrique.FighterProgressBar;
    import Slot = Fabrique.Slot;

    export class Level extends Phaser.State {
        public static Name: string = "level";
        public name: string = Level.Name;

        private tween: Phaser.Tween;
        private group: Phaser.Group;
        private boardGroup: Phaser.Group;
        private handGroup: Phaser.Group;
        private settings: Settings;
        private buttonExit: ButtonComix;
        private buttonSettings: ButtonComix;
        private shirt: Phaser.Sprite;

        // Player
        private playerAnimation: AnimationFighter;
        private playerProgressBar:FighterProgressBar;
        private playerLife:number;
        private playerEnergy:number;
        private playerDeck: Card[];
        private playerHand: Card[];
        private playerSlots: Card[];

        // Opponent
        private opponentAnimation: AnimationFighter;
        private opponentProgressBar:FighterProgressBar;
        private opponentLife:number;
        private opponentEnergy:number;
        private opponentDeck: Card[];
        private opponentHand: Card[];
        private opponentSlots: Card[];

        private handPoints: number[][] = [
            [20, 390], [148, 390], [276, 390], [404, 390], [532, 390]
        ];

        constructor() {
            super();
        }

        public create(): void {
            this.group = new Phaser.Group(this.game, this.stage);
            this.boardGroup = new Phaser.Group(this.game, this.stage);
            this.handGroup = new Phaser.Group(this.game, this.stage);

            this.playerLife = GameData.Data.personages[GameData.Data.fighterIndex].life;
            this.playerEnergy = 1;
            this.playerDeck = [];
            this.playerHand = [];
            this.playerSlots = [];

            this.opponentLife = GameData.Data.personages[GameData.Data.tournamentListIds[GameData.Data.progressIndex]].life;
            this.opponentEnergy = 1;
            this.opponentDeck = [];
            this.opponentHand = [];
            this.opponentSlots = [];

            GameData.Data.deckMix(GameData.Data.fighterIndex);
            GameData.Data.deckMix(GameData.Data.tournamentListIds[GameData.Data.progressIndex]);
            
            this.createBackground();
            this.createButtons();
            this.createBars();
            this.createFighters();
            this.createHand();
            this.createDeck();
            this.createBorder();
        }

        public shutdown(): void {
            this.buttonExit.shutdown();
            this.buttonSettings.shutdown();
            this.group.removeAll();
            this.playerDeck.forEach((card:Card)=>{
                card.shutdown();
            });
            this.playerHand.forEach((card:Card)=>{
                card.shutdown();
            });
            this.playerSlots.forEach((card:Card)=>{
                card.shutdown();
            });
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

        private createButtons(): void {
            this.buttonExit = new ButtonComix(this.game, this.group, Constants.BUTTON_EXIT_BATTLE, 'ВЫЙТИ ИЗ БОЯ', 27, 20, 310);
            this.buttonExit.event.add(this.onButtonClick, this);

            this.buttonSettings = new ButtonComix(this.game, this.group, Constants.BUTTON_SETTINGS, 'НАСТРОЙКИ', 40, 600, 310);
            this.buttonSettings.event.add(this.onButtonClick, this);
        }

        private createBars(): void {
            this.playerProgressBar = new FighterProgressBar(this.game, this.group, GameData.Data.fighterIndex, 25, 25, FighterProgressBar.LEFT);
            this.playerProgressBar.setEnergy(this.playerEnergy);
            this.playerProgressBar.setLife(this.playerLife);
            this.opponentProgressBar = new FighterProgressBar(this.game, this.group, GameData.Data.tournamentListIds[GameData.Data.progressIndex], 690, 25, FighterProgressBar.RIGHT);
            this.opponentProgressBar.setEnergy(this.opponentEnergy);
            this.opponentProgressBar.setLife(this.opponentLife);
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

        private createBorder(): void {
            let border: Phaser.Sprite = new Phaser.Sprite(this.game, 0, 0, Images.BorderLevel);
            this.group.addChild(border);
        }

        private createDeck():void {
            this.group.inputEnableChildren = true; // enable drag and drop

            // PLAYER
            let playerName: string = GameData.Data.personages[GameData.Data.fighterIndex].name;
            let card:Card;
            GameData.Data.personages[GameData.Data.fighterIndex].deck.forEach((cardData: GameData.ICard) => {
                card = new Card(this.game, 660, 390, playerName, cardData);
                card.events.onDragStart.add(this.onDragStart, this);
                card.events.onDragStop.add(this.onDragStop, this);
                this.playerDeck.push(card);
                this.group.addChild(card);
            });
            
            this.shirt = new Phaser.Sprite(this.game, 660, 390, Atlases.Cards, "card_back.png");
            this.group.addChild(this.shirt);

            // OPPONENT
            let opponentName: string = GameData.Data.personages[GameData.Data.tournamentListIds[GameData.Data.progressIndex]].name;
            GameData.Data.personages[GameData.Data.tournamentListIds[GameData.Data.progressIndex]].deck.forEach((cardData: GameData.ICard) => {
                card = new Card(this.game, 825, 0, opponentName, cardData);
                this.group.addChild(card);
            });
            
            this.moveCardDeckToHand();
        }

        private onDragStart(sprite: Phaser.Sprite, pointer:Phaser.Point, x:number, y:number):void {
            console.log("START: x=" + pointer.x + " y=" + pointer.y);
            this.handGroup.addChild(sprite);
            this.group.removeChild(sprite);
            (sprite as Card).reduce(true);
        }

        private onDragStop(sprite: Phaser.Sprite, pointer:Phaser.Point):void {
            console.log("STOP: x=" + pointer.x + " y=" + pointer.y);
            this.group.addChild(sprite);
            this.handGroup.removeChild(sprite);

            if(pointer.x === 800 && pointer.y === 600){ // Положить карту в слот
                (sprite as Card).dragAndDrop(false);

            }else{  // Вернуть карту в колоду
                (sprite as Card).reduce(false);
                this.returnCardToHand((sprite as Card));
            }
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

        private moveCardDeckToHand():void { // раздача карт из колоды
            if(this.playerHand.length < 5){
                this.playerHand.push(this.playerDeck.shift());
                
                this.playerHand[this.playerHand.length-1].dragAndDrop(true);
                this.playerHand[this.playerHand.length-1].indexInHand = this.playerHand.length-1;
                
                this.tween = this.game.add.tween(this.playerHand[this.playerHand.length-1]);
                this.tween.onComplete.add(this.moveCardDeckToHand, this);
                this.tween.to({x: this.handPoints[this.playerHand.length-1][0]}, 250, 'Linear');
                this.tween.start();
            }
        }

        private returnCardToHand(card: Card):void {   // Вернуть карту в руку
            this.tween = this.game.add.tween(card);
            this.tween.to({
                x: this.handPoints[card.indexInHand][0], 
                y:  this.handPoints[card.indexInHand][1]
            }, 250, 'Linear');
            this.tween.start();
        }
        
    }
}
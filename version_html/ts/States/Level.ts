module StreetFighterCards {
    import AnimationFighter = Fabrique.AnimationFighter;
    import ButtonComix = Fabrique.ButtonComix;
    import Settings = Fabrique.Settings;
    import Card = Fabrique.Card;
    import FighterProgressBar = Fabrique.FighterProgressBar;
    import Slot = Fabrique.Slot;
    import Timer = Fabrique.Timer;

    export interface IStatus {
        active: string;         // ход Игрока или Оппонента
        playerHit: boolean;     // true - значит Игрок закончил выкладывать каты
        opponentHit: boolean;   // true - значит Оппонент закончил выкладывать каты
    }

    export class Level extends Phaser.State {
        public static Name: string = "level";
        public name: string = Level.Name;

        private tween: Phaser.Tween;
        private group: Phaser.Group;
        private boardGroup: Phaser.Group;
        private handGroup: Phaser.Group;
        private shirt: Phaser.Sprite;

        private timer: Timer;
        private settings: Settings;
        private buttonExit: ButtonComix;
        private buttonSettings: ButtonComix;
        private slots: Slot[];

        private status: IStatus;
        private static ACTIVE_PLAYER = "active_player";
        private static ACTIVE_OPPONENT = "active_opponent";

        // Player
        private playerAnimation: AnimationFighter;
        private playerProgressBar: FighterProgressBar;
        private playerLife: number;
        private playerEnergy: number;
        private playerDeck: Card[];
        private playerHand: Card[];
        private playerSlots: Card[];

        // Opponent
        private opponentAnimation: AnimationFighter;
        private opponentProgressBar: FighterProgressBar;
        private opponentLife: number;
        private opponentEnergy: number;
        private opponentDeck: Card[];
        private opponentHand: Card[];
        private opponentSlots: Card[];

        private handPoints: number[][] = [
            [20, 390], [148, 390], [276, 390], [404, 390], [532, 390]
        ];

        private slotsPoints: number[][] = [
            [40, 100], [145, 100], [90, 205], [575, 100], [680, 100], [625, 205]
        ];

        constructor() {
            super();
        }

        public create(): void {
            this.group = new Phaser.Group(this.game, this.stage);
            this.boardGroup = new Phaser.Group(this.game, this.stage);
            this.handGroup = new Phaser.Group(this.game, this.stage);

            this.playerLife = GameData.Data.personages[GameData.Data.fighterIndex].life;
            this.playerEnergy = 5;
            this.playerDeck = [];
            this.playerHand = [];
            this.playerSlots = [null, null, null];

            this.opponentLife = GameData.Data.personages[GameData.Data.tournamentListIds[GameData.Data.progressIndex]].life;
            this.opponentEnergy = 5;
            this.opponentDeck = [];
            this.opponentHand = [];
            this.opponentSlots = [null, null, null];

            GameData.Data.deckMix(GameData.Data.fighterIndex);
            GameData.Data.deckMix(GameData.Data.tournamentListIds[GameData.Data.progressIndex]);

            this.status = <IStatus>{};
            this.status.active = Level.ACTIVE_PLAYER;
            this.status.playerHit = false;
            this.status.opponentHit = false;

            this.createBackground();
            this.createTimer();
            this.createSlots();
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
            this.boardGroup.removeAll();
            this.handGroup.removeAll();
            this.group.removeAll();
            this.slots.forEach((slot: Slot) => {
                if (slot !== null && slot !== undefined) slot.shutdown();
            });
            this.slots = null;
            this.playerDeck.forEach((card: Card) => {
                if (card !== null && card !== undefined) card.shutdown();
            });
            this.playerDeck = null;
            this.playerHand.forEach((card: Card) => {
                if (card !== null && card !== undefined) card.shutdown();
            });
            this.playerHand = null;
            this.playerSlots.forEach((card: Card) => {
                if (card !== null && card !== undefined) card.shutdown();
            });
            this.playerSlots = null;
            this.timer.shutdown();
            this.game.stage.removeChildren();
        }

        private createBackground(): void {
            let opponentID: number = GameData.Data.tournamentListIds[GameData.Data.progressIndex];
            let levelTexture: string = GameData.Data.personages[opponentID].level;
            let background: Phaser.Sprite = new Phaser.Sprite(this.game, 0, 0, levelTexture);
            this.group.addChild(background);
        }

        private createTimer(): void {
            this.timer = new Timer(this.game, 360, 25);
            this.timer.event.add(this.onTimerEnd, this);
            this.group.addChild(this.timer);
            this.timer.setMessage("Ваш ход");
            this.timer.runTimer();
        }

        private createSlots(): void {
            this.slots = [];
            let i: number = 0;
            for (let value of this.slotsPoints) {
                if (i < 3) this.slots.push(new Slot(this.game, value[0], value[1], true, i + 1));
                else this.slots.push(new Slot(this.game, value[0], value[1], false, i - 2));
                this.group.addChild(this.slots[this.slots.length - 1]);
                i++;
            }
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
            this.playerAnimation.x = 250;
            this.playerAnimation.y = (370 - 50) - this.playerAnimation.height;
            this.group.addChild(this.playerAnimation);

            let opponentPersonage: GameData.IPersonage = GameData.Data.personages[GameData.Data.tournamentListIds[GameData.Data.progressIndex]];
            this.opponentAnimation = new AnimationFighter(this.game, opponentPersonage.name, opponentPersonage.animStance);
            this.opponentAnimation.x = (800 - 225) - (this.opponentAnimation.width / 2);
            this.opponentAnimation.y = (370 - 50) - this.opponentAnimation.height;
            this.opponentAnimation.anchor.setTo(.0, .0);
            this.opponentAnimation.scale.x *= -1;
            this.group.addChild(this.opponentAnimation);
        }

        private createBorder(): void {
            let border: Phaser.Sprite = new Phaser.Sprite(this.game, 0, 0, Images.BorderLevel);
            this.group.addChild(border);
        }

        private createDeck(): void {
            this.group.inputEnableChildren = true; // enable drag and drop

            // PLAYER
            let playerName: string = GameData.Data.personages[GameData.Data.fighterIndex].name;
            let card: Card;
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

        // Взять карту
        private onDragStart(sprite: Phaser.Sprite, pointer: Phaser.Point, x: number, y: number): void {
            Utilits.Data.debugLog("START: x=" + pointer.x + " y=" + pointer.y);
            this.handGroup.addChild(sprite);
            this.group.removeChild(sprite);
            (sprite as Card).reduce(true);
        }

        // Положить карту
        private onDragStop(sprite: Phaser.Sprite, pointer: Phaser.Point): void {
            Utilits.Data.debugLog("STOP: x=" + pointer.x + " y=" + pointer.y);

            let pushInSlot: boolean = false;
            
            if ((sprite as Card).cardData.energy <= this.playerEnergy) {
                for (let index in this.slotsPoints) {
                    if (index === '3') break;   // доступны только слоты игрока

                    // проверяем координаты
                    if ((pointer.x >= this.slotsPoints[index][0] && pointer.x <= this.slotsPoints[index][0] + 84)
                        && (pointer.y >= this.slotsPoints[index][1] && pointer.y <= this.slotsPoints[index][1] + 84)) {

                        if (this.playerSlots[index] === null) { // слот доступен
                            pushInSlot = true;
                            // уменьшение энергии
                            this.playerEnergy -= (sprite as Card).cardData.energy;
                            this.playerProgressBar.setEnergy(this.playerEnergy);
                            // помещаем карту в слот
                            (sprite as Card).x = this.slotsPoints[index][0] + 1;
                            (sprite as Card).y = this.slotsPoints[index][1] + 1;
                            (sprite as Card).scale.set(0.65, 0.65);
                            (sprite as Card).dragAndDrop(false);
                            // меняем группу
                            this.boardGroup.addChild(sprite);
                            this.handGroup.removeChild(sprite);
                            // меняем стэк
                            this.playerSlots[index] = this.playerHand.splice((sprite as Card).indexInHand, 1)[0];
                            // передвигаем карты в руке
                            this.moveHandCardToEmpty();

                            Utilits.Data.debugLog([this.playerSlots, this.playerHand]);
                        }
                        break;
                    }
                }
            }

            if (pushInSlot === false) {     // карта возвращается в руку
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

        private moveCardDeckToHand(): void { // раздача карт из колоды
            if (this.playerHand.length < 5) {
                this.playerHand.push(this.playerDeck.shift());

                this.playerHand[this.playerHand.length - 1].dragAndDrop(true);
                this.playerHand[this.playerHand.length - 1].indexInHand = this.playerHand.length - 1;

                this.tween = this.game.add.tween(this.playerHand[this.playerHand.length - 1]);
                this.tween.onComplete.add(this.moveCardDeckToHand, this);
                this.tween.to({ x: this.handPoints[this.playerHand.length - 1][0] }, 250, 'Linear');
                this.tween.start();
            }
        }

        private moveHandCardToEmpty(): void {    // Смещение карт в руке на пустые места
            if (this.playerHand.length < 5) {
                let tweenMoveToEmpty: Phaser.Tween;
                for (let i: number = 0; i < this.playerHand.length; i++) {
                    this.playerHand[i].indexInHand = i;
                    tweenMoveToEmpty = this.game.add.tween(this.playerHand[i]);
                    tweenMoveToEmpty.to({ x: this.handPoints[i][0] }, 250, 'Linear');
                    tweenMoveToEmpty.start();
                }
            }
        }

        private returnCardToHand(card: Card): void {   // Вернуть карту в руку
            this.tween = this.game.add.tween(card);
            this.tween.to({
                x: this.handPoints[card.indexInHand][0],
                y: this.handPoints[card.indexInHand][1]
            }, 250, 'Linear');
            this.tween.onComplete.add(this.onCardBackToHand, this);
            this.tween.start();
        }

        private onCardBackToHand(card: Card): void {
            this.group.addChild(card);
            this.handGroup.removeChild(card);
        }

        private cardsDragAndDrop(value: boolean): void { // блокировать или разблокировать все карты в руке
            this.playerHand.forEach((card: Card) => {
                card.dragAndDrop(value);
                if(value === false){
                    card.reduce(false);
                    this.returnCardToHand(card);
                }
            })
        }

        // ТАЙМЕР
        private onTimerEnd(event): void {
            if (event === Constants.TIMER_END) {

                if (this.status.active === Level.ACTIVE_PLAYER && this.status.playerHit === false) {
                    /**
                     * Ход игрока.
                     * Время выкладывать карты игрока вышло. 
                     * Очередь выкладывать карты переходит к оппоненту
                     */
                    this.status.playerHit = true;
                    this.status.opponentHit = false;
                    this.cardsDragAndDrop(false);
                    this.timer.setMessage("Ход противника");
                } else if (this.status.active === Level.ACTIVE_PLAYER && this.status.playerHit === true) {
                    /**
                     * Ход игрока. 
                     * Время выкладывать карты оппонента вышло.
                     * Выполняются УДАРЫ выложенными картами.
                     * Ход передается оппоненту
                     */


                    this.status.active = Level.ACTIVE_OPPONENT;
                    this.status.playerHit = false;
                    this.status.opponentHit = false;
                    this.cardsDragAndDrop(false);
                    this.timer.setMessage("Ход противника");
                } else if (this.status.active === Level.ACTIVE_OPPONENT && this.status.opponentHit === false) {
                    /**
                     * Ход оппонента.
                     * Время выкладывать карты оппонента вышло. 
                     * Очередь выкладывать карты переходит к игроку
                     */
                    this.status.playerHit = false;
                    this.status.opponentHit = true;
                    this.cardsDragAndDrop(true);
                    this.timer.setMessage("Ваш ход");
                } else if (this.status.active === Level.ACTIVE_OPPONENT && this.status.opponentHit === true) {
                    /**
                     * Ход оппонента. 
                     * Время выкладывать карты игрока вышло.
                     * Выполняются УДАРЫ выложенными картами.
                     * Ход передается игроку
                     */


                    this.status.active = Level.ACTIVE_PLAYER;
                    this.status.playerHit = false;
                    this.status.opponentHit = false;
                    this.cardsDragAndDrop(true);
                    this.timer.setMessage("Ваш ход");
                }

                Utilits.Data.debugLog(this.status);
            }
        }


    }
}
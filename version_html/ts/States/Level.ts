module StreetFighterCards {
    import AnimationFlash = Fabrique.AnimationFlash;
    import AnimationKO = Fabrique.AnimationKO;
    import AnimationFight = Fabrique.AnimationFight;
    import AnimationFighter = Fabrique.AnimationFighter;
    import ButtonComix = Fabrique.ButtonComix;
    import ButtonTablo = Fabrique.ButtonTablo;
    import Settings = Fabrique.Settings;
    import Card = Fabrique.Card;
    import FighterProgressBar = Fabrique.FighterProgressBar;
    import Slot = Fabrique.Slot;
    import Timer = Fabrique.Timer;
    import Ai = AI.Ai;

    export interface IStatus {
        active: string;         // ход Игрока или Оппонента
        playerHit: boolean;     // true - значит Игрок закончил выкладывать карты
        opponentHit: boolean;   // true - значит Оппонент закончил выкладывать карты
    }

    export class Level extends Phaser.State {
        public static Name: string = "level";
        public name: string = Level.Name;

        private battleEnd: boolean;

        private tween: Phaser.Tween;
        private group: Phaser.Group;
        private boardGroup: Phaser.Group;
        private handGroup: Phaser.Group;
        private borderGroup: Phaser.Group;
        private shirt: Phaser.Sprite;

        private timer: Timer;
        private buttonTablo: ButtonTablo;
        private settings: Settings;
        private buttonExit: ButtonComix;
        private buttonSettings: ButtonComix;
        private slots: Slot[];

        private status: IStatus;
        private energyCount: number;

        // Player
        private playerFlash: AnimationFlash[];
        private playerAnimation: AnimationFighter;
        private playerProgressBar: FighterProgressBar;
        private playerLife: number;
        private playerEnergy: number;
        private playerDeck: Card[];
        private playerHand: Card[];
        private playerSlots: Card[];

        // Opponent
        private opponentAi: Ai;
        private opponentFlash: AnimationFlash[];
        private opponentAnimation: AnimationFighter;
        private opponentProgressBar: FighterProgressBar;
        private opponentLife: number;
        private opponentEnergy: number;
        private opponentDeck: Card[];
        private opponentHand: Card[];
        private opponentSlots: Card[];
        private opponentDataAI: AI.IDataPlayers;
        private opponentHitsAI: number[];

        // Positions
        private handPoints: number[][] = [
            [20, 390], [148, 390], [276, 390], [404, 390], [532, 390]
        ];
        private slotsPoints: number[][] = [
            [40, 100], [145, 100], [90, 205], [575, 100], [680, 100], [625, 205]
        ];

        // Process animation
        private totalHits: number;
        private steepHits: number;
        private targetDamage: string;

        constructor() {
            super();
        }

        public create(): void {
            this.battleEnd = false;

            this.group = new Phaser.Group(this.game, this.stage);
            this.boardGroup = new Phaser.Group(this.game, this.stage);
            this.borderGroup = new Phaser.Group(this.game, this.stage);
            this.handGroup = new Phaser.Group(this.game, this.stage);

            this.opponentAi = new Ai();

            this.energyCount = 5;

            this.playerLife = GameData.Data.personages[GameData.Data.fighterIndex].life;
            this.playerEnergy = this.energyCount;
            this.playerDeck = [];
            this.playerHand = [];
            this.playerSlots = [null, null, null];

            this.opponentLife = GameData.Data.personages[GameData.Data.tournamentListIds[GameData.Data.progressIndex]].life;
            this.opponentEnergy = this.energyCount;
            this.opponentDeck = [];
            this.opponentHand = [];
            this.opponentSlots = [null, null, null];

            GameData.Data.deckMix(GameData.Data.fighterIndex);
            GameData.Data.deckMix(GameData.Data.tournamentListIds[GameData.Data.progressIndex]);

            this.status = <IStatus>{};
            this.status.active = Constants.ACTIVE_PLAYER;
            this.status.playerHit = false;
            this.status.opponentHit = false;

            this.totalHits = 0;
            this.steepHits = 0;
            this.targetDamage = null;

            this.createBackground();
            this.createTimer();
            this.createSlots();
            this.createButtons();
            this.createBars();
            this.createFighters();
            this.createHand();
            this.createDeck();
            this.createFlases();
            this.createBorder();
        }

        public shutdown(): void {
            this.opponentAi = null;
            this.timer.shutdown();
            // groups clear
            this.boardGroup.removeAll();
            this.handGroup.removeAll();
            this.borderGroup.removeAll();
            this.group.removeAll();
            // buttons clear
            this.buttonExit.shutdown();
            this.buttonSettings.shutdown();
            this.buttonTablo.shutdown();
            // slots clear
            this.slots.forEach((slot: Slot) => {
                if (slot !== null && slot !== undefined) slot.shutdown();
            });
            this.slots = null;
            // player clear
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
            this.playerFlash.forEach((flash:AnimationFlash) => {
                flash.removeChildren();
            });
            this.playerFlash = null;
            // opponent clear
            this.opponentDeck.forEach((card: Card) => {
                if (card !== null && card !== undefined) card.shutdown();
            });
            this.opponentDeck = null;
            this.opponentHand.forEach((card: Card) => {
                if (card !== null && card !== undefined) card.shutdown();
            });
            this.opponentHand = null;
            this.opponentSlots.forEach((card: Card) => {
                if (card !== null && card !== undefined) card.shutdown();
            });
            this.opponentSlots = null;
            this.opponentFlash.forEach((flash:AnimationFlash) => {
                flash.removeChildren();
            });
            this.opponentFlash = null;
            // stage clear
            this.game.stage.removeChildren();
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
                        //this.game.state.start(Menu.Name, true, false);
                        this.game.state.start(Tournament.Name, true, false);
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
                case Constants.BUTTON_TABLO:
                    {
                        this.timer.resetTimer();
                        this.endTurn();
                        break;
                    }
                default:
                    break;
            }
        }

        private createBackground(): void {
            let opponentID: number = GameData.Data.tournamentListIds[GameData.Data.progressIndex];
            let levelTexture: string = GameData.Data.personages[opponentID].level;
            let background: Phaser.Sprite = new Phaser.Sprite(this.game, 0, 0, levelTexture);
            this.group.addChild(background);
        }

        private createTimer(): void {
            this.timer = new Timer(this.game, 340, 12);
            this.timer.event.add(this.onTimerEnd, this);
            this.group.addChild(this.timer);
            this.timer.setMessage("Ваш ход");
            this.timer.runTimer();

            this.buttonTablo = new ButtonTablo(this.game, this.group, Constants.BUTTON_TABLO, "Ход", 40, 353, 80);
            this.buttonTablo.event.add(this.onButtonClick, this);
        }

        private onTimerEnd(event): void {
            if (event === Constants.TIMER_END) {
                this.endTurn();
            }
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
            this.playerAnimation = new AnimationFighter(this.game, Constants.ACTIVE_PLAYER, playerPersonage.name, playerPersonage);
            this.playerAnimation.x = 250;
            this.playerAnimation.y = (370 - 50) - this.playerAnimation.height;
            this.playerAnimation.event.add(this.onAnimationComplete, this);
            this.group.addChild(this.playerAnimation);

            let opponentPersonage: GameData.IPersonage = GameData.Data.personages[GameData.Data.tournamentListIds[GameData.Data.progressIndex]];
            this.opponentAnimation = new AnimationFighter(this.game, Constants.ACTIVE_OPPONENT, opponentPersonage.name, opponentPersonage);
            this.opponentAnimation.x = (800 - 225) - (this.opponentAnimation.width / 2);
            this.opponentAnimation.y = (370 - 50) - this.opponentAnimation.height;
            this.opponentAnimation.anchor.setTo(.0, .0);
            this.opponentAnimation.scale.x *= -1;
            this.opponentAnimation.event.add(this.onAnimationComplete, this);
            this.group.addChild(this.opponentAnimation);
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
            this.boardGroup.addChild(this.shirt);

            this.moveCardDeckToHandPlayer();

            // OPPONENT
            let opponentName: string = GameData.Data.personages[GameData.Data.tournamentListIds[GameData.Data.progressIndex]].name;
            GameData.Data.personages[GameData.Data.tournamentListIds[GameData.Data.progressIndex]].deck.forEach((cardData: GameData.ICard) => {
                card = new Card(this.game, 800, 100, opponentName, cardData);
                card.dragAndDrop(false);
                this.opponentDeck.push(card);
                this.group.addChild(card);
            });

            this.moveCardDeckToHandOpponent();
        }

        private createFlases():void {
            this.playerFlash = [];
            this.opponentFlash = [];
            let flash:AnimationFlash;
            for(let i:number = 0; i < this.slotsPoints.length; i++){
                if(i < 3){
                    flash = new AnimationFlash(this.game, this.slotsPoints[i][0]-330, this.slotsPoints[i][1]-240);
                    this.playerFlash.push(flash);
                    this.borderGroup.add(this.playerFlash[this.playerFlash.length-1]);
                }else{
                    flash = new AnimationFlash(this.game, this.slotsPoints[i][0]-330, this.slotsPoints[i][1]-240);
                    this.opponentFlash.push(flash);
                    this.borderGroup.add(this.opponentFlash[this.opponentFlash.length-1]);
                }
            }
        }

        private createBorder(): void {
            let border: Phaser.Sprite = new Phaser.Sprite(this.game, 0, 0, Images.BorderLevel);
            this.borderGroup.addChild(border);

            let fight:AnimationFight = new AnimationFight(this.game, 200, 150);
            this.borderGroup.addChild(fight);
        }
        // ДЕЙСТВИЕ: Взять карту
        private onDragStart(sprite: Phaser.Sprite, pointer: Phaser.Point, x: number, y: number): void {
            Utilits.Data.debugLog("START: x=", pointer.x + " y= " + pointer.y);
            this.handGroup.addChild(sprite);
            this.group.removeChild(sprite);
            (sprite as Card).reduce(true);
        }

        // ДЕЙСТВИЕ: Положить карту
        private onDragStop(sprite: Phaser.Sprite, pointer: Phaser.Point): void {
            Utilits.Data.debugLog("STOP: x=", pointer.x + " y= " + pointer.y);

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
                            this.moveHandCardToEmptyPlayer();

                            Utilits.Data.debugLog("Slots/Hand:", [this.playerSlots, this.playerHand]);
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

        // АНИМАЦИЯ - Игрока
        private moveCardDeckToHandPlayer(): void { // Раздача карт из колоды игрок
            if (this.playerHand.length < 5) {
                this.playerHand.push(this.playerDeck.shift());

                if (this.status.active === Constants.ACTIVE_PLAYER) {
                    if (this.status.playerHit === false) {
                        this.playerHand[this.playerHand.length - 1].dragAndDrop(true); // разрешаем игроку перетаскивание карт
                    } else {
                        this.playerHand[this.playerHand.length - 1].dragAndDrop(false);  // запрещаем перетаскивание карт
                    }
                } else if (this.status.active === Constants.ACTIVE_OPPONENT) {
                    if (this.status.opponentHit === true && this.status.playerHit === false) {
                        this.playerHand[this.playerHand.length - 1].dragAndDrop(true); // разрешаем игроку перетаскивание карт
                    } else {
                        this.playerHand[this.playerHand.length - 1].dragAndDrop(false);  // запрещаем перетаскивание карт
                    }
                }

                this.playerHand[this.playerHand.length - 1].indexInHand = this.playerHand.length - 1;

                this.tween = this.game.add.tween(this.playerHand[this.playerHand.length - 1]);
                this.tween.onComplete.add(this.moveCardDeckToHandPlayer, this);
                this.tween.to({ x: this.handPoints[this.playerHand.length - 1][0] }, 250, 'Linear');
                this.tween.start();
            }
            Utilits.Data.debugLog("Player Hand:", this.playerHand);
        }

        private moveHandCardToEmptyPlayer(): void {    // Смещение карт в руке на пустые места
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

        private moveHandCardToEmptyOpponent(): void {
            if (this.opponentHand.length < 5) {
                for (let i: number = 0; i < this.opponentHand.length; i++) {
                    this.opponentHand[i].indexInHand = i;
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

        // блокировать или разблокировать все карты в руке
        private cardsDragAndDrop(value: boolean): void {
            this.playerHand.forEach((card: Card) => {
                card.dragAndDrop(value);
                if (value === false) {
                    card.reduce(false);
                    this.returnCardToHand(card);
                }
            })
        }

        // АНИМАЦИЯ - AI
        private moveCardDeckToHandOpponent(): void {    // Раздача карт из колоды AI
            while (this.opponentHand.length < 5) {
                this.opponentHand.push(this.opponentDeck.shift());
                this.opponentHand[this.opponentHand.length - 1].indexInHand = this.opponentHand.length - 1;
            }
            Utilits.Data.debugLog("Opponent Hand:", this.opponentHand);
        }

        private moveCardHandToBoardOpponent(): void {   // AI кладет карты в слоты
            this.opponentDataAI = <AI.IDataPlayers>{};
            this.opponentDataAI.aiEnergy = this.opponentEnergy;
            this.opponentDataAI.aiHand = this.opponentHand;
            this.opponentDataAI.aiLife = this.opponentLife;
            this.opponentDataAI.playerEnergy = this.playerEnergy;
            this.opponentDataAI.playerLife = this.playerLife;
            this.opponentDataAI.playerSlots = this.playerSlots;
            this.opponentAi.setData(this.opponentDataAI);
            this.opponentHitsAI = this.opponentAi.getHits(this.status.active);

            if (this.opponentHitsAI.length > 0) {
                let tweenMoveToSlot: Phaser.Tween;
                let tweenScale: Phaser.Tween;
                let card: Card;
                let indexInHand: number;

                for (let i: number = 0; i < this.opponentHitsAI.length; i++) {
                    indexInHand = this.opponentHitsAI[i];
                    if (indexInHand === undefined || indexInHand === null) continue;
                    card = this.opponentHand[indexInHand];

                    // уменьшение энергии
                    this.opponentEnergy -= card.cardData.energy;
                    this.opponentProgressBar.setEnergy(this.opponentEnergy);
                    // меняем группу
                    this.boardGroup.addChild(card);
                    this.group.removeChild(card);
                    // меняем стэк
                    this.opponentSlots[i] = card;
                    this.opponentHand[card.indexInHand] = null;

                    // анимация: помещаем карту в слот
                    card.reduce(true);
                    tweenMoveToSlot = this.game.add.tween(card);
                    tweenMoveToSlot.to({ x: this.slotsPoints[i + 3][0] + 1, y: this.slotsPoints[i + 3][1] + 1 }, 250, 'Linear');
                    tweenMoveToSlot.start();
                    tweenScale = this.game.add.tween(card.scale);
                    tweenScale.to({ x: 0.65, y: 0.65 }, 250, 'Linear');
                    tweenScale.start();
                }

                // коррекция данных в руке (передвигаем карты в руке)
                let indexCorrect = 0;
                for (let i: number = 0; i < this.opponentHand.length; i++) {
                    if (this.opponentHand[i] === null) {
                        this.opponentHand.splice(i, 1);
                        i--;
                    } else {
                        this.opponentHand[i].indexInHand = indexCorrect;
                        indexCorrect++;
                    }
                }

                setTimeout(this.endTurn.bind(this), 3000);
                Utilits.Data.debugLog("AI: Slots/Hand:", [this.opponentSlots, this.opponentHand]);
            }
        }

        // ХОД
        private endTurn(): void {
            if (this.status.active === Constants.ACTIVE_PLAYER && this.status.playerHit === false) {
                /**
                 * Ход игрока.
                 * Время выкладывать карты игрока вышло. 
                 * Очередь выкладывать карты переходит к оппоненту
                 */
                this.cardsDragAndDrop(false);           // запрещаем перетаскивание карт
                this.status.active = Constants.ACTIVE_PLAYER;
                setTimeout(function(){ this.buttonTablo.visible = false; }.bind(this), 100); // скрываем кнопку Ход
                this.status.playerHit = true;           // Игрок закончил выкладывать карты
                this.status.opponentHit = false;        // ИИ получает очередь выкладывать карты
                this.timer.setMessage("Ход противника");
                this.moveCardHandToBoardOpponent();     // ИИ выкладывания карт
            } else if (this.status.active === Constants.ACTIVE_PLAYER && this.status.playerHit === true) {
                /**
                 * Ход игрока. 
                 * Время выкладывать карты оппонента вышло.
                 * Выполняются УДАРЫ выложенными картами.
                 * Ход передается оппоненту
                 */
                this.cardsDragAndDrop(false);                   // запрещаем перетаскивание карт
                this.timer.setMessage("Ход противника");
                this.timer.stopTimer();
                setTimeout(function(){ this.buttonTablo.visible = false; }.bind(this), 100); // скрываем кнопку Ход
                Utilits.Data.debugLog("[HIT PLAYER]", "Execute HITS");
                this.implementHits();
            } else if (this.status.active === Constants.ACTIVE_OPPONENT && this.status.opponentHit === false) {
                /**
                 * Ход оппонента.
                 * Время выкладывать карты оппонента вышло. 
                 * Очередь выкладывать карты переходит к игроку
                 */
                this.cardsDragAndDrop(true);                    // разрешаем перетаскивание карт
                this.status.active = Constants.ACTIVE_OPPONENT; // первым ходит ИИ
                this.buttonTablo.visible = true;                // показываем кнопку Ход
                this.status.playerHit = false;                  // Игрок получает очередь выкладывать карты
                this.status.opponentHit = true;                 // ИИ закончил выкладывать карты
                this.timer.setMessage("Ваш ход");
            } else if (this.status.active === Constants.ACTIVE_OPPONENT && this.status.opponentHit === true) {
                /**
                 * Ход оппонента. 
                 * Время выкладывать карты игрока вышло.
                 * Выполняются УДАРЫ выложенными картами.
                 * Ход передается игроку
                 */
                this.cardsDragAndDrop(false);                   // запрещаем перетаскивание карт
                this.timer.setMessage("Ваш ход");
                this.timer.stopTimer();                         // останачливаем таймер
                setTimeout(function(){ this.buttonTablo.visible = false; }.bind(this), 100); // скрываем кнопку Ход
                Utilits.Data.debugLog("[HIT OPPONENT]", "Execute HITS");
                this.implementHits();
            }

            Utilits.Data.debugLog("Status", this.status);
        }

        // ВЫПОЛНЕНИЕ УДАРОВ
        private implementHits() {
            Utilits.Data.debugLog("IMPLEMENTATION: cards [slot/steep]:", [this.totalHits, this.steepHits]);

            this.targetDamage = null;
            if (this.totalHits > 2) { // выполнение всех карт в слотах завершено
                this.totalHits = 0;
                this.steepHits = 0;
                this.targetDamage = null;
                this.playerAnimation.stanceAnimation();
                this.opponentAnimation.stanceAnimation();

                this.moveCardDeckToHandPlayer();
                this.moveCardDeckToHandOpponent();

                if (this.status.active === Constants.ACTIVE_PLAYER && this.status.playerHit === true) {
                    this.status.active = Constants.ACTIVE_OPPONENT; // первым ходит ИИ
                    this.buttonTablo.visible = false;               // скрываем кнопку Ход
                    this.status.playerHit = false;                  // Игрок ожидает своей очереди выкладывать карты
                    this.status.opponentHit = false;                // ИИ получает очередь выкладывать карты
                    this.cardsDragAndDrop(false);                   // запрещаем перетаскивание карт
                    this.timer.setMessage("Ход противника");
                    setTimeout(this.moveCardHandToBoardOpponent.bind(this), 3000);     // ИИ выкладывания карт
                } else if (this.status.active === Constants.ACTIVE_OPPONENT && this.status.opponentHit === true) {
                    this.status.active = Constants.ACTIVE_PLAYER;   // первым ходит Игрок
                    this.buttonTablo.visible = true;                // показываем кнопку Ход
                    this.status.playerHit = false;                  // Игрок получает очередь выкладывать карты
                    this.status.opponentHit = false;                // ИИ ожидает своей очереди выкладывать карты
                    this.cardsDragAndDrop(true);                    // разрешаем игроку перетаскивание карт
                    this.timer.setMessage("Ваш ход");
                }

                this.energyRecovery();
                this.timer.runTimer();

                return;
            }

            // Получаем карты из слотов
            let playerCard: Card = this.playerSlots[this.totalHits] === undefined ? null : this.playerSlots[this.totalHits];
            let opponentCard: Card = this.opponentSlots[this.totalHits] === undefined ? null : this.opponentSlots[this.totalHits];

            // Возвращаем отработанные карты в колоду
            this.playerSlots[this.totalHits] = null;
            this.opponentSlots[this.totalHits] = null;
            if (playerCard !== null) {
                this.playerFlash[this.totalHits].playAnimation();
                playerCard.x = 660;
                playerCard.y = 390;
                playerCard.scale.set(1.0, 1.0);
                playerCard.reduce(false);
                playerCard.dragAndDrop(false);
                this.playerDeck.push(playerCard);
                this.group.addChild(playerCard);
                this.boardGroup.removeChild(playerCard);
            }
            if (opponentCard !== null) {
                this.opponentFlash[this.totalHits].playAnimation();
                opponentCard.x = 800;
                opponentCard.y = 100;
                opponentCard.scale.set(1.0, 1.0);
                opponentCard.reduce(false);
                opponentCard.dragAndDrop(false);
                this.opponentDeck.push(opponentCard);
                this.group.addChild(opponentCard);
                this.boardGroup.removeChild(opponentCard);
            }

            // выполняем анимацию карт
            this.animationHits(playerCard, opponentCard);
        }

        private animationHits(playerCard: Card, opponentCard: Card): void {
            // #1: оба слота пустые
            if (playerCard === null && opponentCard === null) {
                this.totalHits++;
                this.steepHits = 0;
                this.targetDamage = null;
                this.playerAnimation.stanceAnimation();
                this.opponentAnimation.stanceAnimation();
                this.implementHits();
            } else {

                // #2: слот оппонента пустой, слот игрока не пустой
                if (opponentCard === null && playerCard !== null) {
                    if (playerCard.cardData.type === Constants.CARD_TYPE_ATTACK) { // карта игрока атакующая
                        this.targetDamage = Constants.OPPONENT; // оппонент получает удары
                        this.damageCalculation(Constants.OPPONENT, playerCard, opponentCard);
                    } else { // игрок в блоке
                        this.steepHits++; // оппонент ничего не делает
                    }
                    this.playerAnimation.hitAnimation(playerCard.cardData);
                } else {

                    // #3: слот игрока пустой, стол оппонента не пустой
                    if (playerCard === null && opponentCard !== null) {
                        if (opponentCard.cardData.type === Constants.CARD_TYPE_ATTACK) { // оппонент наносит удар
                            this.targetDamage = Constants.PLAYER; // игрок получает удары
                            this.damageCalculation(Constants.PLAYER, opponentCard, playerCard);
                        } else { // оппонент в блоке
                            this.steepHits++; // игрок ничего не делает
                        }
                        this.opponentAnimation.hitAnimation(opponentCard.cardData); // оппонент выполняет атаку
                    } else {

                        // #4: оба слота не пустые
                        if (playerCard !== null && opponentCard !== null) {
                            // атака (игрок) - атака (оппонент)
                            if (playerCard.cardData.type === Constants.CARD_TYPE_ATTACK
                                && opponentCard.cardData.type === Constants.CARD_TYPE_ATTACK) {

                                this.steepHits = -1;
                                this.targetDamage = Constants.PLAYER_AND_OPPONENT; // игрок и оппонент получат удары
                                this.playerAnimation.hitAnimation(playerCard.cardData);         // выполняется карта игрока
                                this.opponentAnimation.hitAnimation(opponentCard.cardData);     // выполняется карта оппонента
                            } else {
                                // блок (игрок) - блок (оппонент)
                                // атака (игрок) - блок (оппонент)
                                // блок (игрок) - атака (оппонент)
                                this.playerAnimation.hitAnimation(playerCard.cardData);         // выполняется карта игрока
                                this.opponentAnimation.hitAnimation(opponentCard.cardData);     // выполняется карта оппонента
                            }
                            this.damageCalculation(Constants.PLAYER, opponentCard, playerCard);
                            this.damageCalculation(Constants.OPPONENT, playerCard, opponentCard);
                        }
                    }
                }
            }
        }

        // АНИМАЦИЯ УДАРОВ/БЛОКОВ/ПОВРЕЖДЕНИЙ - ВЫПОЛНЕНА
        private onAnimationComplete(target, hit): void {
            Utilits.Data.debugLog('ANIMATION steep complete [target/type]:', [target, hit]);

            if (target === Constants.ANIMATION_PLAYER_COMPLETE) {
                this.steepHits++;
                if(hit === Constants.ANIMATION_TYPE_DAMAGE && this.battleEnd === false) this.playerAnimation.stanceAnimation();
            } else if (target === Constants.ANIMATION_OPPONENT_COMPLETE) {
                this.steepHits++;
                if(hit === Constants.ANIMATION_TYPE_DAMAGE && this.battleEnd === false) this.opponentAnimation.stanceAnimation();
            }

            if (this.targetDamage === Constants.PLAYER) {
                this.targetDamage = null;
                this.playerAnimation.damageAnimation();
            } else if (this.targetDamage === Constants.OPPONENT) {
                this.targetDamage = null;
                this.opponentAnimation.damageAnimation();
            } else if (this.targetDamage === Constants.PLAYER_AND_OPPONENT) {
                this.targetDamage = null;
                this.playerAnimation.damageAnimation();
                this.opponentAnimation.damageAnimation();
            }

            Utilits.Data.debugLog('ANIMATION steep hits:', this.steepHits);
            if (this.steepHits >= 2) {
                if (this.battleEnd === false) {   // битва еще не завершена
                    this.steepHits = 0;
                    this.totalHits++;
                    this.targetDamage = null;
                    this.playerAnimation.stanceAnimation();
                    this.opponentAnimation.stanceAnimation();
                    this.implementHits();
                } else {  // битва завершена (последняя анимация победа/поражение)
                    
                    if(this.steepHits <= 2){
                        this.timer.stopTimer();
                        this.timer.setMessage("Конец боя");
                        if(this.playerLife > 0 && this.opponentLife <= 0){ // победа игрока
                            this.playerAnimation.winAnimation();
                            this.opponentAnimation.loseAnimation();
                        }else{  // игрок проиграл
                            this.playerAnimation.loseAnimation();
                            this.opponentAnimation.winAnimation();
                        }
                    }
                    if(this.steepHits >= 4){
                        this.endBattle();
                    }
                }
            }
        }

        // Начисление урона
        private damageCalculation(target: string, cardAttack: Card, cardBlock: Card): void {
            let attack: number = 0;
            let block: number = 0;
            let totalDamage: number = 0;

            if (cardAttack === null) {
                attack = 0;
            } else if (cardAttack.cardData.type === Constants.CARD_TYPE_DEFENSE) {
                attack = 0;
            } else if (cardAttack.cardData.type === Constants.CARD_TYPE_ATTACK) {
                attack = cardAttack.cardData.power;
            }

            if (cardBlock === null) {
                block = 0;
            } else if (cardBlock.cardData.type === Constants.CARD_TYPE_ATTACK) {
                block = 0;
            } else if (cardBlock.cardData.type === Constants.CARD_TYPE_DEFENSE) {
                block = cardBlock.cardData.power;
            }

            // Игроку начисляется урон
            if (target === Constants.PLAYER) {
                totalDamage = (attack - block) > 0 ? (attack - block) : 0;
                this.playerLife -= totalDamage;
                if (this.playerLife <= 0) {
                    this.playerLife = 0;
                    this.battleEnd = true;
                }
                this.playerProgressBar.setLife(this.playerLife);
            }
            // Оппоненту начисляется урон
            if (target === Constants.OPPONENT) {
                totalDamage = (attack - block) > 0 ? (attack - block) : 0;
                this.opponentLife -= totalDamage;
                if (this.opponentLife <= 0) {
                    this.opponentLife = 0;
                    this.battleEnd = true;
                }
                this.opponentProgressBar.setLife(this.opponentLife);
            }

            Utilits.Data.debugLog('DAMAGE:', [target, attack, block, totalDamage]);
        }

        // Восстановление энергии
        private energyRecovery(): void {
            if (this.energyCount < 10) this.energyCount++;
            this.playerEnergy = this.energyCount;
            this.playerProgressBar.setEnergy(this.playerEnergy);
            this.opponentEnergy = this.energyCount;
            this.opponentProgressBar.setEnergy(this.opponentEnergy);
        }

        // Завершение битвы
        private endBattle(): void {
            let ko:AnimationKO = new AnimationKO(this.game, 315, 100);
            this.borderGroup.addChild(ko);

            if (this.playerLife > 0 && this.opponentLife <= 0) {
                GameData.Data.progressIndex++;
            }

            setTimeout(function () {
                this.game.state.start(Tournament.Name, true, false);
                Utilits.Data.debugLog("BATTLE", "END!");
            }.bind(this), 5000);
        }
    }
}
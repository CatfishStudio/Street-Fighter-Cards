module StreetFighterCards {
    import AnimationFlash = Fabrique.AnimationFlash;
    import AnimationKO = Fabrique.AnimationKO;
    import AnimationFight = Fabrique.AnimationFight;
    import AnimationFighter = Fabrique.AnimationFighter;
    import ButtonComix = Fabrique.ButtonComix;
    import ButtonTablo = Fabrique.ButtonTablo;
    import Settings = Fabrique.Settings;
    import Tutorial = Fabrique.Tutorial;
    import Card = Fabrique.Card;
    import FighterProgressBar = Fabrique.FighterProgressBar;
    import Slot = Fabrique.Slot;
    import Timer = Fabrique.Timer;
    import Ai = AI.Ai;

    export class Level extends Phaser.State {
        public static Name: string = "level";
        public name: string = Level.Name;

        private battleEnd: boolean;
        private playerVoiceWoman:boolean;
        private opponentVoiceWoman:boolean;

        private tween: Phaser.Tween;
        private group: Phaser.Group;
        private boardGroup: Phaser.Group;
        private handGroup: Phaser.Group;
        private borderGroup: Phaser.Group;
        private shirt: Phaser.Sprite;

        private timer: Timer;
        private buttonTablo: ButtonTablo;
        private settings: Settings;
        private tutorial: Tutorial;
        private buttonExit: ButtonComix;
        private buttonSettings: ButtonComix;
        private slots: Slot[];

        private status: number;
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
        private timerAI: Phaser.Timer;
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

            let playerName: string = GameData.Data.personages[GameData.Data.fighterIndex].name;
            let opponentName: string = GameData.Data.personages[GameData.Data.tournamentListIds[GameData.Data.progressIndex]].name;
            if(playerName === 'Chun Li' || playerName === 'Elena' || playerName === 'Ibuki') this.playerVoiceWoman = true;
            else this.playerVoiceWoman = false;
            if(opponentName === 'Chun Li' || opponentName === 'Elena' || opponentName === 'Ibuki') this.opponentVoiceWoman = true;
            else this.opponentVoiceWoman = false;

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
            this.timerAI = this.game.time.create(false);

            GameData.Data.deckMix(GameData.Data.fighterIndex);
            GameData.Data.deckMix(GameData.Data.tournamentListIds[GameData.Data.progressIndex]);

            this.status = 1;

            this.totalHits = 0;
            this.steepHits = 0;
            this.targetDamage = null;

            this.playMusic();
            this.createBackground();
            this.createTimer();
            this.createSlots();
            this.createButtons();
            this.createBars();
            this.createFighters();
            this.createHand();
            this.createDeck();
            this.createFlash();
            this.createTutorial();
            this.createBorder();

            this.showAnimFight();
        }

        public shutdown(): void {
            if (this.tutorial !== null && this.tutorial !== undefined) this.tutorial.shutdown();
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
            this.playerFlash.forEach((flash: AnimationFlash) => {
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
            this.opponentFlash.forEach((flash: AnimationFlash) => {
                flash.removeChildren();
            });
            this.opponentFlash = null;
            this.timerAI.destroy();
            // stage clear
            this.game.stage.removeChildren();
        }

        private settingsCreate() {
            this.settings = new Settings(this.game, this.borderGroup);
            this.settings.event.add(this.onButtonClick, this);
            this.timer.pauseTimer(true);
        }

        private settingsClose() {
            this.settings.removeAll();
            this.group.removeChild(this.settings);
            this.timer.pauseTimer(false);
        }

        private onButtonClick(event) {
            this.playButtonSound();
            if (this.battleEnd === true) return;
            switch (event.name) {
                case Constants.BUTTON_EXIT_BATTLE:
                    {
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
            let playerName: string = GameData.Data.personages[GameData.Data.fighterIndex].name;
            let opponentName: string = GameData.Data.personages[GameData.Data.tournamentListIds[GameData.Data.progressIndex]].name;
            this.playerProgressBar = new FighterProgressBar(this.game, this.group, GameData.Data.fighterIndex, 25, 25, FighterProgressBar.LEFT, playerName);
            this.playerProgressBar.setEnergy(this.playerEnergy);
            this.playerProgressBar.setLife(this.playerLife);
            this.opponentProgressBar = new FighterProgressBar(this.game, this.group, GameData.Data.tournamentListIds[GameData.Data.progressIndex], 690, 25, FighterProgressBar.RIGHT, opponentName);
            this.opponentProgressBar.setEnergy(this.opponentEnergy);
            this.opponentProgressBar.setLife(this.opponentLife);
        }

        private createFighters(): void {
            let playerPersonage: GameData.IPersonage = GameData.Data.personages[GameData.Data.fighterIndex];
            this.playerAnimation = new AnimationFighter(this.game, Constants.ACTIVE_PLAYER, playerPersonage.name, playerPersonage);
            this.playerAnimation.event.add(this.onAnimationComplete, this);
            this.group.addChild(this.playerAnimation);

            let opponentPersonage: GameData.IPersonage = GameData.Data.personages[GameData.Data.tournamentListIds[GameData.Data.progressIndex]];
            this.opponentAnimation = new AnimationFighter(this.game, Constants.ACTIVE_OPPONENT, opponentPersonage.name, opponentPersonage);
            this.opponentAnimation.anchor.setTo(.0, .0);
            this.opponentAnimation.scale.x *= -1;
            this.opponentAnimation.event.add(this.onAnimationComplete, this);
            this.group.addChild(this.opponentAnimation);

            this.correctPositionFighterAnimation();
        }

        private correctPositionFighterAnimation(): void {
            //this.playerAnimation.x = 250;
            this.playerAnimation.x = (Constants.GAME_WIDTH / 3);
            this.playerAnimation.y = (370 - 50) - this.playerAnimation.height;
            //this.opponentAnimation.x = (800 - 225) - (this.opponentAnimation.width / 2);
            this.opponentAnimation.x = (Constants.GAME_WIDTH - Constants.GAME_WIDTH / 2.5) - (this.opponentAnimation.width / 2);
            this.opponentAnimation.y = (370 - 50) - this.opponentAnimation.height;
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

        private createFlash(): void {
            this.playerFlash = [];
            this.opponentFlash = [];
            let flash: AnimationFlash;
            for (let i: number = 0; i < this.slotsPoints.length; i++) {
                if (i < 3) {
                    flash = new AnimationFlash(this.game, this.slotsPoints[i][0] - 330, this.slotsPoints[i][1] - 240);
                    this.playerFlash.push(flash);
                    this.borderGroup.add(this.playerFlash[this.playerFlash.length - 1]);
                } else {
                    flash = new AnimationFlash(this.game, this.slotsPoints[i][0] - 330, this.slotsPoints[i][1] - 240);
                    this.opponentFlash.push(flash);
                    this.borderGroup.add(this.opponentFlash[this.opponentFlash.length - 1]);
                }
            }
        }

        private createTutorial(): void {
            if (Config.settingTutorial === true && GameData.Data.progressIndex === 0) {
                this.tutorial = new Tutorial(this.game, GameData.Data.tutorList[2], Tutorial.RIGHT);
            }else{
                this.tutorial = new Tutorial(this.game, "", Tutorial.RIGHT, false);
            }
            this.borderGroup.addChild(this.tutorial);
        }

        private createBorder(): void {
            let border: Phaser.Sprite = new Phaser.Sprite(this.game, 0, 0, Images.BorderLevel);
            this.borderGroup.addChild(border);
        }

        private showAnimFight(): void {
            let fight: AnimationFight = new AnimationFight(this.game, 200, 50);
            this.borderGroup.addChild(fight);
            this.playVoiceReady();
        }

        // ДЕЙСТВИЕ: Взять карту
        private onDragStart(sprite: Phaser.Sprite, pointer: Phaser.Point, x: number, y: number): void {
            Utilits.Data.debugLog("START: x=", pointer.x + " y= " + pointer.y);
            this.playFlipUpSound();
            this.handGroup.addChild(sprite);
            this.group.removeChild(sprite);
            (sprite as Card).reduce(true);
        }

        // ДЕЙСТВИЕ: Положить карту
        private onDragStop(sprite: Phaser.Sprite, pointer: Phaser.Point): void {
            Utilits.Data.debugLog("STOP: x=", pointer.x + " y= " + pointer.y);
            this.playFlipDownSound();

            let pushInSlot: boolean = false;

            if ((sprite as Card).cardData.energy <= this.playerEnergy) {
                for (let index in this.slotsPoints) {
                    if (index === '3') {
                        if (pointer.y < 300) this.tutorMessage(GameData.Data.tutorList[3]); // доступны только слоты игрока
                        break;
                    }

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
            } else {
                if (pointer.y < 300) this.tutorMessage(GameData.Data.tutorList[4]); // недостаточно энергии
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

                if (this.status === Constants.STATUS_1_PLAYER_P_PROCESS_AI_WAIT) {
                    this.playerHand[this.playerHand.length - 1].dragAndDrop(true); // разрешаем игроку перетаскивание карт                    
                } else if (this.status === Constants.STATUS_2_PLAYER_P_COMPLETE_AI_PROCESS) {
                    this.playerHand[this.playerHand.length - 1].dragAndDrop(false);  // запрещаем перетаскивание карт
                } else if (this.status === Constants.STATUS_4_AI_AI_PROCESS_P_WAIT) {
                    this.playerHand[this.playerHand.length - 1].dragAndDrop(false);  // запрещаем перетаскивание карт
                } else if (this.status === Constants.STATUS_5_AI_AI_COMPLETE_P_PROCESS) {
                    this.playerHand[this.playerHand.length - 1].dragAndDrop(true); // разрешаем игроку перетаскивание карт
                }

                this.playerHand[this.playerHand.length - 1].indexInHand = this.playerHand.length - 1;

                this.tween = this.game.add.tween(this.playerHand[this.playerHand.length - 1]);
                this.tween.onComplete.add(this.moveCardDeckToHandPlayer, this);
                this.tween.to({ x: this.handPoints[this.playerHand.length - 1][0] }, 250, 'Linear');
                this.tween.start();

                this.playFlipDownSound();
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

                    this.playFlipDownSound();
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
            if (this.status === Constants.STATUS_2_PLAYER_P_COMPLETE_AI_PROCESS) {
                this.opponentHitsAI = this.opponentAi.getHits(Constants.ACTIVE_PLAYER);
            } else if (this.status === Constants.STATUS_4_AI_AI_PROCESS_P_WAIT) {
                this.opponentHitsAI = this.opponentAi.getHits(Constants.ACTIVE_OPPONENT);
            }

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

                    this.playFlipDownSound();
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

                this.timerAI.loop(3000, () => {
                    this.timerAI.stop();
                    this.timer.resetTimer();
                    this.endTurn();
                }, this);
                this.timerAI.start();

                Utilits.Data.debugLog("AI: Slots/Hand:", [this.opponentSlots, this.opponentHand]);
            }
        }

        /** ХОД (очередность ходов)
         *  status-1: Ход игрока - игрок выкладывает карты - ИИ ждет				(кнопка - true)
         *  status-2: Ход игрока - игрок положил карты - ИИ выкладыват карты		(кнопка - false)
         *  status-3: Выполняются карты на столе (Атака Игрока)									(кнопка - false)
         *  status-4: Ход ИИ - ИИ выкладывает карты - игрок ждет					(кнопка - false)
         *  status-5: Ход ИИ - ИИ положил карты - игрок выкладывает карты			(кнопка - true)
         *  status-6: Выполняются карты на столе (Атака ИИ)							(кнопка - false)	
        */
        private endTurn(): void {
            Utilits.Data.debugLog("Status", this.status);
            this.tutorHidden();

            if (this.status === Constants.STATUS_1_PLAYER_P_PROCESS_AI_WAIT) {
                /**
                 * Атака игрока.
                 * Время выкладывать карты игрока вышло. 
                 * Очередь выкладывать карты переходит к оппоненту
                 */
                this.status = Constants.STATUS_2_PLAYER_P_COMPLETE_AI_PROCESS;
                this.cardsDragAndDrop(false);           // запрещаем перетаскивание карт
                this.buttonTablo.buttonVisible(false);
                this.timer.setMessage("Ход противника");
                this.moveCardHandToBoardOpponent();     // ИИ выкладывания карт
            } else if (this.status === Constants.STATUS_2_PLAYER_P_COMPLETE_AI_PROCESS) {
                /**
                 * Атака игрока. 
                 * Время выкладывать карты оппонента вышло.
                 * Статус выполнения ударов
                 */
                this.timer.stopTimer();
                this.status = Constants.STATUS_3_PLAYER_ATTACK;
                this.cardsDragAndDrop(false);                   // запрещаем перетаскивание карт
                this.timer.setMessage("Ход противника");
                this.buttonTablo.buttonVisible(false);
                this.endTurn();
            } else if (this.status === Constants.STATUS_3_PLAYER_ATTACK) {
                /**
                 * Выполняются УДАРЫ выложенными картами.
                 * Ход передается оппоненту
                 */
                Utilits.Data.debugLog("[HIT PLAYER]", "Execute HITS");
                this.implementHits();
            } else if (this.status === Constants.STATUS_4_AI_AI_PROCESS_P_WAIT) {
                /**
                 * Атака оппонента.
                 * Время выкладывать карты оппонента вышло. 
                 * Очередь выкладывать карты переходит к игроку
                 */
                this.status = Constants.STATUS_5_AI_AI_COMPLETE_P_PROCESS;
                this.cardsDragAndDrop(true);                    // разрешаем перетаскивание карт
                this.buttonTablo.buttonVisible(true);
                this.timer.setMessage("Ваш ход");
            } else if (this.status === Constants.STATUS_5_AI_AI_COMPLETE_P_PROCESS) {
                /**
                 * Атака оппонента. 
                 * Время выкладывать карты игрока вышло.
                 * Статус выполнения ударов
                 */
                this.timer.stopTimer();                         // останачливаем таймер
                this.status = Constants.STATUS_6_AI_ATTACK;
                this.cardsDragAndDrop(false);                   // запрещаем перетаскивание карт
                this.timer.setMessage("Ваш ход");
                this.buttonTablo.buttonVisible(false);
                this.endTurn();
            } else if (this.status === Constants.STATUS_6_AI_ATTACK) {
                /**
                 * Выполняются УДАРЫ выложенными картами.
                 * Ход передается игроку
                 */
                Utilits.Data.debugLog("[HIT OPPONENT]", "Execute HITS");
                this.implementHits();
            }
        }

        /**
         * ВЫПОЛНЕНИЕ УДАРОВ
         */
        private implementHits() {
            Utilits.Data.debugLog("IMPLEMENTATION: cards [slot/steep]:", [this.totalHits, this.steepHits]);

            this.targetDamage = null;
            if (this.totalHits > 2) { // выполнение всех карт в слотах завершено
                this.totalHits = 0;
                this.steepHits = 0;
                this.targetDamage = null;
                this.playerAnimation.stanceAnimation();
                this.opponentAnimation.stanceAnimation();
                this.correctPositionFighterAnimation();

                this.moveCardDeckToHandPlayer();
                this.moveCardDeckToHandOpponent();

                if (this.status === Constants.STATUS_3_PLAYER_ATTACK) {
                    this.status = Constants.STATUS_4_AI_AI_PROCESS_P_WAIT;
                    this.cardsDragAndDrop(false);                   // запрещаем перетаскивание карт
                    this.timer.setMessage("Ход противника");
                    this.timerAI.loop(3000, () => {
                        this.timerAI.stop();
                        this.moveCardHandToBoardOpponent();         // ИИ выкладывания карт
                    }, this);
                    this.timerAI.start();
                } else if (this.status === Constants.STATUS_6_AI_ATTACK) {
                    this.status = Constants.STATUS_1_PLAYER_P_PROCESS_AI_WAIT;
                    this.buttonTablo.buttonVisible(true);
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

        // Распределение анимаций
        private animationHits(playerCard: Card, opponentCard: Card): void {
            // #1: оба слота пустые
            if (playerCard === null && opponentCard === null) {
                this.totalHits++;
                this.steepHits = 0;
                this.targetDamage = null;
                this.playerAnimation.stanceAnimation();
                this.opponentAnimation.stanceAnimation();
                this.correctPositionFighterAnimation();
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
                    this.correctPositionFighterAnimation();
                    this.playSoundPlayerHit(playerCard.cardData);
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
                        this.correctPositionFighterAnimation();
                        this.playSoundOpponentHit(opponentCard.cardData);
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
                                this.correctPositionFighterAnimation();
                                this.playSoundPlayerHit(playerCard.cardData);
                                this.playSoundOpponentHit(opponentCard.cardData);
                            } else {
                                // блок (игрок) - блок (оппонент)
                                // атака (игрок) - блок (оппонент)
                                // блок (игрок) - атака (оппонент)
                                this.playerAnimation.hitAnimation(playerCard.cardData);         // выполняется карта игрока
                                this.opponentAnimation.hitAnimation(opponentCard.cardData);     // выполняется карта оппонента
                                this.correctPositionFighterAnimation();
                                this.playSoundPlayerHit(playerCard.cardData);
                                this.playSoundOpponentHit(opponentCard.cardData);
                            }
                            this.damageCalculation(Constants.PLAYER, opponentCard, playerCard);
                            this.damageCalculation(Constants.OPPONENT, playerCard, opponentCard);
                        }
                    }
                }
            }
        }

        // АНИМАЦИЯ УДАРОВ/БЛОКОВ/ПОВРЕЖДЕНИЙ - АНИМАЦИЯ ВЫПОЛНЕНА
        private onAnimationComplete(target, hit): void {
            Utilits.Data.debugLog('ANIMATION steep complete [target/type]:', [target, hit]);

            if (target === Constants.ANIMATION_PLAYER_COMPLETE) {
                this.steepHits++;
                if (hit === Constants.ANIMATION_TYPE_DAMAGE && this.battleEnd === false) this.playerAnimation.stanceAnimation();
            } else if (target === Constants.ANIMATION_OPPONENT_COMPLETE) {
                this.steepHits++;
                if (hit === Constants.ANIMATION_TYPE_DAMAGE && this.battleEnd === false) this.opponentAnimation.stanceAnimation();
            }

            if (this.targetDamage === Constants.PLAYER) {
                this.targetDamage = null;
                this.playerAnimation.damageAnimation();
                this.correctPositionFighterAnimation();
                this.playSoundPlayerDamage();
            } else if (this.targetDamage === Constants.OPPONENT) {
                this.targetDamage = null;
                this.opponentAnimation.damageAnimation();
                this.correctPositionFighterAnimation();
                this.playSoundOpponentDamage();
            } else if (this.targetDamage === Constants.PLAYER_AND_OPPONENT) {
                this.targetDamage = null;
                this.playerAnimation.damageAnimation();
                this.opponentAnimation.damageAnimation();
                this.correctPositionFighterAnimation();
                this.playSoundPlayerDamage();
                this.playSoundOpponentDamage();
            }

            Utilits.Data.debugLog('ANIMATION steep hits:', this.steepHits);
            if (this.steepHits >= 2) {
                if (this.battleEnd === false) {   // битва еще не завершена
                    this.steepHits = 0;
                    this.totalHits++;
                    this.targetDamage = null;
                    this.playerAnimation.stanceAnimation();
                    this.opponentAnimation.stanceAnimation();
                    this.correctPositionFighterAnimation();
                    this.implementHits();
                } else {  // битва завершена (последняя анимация победа/поражение)

                    if (this.steepHits <= 2) {
                        this.timer.stopTimer();
                        this.timer.setMessage("Конец боя");
                        if (this.playerLife > 0 && this.opponentLife <= 0) { // победа игрока
                            this.playerAnimation.winAnimation();
                            this.opponentAnimation.loseAnimation();
                            this.correctPositionFighterAnimation();
                        } else {  // игрок проиграл
                            this.playerAnimation.loseAnimation();
                            this.opponentAnimation.winAnimation();
                            this.correctPositionFighterAnimation();
                        }
                    }
                    if (this.steepHits >= 4) {
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

        /**
         * Завершение битвы
         */
        private endBattle(): void {
            this.cardsDragAndDrop(false);

            let ko: AnimationKO = new AnimationKO(this.game, 315, 100);
            this.borderGroup.addChild(ko);

            if (this.playerLife > 0 && this.opponentLife <= 0) {
                GameData.Data.progressIndex++;
                this.playVoiceYouWin();
            }else{
                this.playVoiceYouLose();
            }

            setTimeout(function () {
                this.game.state.start(Tournament.Name, true, false);
                Utilits.Data.debugLog("BATTLE", "END!");
            }.bind(this), 3000);
        }

        /**
         * Обучение и подсказки
         */
        private tutorHidden(): void {
            if (this.tutorial !== null && this.tutorial !== undefined) {
                this.tutorial.hidden();
            }
        }

        private tutorMessage(message: string): void {
            if (Config.settingTutorial === false) return;
            if (this.tutorial !== null && this.tutorial !== undefined) {
                this.tutorial.showTemporarily(message);
            }
        }

        /**
         * Звуки и музыка
         */
        private playMusic(): void {
            GameData.Data.musicSelected++;
            if (GameData.Data.musicSelected > 4) GameData.Data.musicSelected = 2;
            GameData.Data.music.stop();
            GameData.Data.music.key = GameData.Data.musicList[GameData.Data.musicSelected][0];
            GameData.Data.music.loop = true;
            GameData.Data.music.volume = GameData.Data.musicList[GameData.Data.musicSelected][1];
            if (Config.settingMusic) {
                GameData.Data.music.play();
            }
        }

        private playVoiceReady():void {
            if(GameData.Data.voiceSound === undefined || GameData.Data.voiceSound=== null){
                GameData.Data.voiceSound = this.game.add.audio(Sounds.FightersReadySound);
            }
            GameData.Data.voiceSound.loop = false;
            GameData.Data.voiceSound.key = Sounds.FightersReadySound;
            GameData.Data.voiceSound.volume = 0.2;
            GameData.Data.voiceSound.play();
        }

        private playVoiceKO():void {
            if(GameData.Data.voiceSound === undefined || GameData.Data.voiceSound=== null){
                GameData.Data.voiceSound = this.game.add.audio(Sounds.KoSound);
            }
            GameData.Data.voiceSound.loop = false;
            GameData.Data.voiceSound.key = Sounds.KoSound;
            GameData.Data.voiceSound.volume = 0.2;
            GameData.Data.voiceSound.play();
        }

        private playVoiceYouLose():void {
            if(GameData.Data.voiceSound === undefined || GameData.Data.voiceSound=== null){
                GameData.Data.voiceSound = this.game.add.audio(Sounds.YouLoseSound);
            }
            GameData.Data.voiceSound.loop = false;
            GameData.Data.voiceSound.key = Sounds.YouLoseSound;
            GameData.Data.voiceSound.volume = 0.2;
            GameData.Data.voiceSound.play();
        }

        private playVoiceYouWin():void {
            if(GameData.Data.voiceSound === undefined || GameData.Data.voiceSound=== null){
                GameData.Data.voiceSound = this.game.add.audio(Sounds.YouWinSound);
            }
            GameData.Data.voiceSound.loop = false;
            GameData.Data.voiceSound.key = Sounds.YouWinSound;
            GameData.Data.voiceSound.volume = 0.2;
            GameData.Data.voiceSound.play();
        }

        private playSoundPlayerDamage():void {
            if(GameData.Data.playerSound === undefined || GameData.Data.playerSound=== null){
                if(this.playerVoiceWoman === false) GameData.Data.playerSound = this.game.add.audio(Sounds.DamageManSound);
                else GameData.Data.playerSound = this.game.add.audio(Sounds.DamageWomanSound);
            }
            GameData.Data.playerSound.loop = false;
            if(this.playerVoiceWoman === false) GameData.Data.playerSound.key = Sounds.DamageManSound;
            else GameData.Data.playerSound.key = Sounds.DamageWomanSound;
            GameData.Data.playerSound.volume = 0.2;
            GameData.Data.playerSound.play();
        }

        private playSoundPlayerHit(cardData: GameData.ICard):void {
            if(GameData.Data.playerSound === undefined || GameData.Data.playerSound=== null){
                GameData.Data.playerSound = this.game.add.audio(Sounds.HitHandSound);
            }

            if(cardData.type === Constants.CARD_TYPE_ATTACK){
                if (cardData.power > 20) {
                    GameData.Data.playerSound.key = Sounds.HitLegSound;
                } else {
                    GameData.Data.playerSound.key = Sounds.HitHandSound;
                }
                GameData.Data.playerSound.loop = false;
                GameData.Data.playerSound.volume = 0.2;
                GameData.Data.playerSound.play();
            }            
        }

        private playSoundOpponentDamage():void {
            if(GameData.Data.opponentSound === undefined || GameData.Data.opponentSound=== null){
                if(this.opponentVoiceWoman === false) GameData.Data.opponentSound = this.game.add.audio(Sounds.DamageManSound);
                else GameData.Data.opponentSound = this.game.add.audio(Sounds.DamageWomanSound);
            }
            GameData.Data.opponentSound.loop = false;
            if(this.opponentVoiceWoman === false) GameData.Data.opponentSound.key = Sounds.DamageManSound;
            else GameData.Data.opponentSound.key = Sounds.DamageWomanSound;
            GameData.Data.opponentSound.volume = 0.2;
            GameData.Data.opponentSound.play();
        }

        private playSoundOpponentHit(cardData: GameData.ICard):void {
            if(GameData.Data.opponentSound === undefined || GameData.Data.opponentSound=== null){
                GameData.Data.opponentSound = this.game.add.audio(Sounds.HitHandSound);
            }

            if(cardData.type === Constants.CARD_TYPE_ATTACK){
                if (cardData.power > 20) {
                    GameData.Data.opponentSound.key = Sounds.HitLegSound;
                } else {
                    GameData.Data.opponentSound.key = Sounds.HitHandSound;
                }
                GameData.Data.opponentSound.loop = false;
                GameData.Data.opponentSound.volume = 0.2;
                GameData.Data.opponentSound.play();
            }
        }

        private playButtonSound(): void {
            if (Config.settingSound) {
                GameData.Data.buttonSound.loop = false;
                GameData.Data.buttonSound.volume = 0.5;
                GameData.Data.buttonSound.play();
            }
        }

        private playFlipUpSound():void {
            if (Config.settingSound) {
                GameData.Data.flipUpSound.loop = false;
                GameData.Data.flipUpSound.volume = 0.5;
                GameData.Data.flipUpSound.play();
            }
        }

        private playFlipDownSound():void {
            if (Config.settingSound) {
                GameData.Data.flipDownSound.loop = false;
                GameData.Data.flipDownSound.volume = 0.5;
                GameData.Data.flipDownSound.play();
            }
        }
    }
}
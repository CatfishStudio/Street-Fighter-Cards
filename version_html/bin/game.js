var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var StreetFighterCards;
(function (StreetFighterCards) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            _super.call(this, {
                enableDebug: false,
                width: Constants.GAME_WIDTH,
                height: Constants.GAME_HEIGHT,
                renderer: Phaser.AUTO,
                parent: 'content',
                transparent: true,
                antialias: true,
                forceSetTimeOut: false
            });
            this.state.add(StreetFighterCards.Boot.Name, StreetFighterCards.Boot, false);
            this.state.add(StreetFighterCards.Preloader.Name, StreetFighterCards.Preloader, false);
            this.state.add(StreetFighterCards.Menu.Name, StreetFighterCards.Menu, false);
            this.state.add(StreetFighterCards.ChoiceFighter.Name, StreetFighterCards.ChoiceFighter, false);
            this.state.add(StreetFighterCards.Tournament.Name, StreetFighterCards.Tournament, false);
            this.state.add(StreetFighterCards.Level.Name, StreetFighterCards.Level, false);
        }
        Game.getInstance = function () {
            if (StreetFighterCards.Game.instance === null) {
                Game.instance = new Game();
            }
            return Game.instance;
        };
        Game.prototype.start = function () {
            this.state.start(StreetFighterCards.Boot.Name);
        };
        Game.instance = null;
        return Game;
    }(Phaser.Game));
    StreetFighterCards.Game = Game;
})(StreetFighterCards || (StreetFighterCards = {}));
var Constants = (function () {
    function Constants() {
    }
    Constants.GAME_WIDTH = 800;
    Constants.GAME_HEIGHT = 600;
    Constants.CARD_TYPE_ATTACK = 'card_type_attack';
    Constants.CARD_TYPE_DEFENSE = 'card_type_defense';
    Constants.BUTTON_PLAY = 'button_play';
    Constants.BUTTON_SETTINGS = 'button_settings';
    Constants.BUTTON_SETTINGS_CLOSE = 'button_settings_close';
    Constants.BUTTON_INVATE = 'button_invate';
    Constants.BUTTON_BACK = 'button_back';
    Constants.BUTTON_NEXT = 'button_next';
    Constants.BUTTON_SELECT = 'button_select';
    Constants.BUTTON_ARROW_LEFT = 'button_arrow_left';
    Constants.BUTTON_ARROW_RIGHT = 'button_arrow_right';
    Constants.BUTTON_START_BATTLE = 'button_start_battle';
    Constants.BUTTON_EXIT_BATTLE = 'button_exit_battle';
    return Constants;
}());
var Config = (function () {
    function Config() {
    }
    Config.settingSound = true;
    Config.settingMusic = true;
    Config.settingTutorial = true;
    return Config;
}());
var Images = (function () {
    function Images() {
    }
    Images.PreloaderImage = 'preloader.png';
    Images.MenuImage = 'menu.png';
    Images.BorderImage = 'border.png';
    Images.ChoiceImage = 'choice.png';
    Images.ArrowLeft = 'arrow_left.png';
    Images.ArrowRight = 'arrow_right.png';
    Images.TutorialImage = 'tutorial.png';
    Images.ButtonOff = 'buttons_off.png';
    Images.ButtonOn = 'buttons_on.png';
    Images.BackgroundTournament = 'tournament/background_tournament.jpg';
    Images.vsTournament = 'tournament/vs.png';
    Images.BackgroundIcon = 'icons/background_icon.png';
    Images.HandBackground = 'levels/hand_bg.jpg';
    Images.HandGradient = 'levels/hand_gr.png';
    Images.BorderLevel = 'levels/border_level.png';
    Images.preloadList = [
        Images.MenuImage,
        Images.BorderImage,
        Images.ChoiceImage,
        Images.ArrowLeft,
        Images.ArrowRight,
        Images.TutorialImage,
        Images.ButtonOff,
        Images.ButtonOn,
        Images.BackgroundTournament,
        Images.vsTournament,
        Images.BackgroundIcon,
        Images.HandBackground,
        Images.HandGradient,
        Images.BorderLevel,
        'tournament/akuma.png',
        'tournament/alex.png',
        'tournament/chun_li.png',
        'tournament/dudley.png',
        'tournament/elena.png',
        'tournament/gill.png',
        'tournament/hugo.png',
        'tournament/ibuki.png',
        'tournament/ken.png',
        'tournament/makoto.png',
        'tournament/necro.png',
        'tournament/oro.png',
        'tournament/q.png',
        'tournament/remy.png',
        'tournament/ryu.png',
        'tournament/sean.png',
        'tournament/twelve.png',
        'tournament/urien.png',
        'tournament/yang.png',
        'tournament/yun.png',
        'icons/akuma.png',
        'icons/alex.png',
        'icons/chun_li.png',
        'icons/dudley.png',
        'icons/elena.png',
        'icons/gill.png',
        'icons/hugo.png',
        'icons/ibuki.png',
        'icons/ken.png',
        'icons/makoto.png',
        'icons/necro.png',
        'icons/oro.png',
        'icons/q.png',
        'icons/remy.png',
        'icons/ryu.png',
        'icons/sean.png',
        'icons/twelve.png',
        'icons/urien.png',
        'icons/yang.png',
        'icons/yun.png',
        'levels/level_1.jpg',
        'levels/level_2.jpg',
        'levels/level_3.jpg',
        'levels/level_4.jpg',
        'levels/level_5.jpg',
        'levels/level_6.jpg',
        'levels/level_7.jpg',
        'levels/level_8.jpg',
        'levels/level_9.jpg',
        'levels/level_10.jpg',
        'levels/level_11.jpg',
        'levels/level_12.jpg',
        'levels/level_13.jpg',
        'levels/level_14.jpg',
        'levels/level_15.jpg',
        'levels/level_16.jpg',
        'levels/level_17.jpg',
        'levels/level_18.jpg',
        'levels/level_19.jpg',
        'levels/level_20.jpg',
        'comix/comix_page_1.jpg',
        'comix/comix_page_2.jpg',
        'comix/comix_page_3.jpg',
        'comix/comix_page_4.jpg',
        'comix/comix_page_5_1.jpg',
        'comix/comix_page_5_2.jpg',
        'comix/comix_page_6.jpg',
        'comix/comix_page_7.jpg',
        'comix/comix_page_8_1.jpg',
        'comix/comix_page_8_2.jpg',
        'comix/comix_page_9_1.jpg',
        'comix/comix_page_9_2.jpg',
        'comix/comix_page_10.jpg',
        'comix/comix_page_11.jpg',
        'comix/comix_page_12.jpg',
        'comix/comix_page_13.jpg',
        'comix/comix_page_14.jpg',
        'comix/comix_page_15_1.jpg',
        'comix/comix_page_15_2.jpg',
        'comix/comix_page_16.jpg',
        'comix/comix_page_17.jpg',
        'comix/comix_page_18.jpg',
        'comix/comix_page_19.jpg',
        'comix/comix_page_20.jpg',
        'comix/comix_page_21.jpg',
    ];
    return Images;
}());
var Animations = (function () {
    function Animations() {
    }
    Animations.Akuma = 'Akuma.json';
    Animations.Alex = 'Alex.json';
    Animations.ChunLi = 'Chun Li.json';
    Animations.Dudley = 'Dudley.json';
    Animations.Elena = 'Elena.json';
    Animations.Gill = 'Gill.json';
    Animations.Hugo = 'Hugo.json';
    Animations.Ibuki = 'Ibuki.json';
    Animations.Ken = 'Ken.json';
    Animations.Makoto = 'Makoto.json';
    Animations.Necro = 'Necro.json';
    Animations.Oro = 'Oro.json';
    Animations.Q = 'Q.json';
    Animations.Remy = 'Remy.json';
    Animations.Ryu = 'Ryu.json';
    Animations.Sean = 'Sean.json';
    Animations.Twelve = 'Twelve.json';
    Animations.Urien = 'Urien.json';
    Animations.Yang = 'Yang.json';
    Animations.Yun = 'Yun.json';
    Animations.preloadList = [
        Animations.Akuma,
        Animations.Alex,
        Animations.ChunLi,
        Animations.Dudley,
        Animations.Elena,
        Animations.Gill,
        Animations.Hugo,
        Animations.Ibuki,
        Animations.Ken,
        Animations.Makoto,
        Animations.Necro,
        Animations.Oro,
        Animations.Q,
        Animations.Remy,
        Animations.Ryu,
        Animations.Sean,
        Animations.Twelve,
        Animations.Urien,
        Animations.Yang,
        Animations.Yun
    ];
    return Animations;
}());
var Atlases = (function () {
    function Atlases() {
    }
    Atlases.BigKen = 'BigKen';
    Atlases.BigRyu = 'BigRyu';
    Atlases.BigCards = 'BigCards';
    Atlases.Cards = 'Cards';
    Atlases.Akuma = 'Akuma';
    Atlases.Alex = 'Alex';
    Atlases.ChunLi = 'Chun Li';
    Atlases.Dudley = 'Dudley';
    Atlases.Elena = 'Elena';
    Atlases.Gill = 'Gill';
    Atlases.Hugo = 'Hugo';
    Atlases.Ibuki = 'Ibuki';
    Atlases.Ken = 'Ken';
    Atlases.Makoto = 'Makoto';
    Atlases.Necro = 'Necro';
    Atlases.Oro = 'Oro';
    Atlases.Q = 'Q';
    Atlases.Remy = 'Remy';
    Atlases.Ryu = 'Ryu';
    Atlases.Sean = 'Sean';
    Atlases.Twelve = 'Twelve';
    Atlases.Urien = 'Urien';
    Atlases.Yang = 'Yang';
    Atlases.Yun = 'Yun';
    Atlases.preloadList = [
        Atlases.BigKen,
        Atlases.BigRyu,
        Atlases.BigCards,
        Atlases.Cards,
        Atlases.Akuma,
        Atlases.Alex,
        Atlases.ChunLi,
        Atlases.Dudley,
        Atlases.Elena,
        Atlases.Gill,
        Atlases.Hugo,
        Atlases.Ibuki,
        Atlases.Ken,
        Atlases.Makoto,
        Atlases.Necro,
        Atlases.Oro,
        Atlases.Q,
        Atlases.Remy,
        Atlases.Ryu,
        Atlases.Sean,
        Atlases.Twelve,
        Atlases.Urien,
        Atlases.Yang,
        Atlases.Yun
    ];
    return Atlases;
}());
var Sheet = (function () {
    function Sheet() {
    }
    Sheet.ButtonStyle1 = 'button_style_1_sheet.png';
    Sheet.ButtonStyle2 = 'button_style_2_sheet.png';
    Sheet.preloadList = [
        Sheet.ButtonStyle1,
        Sheet.ButtonStyle2,
    ];
    return Sheet;
}());
var Decks = (function () {
    function Decks() {
    }
    Decks.akumaDeckJson = 'akuma_deck.json';
    Decks.alexDeckJson = 'alex_deck.json';
    Decks.chunLiDeckJson = 'chun_li_deck.json';
    Decks.dudleyDeckJson = 'dudley_deck.json';
    Decks.elenaDeckJson = 'elena_deck.json';
    Decks.gillDeckJson = 'gill_deck.json';
    Decks.hugoDeckJson = 'hugo_deck.json';
    Decks.ibukiDeckJson = 'ibuki_deck.json';
    Decks.kenDeckJson = 'ken_deck.json';
    Decks.makotoDeckJson = 'makoto_deck.json';
    Decks.necroDeckJson = 'necro_deck.json';
    Decks.oroDeckJson = 'oro_deck.json';
    Decks.qDeckJson = 'q_deck.json';
    Decks.remyDeckJson = 'remy_deck.json';
    Decks.ryuDeckJson = 'ryu_deck.json';
    Decks.seanDeckJson = 'sean_deck.json';
    Decks.twelveDeckJson = 'twelve_deck.json';
    Decks.urienDeckJson = 'urien_deck.json';
    Decks.yangDeckJson = 'yang_deck.json';
    Decks.yunDeckJson = 'yun_deck.json';
    Decks.preloadList = [
        Decks.akumaDeckJson,
        Decks.alexDeckJson,
        Decks.chunLiDeckJson,
        Decks.dudleyDeckJson,
        Decks.elenaDeckJson,
        Decks.gillDeckJson,
        Decks.hugoDeckJson,
        Decks.ibukiDeckJson,
        Decks.kenDeckJson,
        Decks.makotoDeckJson,
        Decks.necroDeckJson,
        Decks.oroDeckJson,
        Decks.qDeckJson,
        Decks.remyDeckJson,
        Decks.ryuDeckJson,
        Decks.seanDeckJson,
        Decks.twelveDeckJson,
        Decks.urienDeckJson,
        Decks.yangDeckJson,
        Decks.yunDeckJson
    ];
    return Decks;
}());
var GameData;
(function (GameData) {
    var Data = (function () {
        function Data() {
        }
        Data.initPersonages = function (game) {
            var _this = this;
            this.progressIndex = -1;
            this.comixIndex = 0;
            GameData.Data.personages = [];
            var personage;
            Decks.preloadList.forEach(function (value) {
                personage = {};
                personage.id = game.cache.getJSON(value).id;
                personage.name = game.cache.getJSON(value).name;
                personage.attack = 0;
                personage.defense = 0;
                personage.energy = game.cache.getJSON(value).energy;
                personage.life = 0;
                personage.deck = [];
                personage.level = game.cache.getJSON(value).level;
                _this.createDeck(game, value, personage);
                _this.loadAnimation(game, personage);
                GameData.Data.personages.push(personage);
            });
            console.log(GameData.Data.personages);
        };
        Data.createDeck = function (game, value, personage) {
            var card;
            var deck = game.cache.getJSON(value).deck;
            for (var key in deck.cards) {
                card = {};
                card.type = deck.cards[key].type;
                card.power = deck.cards[key].power;
                card.life = deck.cards[key].life;
                card.energy = deck.cards[key].energy;
                personage.deck.push(card);
                if (deck.cards[key].type === Constants.CARD_TYPE_ATTACK) {
                    personage.attack += Number(deck.cards[key].power);
                }
                else {
                    personage.defense += Number(deck.cards[key].power);
                }
                personage.life += Number(deck.cards[key].life);
            }
        };
        Data.deckMix = function (index) {
            GameData.Data.personages[index].deck.sort(Utilits.Data.compareRandom);
            console.log(GameData.Data.personages[index].deck);
        };
        Data.loadAnimation = function (game, personage) {
            try {
                var json = game.cache.getJSON(personage.name + '.json');
                var block = [];
                var damage = [];
                var hit_hand = [];
                var hit_leg = [];
                var lose = [];
                var stance = [];
                var win = [];
                for (var key in json.frames) {
                    if ('block' == key.substr(0, 5))
                        block.push(key);
                    if ('damage' == key.substr(0, 6))
                        damage.push(key);
                    if ('hit_hand' == key.substr(0, 8))
                        hit_hand.push(key);
                    if ('hit_leg' == key.substr(0, 7))
                        hit_leg.push(key);
                    if ('lose' == key.substr(0, 4))
                        lose.push(key);
                    if ('stance' == key.substr(0, 6))
                        stance.push(key);
                    if ('win' == key.substr(0, 3))
                        win.push(key);
                }
                personage.animBlock = block;
                personage.animDamage = damage;
                personage.animHitHand = hit_hand;
                personage.animHitLeg = hit_leg;
                personage.animLose = lose;
                personage.animStance = stance;
                personage.animWin = win;
            }
            catch (error) {
            }
        };
        Data.initTournament = function () {
            this.progressIndex = 0;
            GameData.Data.tournamentListIds = [];
            var listIDs = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
            var id;
            while (listIDs.length > 0) {
                id = listIDs.splice(Utilits.Data.getRandomRangeIndex(0, listIDs.length - 1), 1)[0];
                if (id === 5 || id === GameData.Data.fighterIndex)
                    continue;
                GameData.Data.tournamentListIds.push(id);
            }
            GameData.Data.tournamentListIds.push(GameData.Data.fighterIndex); // player
            GameData.Data.tournamentListIds.push(5); // boss
            console.log(GameData.Data.tournamentListIds);
        };
        Data.fighterIndex = 0; // id выбранного игроком персонажа (в сохранение)
        Data.progressIndex = -1; // индекс прогресса в игре (в сохранение)
        Data.comixIndex = 0; // индекс комикса
        Data.fighters = [
            [0, 'Akuma', 'akuma_card.png', 'tournament/akuma.png', 'icons/akuma.png'],
            [1, 'Alex', 'alex_card.png', 'tournament/alex.png', 'icons/alex.png'],
            [2, 'Chun Li', 'chun_li_card.png', 'tournament/chun_li.png', 'icons/chun_li.png'],
            [3, 'Dudley', 'dudley_card.png', 'tournament/dudley.png', 'icons/dudley.png'],
            [4, 'Elena', 'elena_card.png', 'tournament/elena.png', 'icons/elena.png'],
            [5, 'Gill', 'gill_card.png', 'tournament/gill.png', 'icons/gill.png'],
            [6, 'Hugo', 'hugo_card.png', 'tournament/hugo.png', 'icons/hugo.png'],
            [7, 'Ibuki', 'ibuki_card.png', 'tournament/ibuki.png', 'icons/ibuki.png'],
            [8, 'Ken', 'ken_card.png', 'tournament/ken.png', 'icons/ken.png'],
            [9, 'Makoto', 'makoto_card.png', 'tournament/makoto.png', 'icons/makoto.png'],
            [10, 'Necro', 'necro_card.png', 'tournament/necro.png', 'icons/necro.png'],
            [11, 'Oro', 'oro_card.png', 'tournament/oro.png', 'icons/oro.png'],
            [12, 'Q', 'q_card.png', 'tournament/q.png', 'icons/q.png'],
            [13, 'Remy', 'remy_card.png', 'tournament/remy.png', 'icons/remy.png'],
            [14, 'Ryu', 'ryu_card.png', 'tournament/ryu.png', 'icons/ryu.png'],
            [15, 'Sean', 'sean_card.png', 'tournament/sean.png', 'icons/sean.png'],
            [16, 'Twelve', 'twelve_card.png', 'tournament/twelve.png', 'icons/twelve.png'],
            [17, 'Urien', 'urien_card.png', 'tournament/urien.png', 'icons/urien.png'],
            [18, 'Yang', 'yang_card.png', 'tournament/yang.png', 'icons/yang.png'],
            [19, 'Yun', 'yun_card.png', 'tournament/yun.png', 'icons/yun.png',]
        ];
        Data.comixes = [
            ['comix/comix_page_1.jpg'],
            ['comix/comix_page_2.jpg'],
            ['comix/comix_page_3.jpg'],
            ['comix/comix_page_4.jpg'],
            ['comix/comix_page_5_1.jpg', 'comix/comix_page_5_2.jpg'],
            ['comix/comix_page_6.jpg'],
            ['comix/comix_page_7.jpg'],
            ['comix/comix_page_8_1.jpg', 'comix/comix_page_8_2.jpg'],
            ['comix/comix_page_9_1.jpg', 'comix/comix_page_9_2.jpg'],
            ['comix/comix_page_10.jpg'],
            ['comix/comix_page_11.jpg'],
            ['comix/comix_page_12.jpg'],
            ['comix/comix_page_13.jpg'],
            ['comix/comix_page_14.jpg'],
            ['comix/comix_page_15_1.jpg', 'comix/comix_page_15_2.jpg'],
            ['comix/comix_page_16.jpg'],
            ['comix/comix_page_17.jpg'],
            ['comix/comix_page_18.jpg'],
            ['comix/comix_page_19.jpg'],
            ['comix/comix_page_20.jpg'],
            ['comix/comix_page_21.jpg']
        ];
        return Data;
    }());
    GameData.Data = Data;
})(GameData || (GameData = {}));
var Utilits;
(function (Utilits) {
    var Data = (function () {
        function Data() {
        }
        /* Проверка четности и нечетности */
        Data.checkEvenOrOdd = function (n) {
            if (n & 1) {
                return false; // odd (нечетное число)
            }
            else {
                return true; // even (четное число)
            }
        };
        /* Генератор случайных чисел */
        Data.getRandomIndex = function () {
            var index = Math.round(Math.random() / 0.1);
            return index;
        };
        /* Генератор случайных чисел из диапазона чисел мин/макс */
        Data.getRandomRangeIndex = function (min, max) {
            max -= min;
            var index = (Math.random() * ++max) + min;
            return Math.floor(index);
        };
        /* Функция перемешивает элементы массива */
        Data.compareRandom = function (a, b) {
            return Math.random() - 0.5;
        };
        return Data;
    }());
    Utilits.Data = Data;
})(Utilits || (Utilits = {}));
var Fabrique;
(function (Fabrique) {
    var Tutorial = (function (_super) {
        __extends(Tutorial, _super);
        function Tutorial(game, text) {
            _super.call(this, game, 25, 600, Images.TutorialImage);
            this.text = text;
            this.init();
        }
        Tutorial.prototype.shutdown = function () {
            this.tween.stop();
            this.removeChild(this.dialog);
        };
        Tutorial.prototype.init = function () {
            this.tween = this.game.add.tween(this);
            this.tween.to({ x: this.x, y: this.y - 225 }, 750, 'Linear');
            this.tween.onComplete.add(this.onComplete, this);
            this.tween.start();
        };
        Tutorial.prototype.onComplete = function () {
            this.createDialog();
        };
        Tutorial.prototype.createDialog = function () {
            this.dialog = new Phaser.Sprite(this.game, 0, 0);
            var graphics = this.game.add.graphics(0, 0);
            graphics.beginFill(0xFFFFFF, 1);
            graphics.lineStyle(2, 0x000000, 1);
            graphics.moveTo(-20, 20);
            graphics.lineTo(5, 30);
            graphics.lineTo(5, 47);
            graphics.lineTo(-20, 20);
            graphics.endFill();
            graphics.beginFill(0xFFFFFF, 1);
            graphics.lineStyle(0, 0x000000, 1);
            graphics.drawRoundedRect(0, 0, 200, 50, 15);
            graphics.endFill();
            graphics.beginFill(0xFFFFFF, 0);
            graphics.lineStyle(2, 0x000000, 1);
            graphics.drawRoundedRect(0, 0, 200, 50, 15);
            graphics.endFill();
            graphics.beginFill(0xFFFFFF, 1);
            graphics.lineStyle(1, 0xFFFFFF, 1);
            graphics.drawRect(-1, 28, 4, 11);
            graphics.endFill();
            this.dialog.addChild(graphics);
            var messageText = this.game.add.text(5, 5, this.text, { font: "18px Georgia", fill: "#000000", align: "left" });
            this.dialog.addChild(messageText);
            this.dialog.x = 110;
            this.dialog.y = 75;
            this.addChild(this.dialog);
            this.tweenDialogStart();
        };
        Tutorial.prototype.tweenDialogStart = function () {
            this.tween = this.game.add.tween(this.dialog);
            this.tween.to({ x: this.dialog.x + 25, y: this.dialog.y }, 1000, 'Linear');
            this.tween.onComplete.add(this.tweenDialogEnd, this);
            this.tween.start();
        };
        Tutorial.prototype.tweenDialogEnd = function () {
            this.tween = this.game.add.tween(this.dialog);
            this.tween.to({ x: this.dialog.x - 25, y: this.dialog.y }, 1000, 'Linear');
            this.tween.onComplete.add(this.tweenDialogStart, this);
            this.tween.start();
        };
        return Tutorial;
    }(Phaser.Sprite));
    Fabrique.Tutorial = Tutorial;
})(Fabrique || (Fabrique = {}));
var Fabrique;
(function (Fabrique) {
    var Settings = (function (_super) {
        __extends(Settings, _super);
        function Settings(game, parent) {
            _super.call(this, game, parent);
            this.init();
        }
        Settings.prototype.init = function () {
            this.event = new Phaser.Signal();
            var startX = (Constants.GAME_WIDTH / 2) - 150;
            var startY = (Constants.GAME_HEIGHT / 2) - 150;
            /* background and border */
            var polygon = new Phaser.Polygon([
                new Phaser.Point(startX, startY),
                new Phaser.Point(startX + 10, startY - 10),
                new Phaser.Point(startX + 300, startY - 10),
                new Phaser.Point(startX + 310, startY),
                new Phaser.Point(startX + 310, startY + 200),
                new Phaser.Point(startX + 300, startY + 210),
                new Phaser.Point(startX + 10, startY + 210),
                new Phaser.Point(startX, startY + 200)
            ]);
            var graphicOverlay = new Phaser.Graphics(this.game, 0, 0);
            graphicOverlay.beginFill(0x000000, 0.5);
            graphicOverlay.drawRect(0, 0, this.game.width, this.game.height);
            graphicOverlay.endFill();
            graphicOverlay.beginFill(0xFFFFFF, 0.95);
            graphicOverlay.lineStyle(2, 0x777777, 1);
            graphicOverlay.drawPolygon(polygon);
            graphicOverlay.endFill();
            graphicOverlay.inputEnabled = true;
            this.addChild(graphicOverlay);
            /* title */
            var title = new Phaser.Text(this.game, startX + 35, startY + 5, "НАСТРОЙКИ ИГРЫ", { font: "24px Georgia", fill: "#222222", align: "left" });
            this.addChild(title);
            /* sound */
            var buttonSound;
            if (Config.settingSound === true)
                buttonSound = new Phaser.Button(this.game, startX + 25, startY + 50, Images.ButtonOn, this.onButtonClick, this);
            else
                buttonSound = new Phaser.Button(this.game, startX + 25, startY + 50, Images.ButtonOff, this.onButtonClick, this);
            buttonSound.name = 'sound';
            this.addChild(buttonSound);
            var labelSound = new Phaser.Text(this.game, startX + 90, startY + 55, "Звук", { font: "18px Georgia", fill: "#222222", align: "left" });
            this.addChild(labelSound);
            /* music */
            var buttonMusic;
            if (Config.settingMusic === true)
                buttonMusic = new Phaser.Button(this.game, startX + 155, startY + 50, Images.ButtonOn, this.onButtonClick, this);
            else
                buttonMusic = new Phaser.Button(this.game, startX + 155, startY + 50, Images.ButtonOff, this.onButtonClick, this);
            buttonMusic.name = 'music';
            this.addChild(buttonMusic);
            var labelMusic = new Phaser.Text(this.game, startX + 220, startY + 55, "Музыка", { font: "18px Georgia", fill: "#222222", align: "left" });
            this.addChild(labelMusic);
            /* tutorial */
            var buttonTutorial;
            if (Config.settingTutorial === true)
                buttonTutorial = new Phaser.Button(this.game, startX + 25, startY + 100, Images.ButtonOn, this.onButtonClick, this);
            else
                buttonTutorial = new Phaser.Button(this.game, startX + 25, startY + 100, Images.ButtonOff, this.onButtonClick, this);
            buttonTutorial.name = 'tutorial';
            this.addChild(buttonTutorial);
            var labelTutorial = new Phaser.Text(this.game, startX + 90, startY + 105, "Обучение в игре", { font: "18px Georgia", fill: "#222222", align: "left" });
            this.addChild(labelTutorial);
            /* button close */
            this.buttonClose = new Fabrique.ButtonComix(this.game, this, Constants.BUTTON_SETTINGS_CLOSE, 'ЗАКРЫТЬ', 50, startX + 60, startY + 150);
            this.buttonClose.event.add(this.onButtonCloseClick, this);
            this.updateTransform();
        };
        Settings.prototype.onButtonCloseClick = function (event) {
            this.buttonClose.shutdown();
            this.removeAll();
            this.event.dispatch(event);
        };
        Settings.prototype.onButtonClick = function (event) {
            switch (event.name) {
                case 'sound':
                    {
                        if (Config.settingSound === true) {
                            Config.settingSound = false;
                            this.removeChild(event);
                            event = new Phaser.Button(this.game, event.x, event.y, Images.ButtonOff, this.onButtonClick, this);
                            event.name = 'sound';
                            this.addChild(event);
                        }
                        else {
                            Config.settingSound = true;
                            this.removeChild(event);
                            event = new Phaser.Button(this.game, event.x, event.y, Images.ButtonOn, this.onButtonClick, this);
                            event.name = 'sound';
                            this.addChild(event);
                        }
                        break;
                    }
                case 'music':
                    {
                        if (Config.settingMusic === true) {
                            Config.settingMusic = false;
                            this.removeChild(event);
                            event = new Phaser.Button(this.game, event.x, event.y, Images.ButtonOff, this.onButtonClick, this);
                            event.name = 'music';
                            this.addChild(event);
                        }
                        else {
                            Config.settingMusic = true;
                            this.removeChild(event);
                            event = new Phaser.Button(this.game, event.x, event.y, Images.ButtonOn, this.onButtonClick, this);
                            event.name = 'music';
                            this.addChild(event);
                        }
                        break;
                    }
                case 'tutorial':
                    {
                        if (Config.settingTutorial === true) {
                            Config.settingTutorial = false;
                            this.removeChild(event);
                            event = new Phaser.Button(this.game, event.x, event.y, Images.ButtonOff, this.onButtonClick, this);
                            event.name = 'tutorial';
                            this.addChild(event);
                        }
                        else {
                            Config.settingTutorial = true;
                            this.removeChild(event);
                            event = new Phaser.Button(this.game, event.x, event.y, Images.ButtonOn, this.onButtonClick, this);
                            event.name = 'tutorial';
                            this.addChild(event);
                        }
                        break;
                    }
                default:
                    break;
            }
        };
        return Settings;
    }(Phaser.Group));
    Fabrique.Settings = Settings;
})(Fabrique || (Fabrique = {}));
var Fabrique;
(function (Fabrique) {
    var ButtonOrange = (function (_super) {
        __extends(ButtonOrange, _super);
        function ButtonOrange(game, parent, name, text, textX, x, y) {
            _super.call(this, game, parent);
            this.init(name, text, textX, x, y);
        }
        ButtonOrange.prototype.shutdown = function () {
            this.removeAll();
        };
        ButtonOrange.prototype.init = function (name, text, textX, x, y) {
            this.x = x;
            this.y = y;
            this.event = new Phaser.Signal();
            var button = new Phaser.Button(this.game, 0, 0, Sheet.ButtonStyle1, this.onButtonClick, this, 1, 2);
            button.name = name;
            button.events.onInputOut.add(this.onButtonInputOut, this);
            button.events.onInputOver.add(this.onButtonInputOver, this);
            this.addChild(button);
            this.textButton = new Phaser.Text(this.game, textX, 15, text, { font: "bold 16px Arial", fill: "#9B372C" });
            this.textButton.setShadow(-1, -1, 'rgba(255,255,255,1)', 0);
            this.addChild(this.textButton);
        };
        ButtonOrange.prototype.onButtonClick = function (event) {
            this.event.dispatch(event);
        };
        ButtonOrange.prototype.onButtonInputOut = function (event) {
            this.textButton.fill = "#9B372C";
            this.textButton.setShadow(-1, -1, 'rgba(255,255,255,1)', 0);
        };
        ButtonOrange.prototype.onButtonInputOver = function (event) {
            this.textButton.fill = "#FF6A00";
            this.textButton.setShadow(-1, -1, 'rgba(255,255,255,1)', 0);
        };
        return ButtonOrange;
    }(Phaser.Group));
    Fabrique.ButtonOrange = ButtonOrange;
})(Fabrique || (Fabrique = {}));
var Fabrique;
(function (Fabrique) {
    var ButtonComix = (function (_super) {
        __extends(ButtonComix, _super);
        function ButtonComix(game, parent, name, text, textX, x, y) {
            _super.call(this, game, parent);
            this.init(name, text, textX, x, y);
        }
        ButtonComix.prototype.shutdown = function () {
            this.removeAll();
        };
        ButtonComix.prototype.init = function (name, text, textX, x, y) {
            this.x = x;
            this.y = y;
            this.event = new Phaser.Signal();
            var button = new Phaser.Button(this.game, 0, 0, Sheet.ButtonStyle2, this.onButtonClick, this, 1, 2);
            button.name = name;
            button.events.onInputOut.add(this.onButtonInputOut, this);
            button.events.onInputOver.add(this.onButtonInputOver, this);
            this.addChild(button);
            this.textButton = new Phaser.Text(this.game, textX, 20, text, { font: "bold 16px Arial", fill: "#444444" });
            this.textButton.setShadow(-1, -1, 'rgba(255,255,255,1)', 0);
            this.addChild(this.textButton);
        };
        ButtonComix.prototype.onButtonClick = function (event) {
            this.event.dispatch(event);
        };
        ButtonComix.prototype.onButtonInputOut = function (event) {
            this.textButton.fill = "#444444";
            this.textButton.setShadow(-1, -1, 'rgba(255,255,255,1)', 0);
        };
        ButtonComix.prototype.onButtonInputOver = function (event) {
            this.textButton.fill = "#9E32EC";
            this.textButton.setShadow(-1, -1, 'rgba(0,0,0,1)', 0);
        };
        return ButtonComix;
    }(Phaser.Group));
    Fabrique.ButtonComix = ButtonComix;
})(Fabrique || (Fabrique = {}));
var Fabrique;
(function (Fabrique) {
    var AnimationBigKen = (function (_super) {
        __extends(AnimationBigKen, _super);
        function AnimationBigKen(game) {
            _super.call(this, game, 0, 0, Atlases.BigKen, 0);
            this.init();
        }
        AnimationBigKen.prototype.init = function () {
            var anim = this.animations.add(Atlases.BigKen);
            anim.onComplete.add(this.onCompleteVideo, this);
            anim.play(10, true, false);
        };
        AnimationBigKen.prototype.onCompleteVideo = function () {
        };
        return AnimationBigKen;
    }(Phaser.Sprite));
    Fabrique.AnimationBigKen = AnimationBigKen;
})(Fabrique || (Fabrique = {}));
var Fabrique;
(function (Fabrique) {
    var AnimationBigRyu = (function (_super) {
        __extends(AnimationBigRyu, _super);
        function AnimationBigRyu(game) {
            _super.call(this, game, 0, 0, Atlases.BigRyu, 0);
            this.init();
        }
        AnimationBigRyu.prototype.init = function () {
            var anim = this.animations.add(Atlases.BigRyu);
            anim.onComplete.add(this.onCompleteVideo, this);
            anim.play(10, true, false);
        };
        AnimationBigRyu.prototype.onCompleteVideo = function () {
        };
        return AnimationBigRyu;
    }(Phaser.Sprite));
    Fabrique.AnimationBigRyu = AnimationBigRyu;
})(Fabrique || (Fabrique = {}));
var Fabrique;
(function (Fabrique) {
    var AnimationFighter = (function (_super) {
        __extends(AnimationFighter, _super);
        function AnimationFighter(game, personageName, personageAnim) {
            _super.call(this, game, 0, 0, personageName, 54);
            this.init(personageName, personageAnim);
        }
        AnimationFighter.prototype.init = function (personageName, personageAnim) {
            var anim = this.animations.add(personageName, personageAnim);
            anim.onComplete.add(this.onComplete, this);
            anim.play(10, true, false);
        };
        AnimationFighter.prototype.onComplete = function () {
        };
        return AnimationFighter;
    }(Phaser.Sprite));
    Fabrique.AnimationFighter = AnimationFighter;
})(Fabrique || (Fabrique = {}));
var Fabrique;
(function (Fabrique) {
    var FighterCard = (function (_super) {
        __extends(FighterCard, _super);
        function FighterCard(game, x, y, frame, index) {
            _super.call(this, game, x, y, Atlases.BigCards, frame);
            this.init(index);
        }
        FighterCard.prototype.init = function (index) {
            this.defenseText = this.game.add.text(13, 13, GameData.Data.personages[index].defense.toString(), { font: "bold 18px Times New Roman", fill: "#FFFFFF", align: "left" });
            this.addChild(this.defenseText);
            this.healthText = this.game.add.text(150, 13, GameData.Data.personages[index].life.toString(), { font: "bold 18px Times New Roman", fill: "#FFFFFF", align: "left" });
            this.addChild(this.healthText);
            this.damageText = this.game.add.text(11, 242, GameData.Data.personages[index].attack.toString(), { font: "bold 18px Times New Roman", fill: "#D83900", align: "left" });
            this.addChild(this.damageText);
            this.energyText = this.game.add.text(157, 242, GameData.Data.personages[index].energy.toString(), { font: "bold 18px Times New Roman", fill: "#0026FF", align: "left" });
            this.addChild(this.energyText);
        };
        return FighterCard;
    }(Phaser.Sprite));
    Fabrique.FighterCard = FighterCard;
})(Fabrique || (Fabrique = {}));
var Fabrique;
(function (Fabrique) {
    var Slides = (function (_super) {
        __extends(Slides, _super);
        function Slides(game, parent) {
            _super.call(this, game, parent);
            this.init();
            this.createSlides();
        }
        Slides.prototype.shutdown = function () {
            this.slideGroup.removeAll();
            this.removeAll();
        };
        Slides.prototype.init = function () {
            GameData.Data.fighterIndex = 1;
            this.canClick = true;
        };
        Slides.prototype.createSlides = function () {
            this.slideGroup = new Phaser.Group(this.game, this);
            var posX = 5;
            var posY = 90;
            for (var i = 0; i < GameData.Data.personages.length; i++) {
                var fCard = new Fabrique.FighterCard(this.game, posX + (300 * i), posY, GameData.Data.fighters[i][2], i);
                this.slideGroup.addChild(fCard);
            }
            this.buttonLeft = new Phaser.Button(this.game, 205, 190, Images.ArrowLeft, this.onButtonClick, this);
            this.buttonLeft.name = Constants.BUTTON_ARROW_LEFT;
            this.addChild(this.buttonLeft);
            this.buttonRight = new Phaser.Button(this.game, 505, 190, Images.ArrowRight, this.onButtonClick, this);
            this.buttonRight.name = Constants.BUTTON_ARROW_RIGHT;
            this.addChild(this.buttonRight);
            if (GameData.Data.fighterIndex === GameData.Data.personages.length - 1) {
                this.buttonRight.visible = false;
            }
        };
        Slides.prototype.onButtonClick = function (event) {
            switch (event.name) {
                case Constants.BUTTON_ARROW_LEFT:
                    {
                        if (this.canClick) {
                            this.canClick = false;
                            GameData.Data.fighterIndex--;
                            var tween = this.game.add.tween(this.slideGroup);
                            tween.to({ x: this.slideGroup.x + 300 }, 250, 'Linear');
                            tween.onComplete.add(this.onTweenComplete, this);
                            tween.start();
                        }
                        break;
                    }
                case Constants.BUTTON_ARROW_RIGHT:
                    {
                        if (this.canClick) {
                            this.canClick = false;
                            GameData.Data.fighterIndex++;
                            var tween = this.game.add.tween(this.slideGroup);
                            tween.to({ x: this.slideGroup.x - 300 }, 250, 'Linear');
                            tween.onComplete.add(this.onTweenComplete, this);
                            tween.start();
                        }
                        break;
                    }
                default:
                    break;
            }
        };
        Slides.prototype.onTweenComplete = function (event) {
            if (GameData.Data.fighterIndex === 0) {
                this.buttonLeft.visible = false;
                this.buttonRight.visible = true;
            }
            else if (GameData.Data.fighterIndex === GameData.Data.personages.length - 1) {
                this.buttonLeft.visible = true;
                this.buttonRight.visible = false;
            }
            else {
                this.buttonLeft.visible = true;
                this.buttonRight.visible = true;
            }
            this.canClick = true;
        };
        return Slides;
    }(Phaser.Group));
    Fabrique.Slides = Slides;
})(Fabrique || (Fabrique = {}));
var Fabrique;
(function (Fabrique) {
    var Icon = (function (_super) {
        __extends(Icon, _super);
        function Icon(game, parent, index, fighterIndex, x, y, orientation) {
            _super.call(this, game, parent);
            this.init(index, fighterIndex, x, y, orientation);
        }
        Icon.prototype.shutdown = function () {
            this.removeAll();
        };
        Icon.prototype.init = function (index, fighterIndex, x, y, orientation) {
            this.x = x;
            this.y = y;
            var polygonLeft = new Phaser.Polygon([
                new Phaser.Point(0, 0),
                new Phaser.Point(85, 0),
                new Phaser.Point(105, 40),
                new Phaser.Point(20, 40),
                new Phaser.Point(0, 0)
            ]);
            var polygonLeftMask = new Phaser.Polygon([
                new Phaser.Point(x + 2, y + 2),
                new Phaser.Point(x + 84, y + 2),
                new Phaser.Point(x + 103, y + 38),
                new Phaser.Point(x + 22, y + 38),
                new Phaser.Point(x + 2, y + 2)
            ]);
            var polygonRight = new Phaser.Polygon([
                new Phaser.Point(0, 0),
                new Phaser.Point(85, 0),
                new Phaser.Point(65, 40),
                new Phaser.Point(-20, 40),
                new Phaser.Point(0, 0)
            ]);
            var polygonRightMask = new Phaser.Polygon([
                new Phaser.Point(x + 2, y + 2),
                new Phaser.Point(x + 82, y + 2),
                new Phaser.Point(x + 63, y + 38),
                new Phaser.Point(x - 16, y + 38),
                new Phaser.Point(x + 2, y + 2)
            ]);
            var background;
            var iconMask;
            var iconBackgroundSprite;
            var iconSprite;
            if (orientation === Icon.LEFT) {
                background = new Phaser.Graphics(this.game, 0, 0);
                background.beginFill(0xFFFFFF, 0.95);
                background.lineStyle(2, 0x07111D, 0.95);
                background.drawPolygon(polygonLeft);
                background.endFill();
                this.addChild(background);
                iconMask = new Phaser.Graphics(this.game, 0, 0);
                iconMask.beginFill(0xFFFFFF);
                iconMask.drawPolygon(polygonLeftMask);
                iconMask.endFill();
                iconBackgroundSprite = new Phaser.Sprite(this.game, 0, 0, Images.BackgroundIcon);
                iconBackgroundSprite.mask = iconMask;
                this.addChild(iconBackgroundSprite);
                iconSprite = new Phaser.Sprite(this.game, 0, 0, GameData.Data.fighters[fighterIndex][4]);
                iconSprite.mask = iconMask;
                if (index < GameData.Data.progressIndex)
                    iconSprite.tint = 0x000000;
                this.addChild(iconSprite);
            }
            else {
                background = new Phaser.Graphics(this.game, 0, 0);
                background.beginFill(0xFFFFFF, 0.95);
                background.lineStyle(2, 0x07111D, 0.95);
                background.drawPolygon(polygonRight);
                background.endFill();
                this.addChild(background);
                iconMask = new Phaser.Graphics(this.game, 0, 0);
                iconMask.beginFill(0xFFFFFF);
                iconMask.drawPolygon(polygonRightMask);
                iconMask.endFill();
                iconBackgroundSprite = new Phaser.Sprite(this.game, -20, 0, Images.BackgroundIcon);
                iconBackgroundSprite.mask = iconMask;
                this.addChild(iconBackgroundSprite);
                iconSprite = new Phaser.Sprite(this.game, 40, 20, GameData.Data.fighters[fighterIndex][4]);
                iconSprite.anchor.setTo(.5, .5);
                iconSprite.scale.x *= -1;
                iconSprite.mask = iconMask;
                if (index < GameData.Data.progressIndex)
                    iconSprite.tint = 0x000000;
                this.addChild(iconSprite);
            }
            var playerBorder = new Phaser.Polygon([
                new Phaser.Point(0, 0),
                new Phaser.Point(85, 0),
                new Phaser.Point(90, 10),
                new Phaser.Point(30, 10),
                new Phaser.Point(10, 20),
            ]);
            if (fighterIndex === GameData.Data.fighterIndex) {
                var border = new Phaser.Graphics(this.game, 0, 0);
                border.beginFill(0x005C9E, 0.7);
                border.lineStyle(0, 0x005C9E, 0.0);
                border.drawPolygon(playerBorder);
                border.endFill();
                this.addChild(border);
                var playerText1 = this.game.add.text(8, 0, "И", { font: "12px Georgia", fill: "#FFFFFF", align: "left" });
                this.addChild(playerText1);
                var playerText2 = this.game.add.text(17, -2, "грок", { font: "10px Georgia", fill: "#FFFFFF", align: "left" });
                this.addChild(playerText2);
            }
            var opponentLeftBorder = new Phaser.Polygon([
                new Phaser.Point(0, 0),
                new Phaser.Point(85, 0),
                new Phaser.Point(95, 20),
                new Phaser.Point(55, 10),
                new Phaser.Point(5, 10),
            ]);
            var opponentRightBorder = new Phaser.Polygon([
                new Phaser.Point(0, 0),
                new Phaser.Point(85, 0),
                new Phaser.Point(75, 20),
                new Phaser.Point(55, 10),
                new Phaser.Point(-5, 10),
            ]);
            if (index === GameData.Data.progressIndex && orientation === Icon.LEFT) {
                var border = new Phaser.Graphics(this.game, 0, 0);
                border.beginFill(0xFF0000, 0.5);
                border.lineStyle(0, 0xFF0000, 0.0);
                border.drawPolygon(opponentLeftBorder);
                border.endFill();
                this.addChild(border);
                var opponentText = this.game.add.text(67, 0, "ПК", { font: "10px Georgia", fill: "#FFFFFF", align: "left" });
                this.addChild(opponentText);
            }
            else if (index === GameData.Data.progressIndex && orientation === Icon.RIGHT) {
                var border = new Phaser.Graphics(this.game, 0, 0);
                border.beginFill(0xFF0000, 0.5);
                border.lineStyle(0, 0xFF0000, 0.0);
                border.drawPolygon(opponentRightBorder);
                border.endFill();
                this.addChild(border);
                var opponentText = this.game.add.text(60, 0, "CPU", { font: "10px Georgia", fill: "#FFFFFF", align: "left" });
                this.addChild(opponentText);
            }
        };
        Icon.LEFT = "left";
        Icon.RIGHT = "right";
        return Icon;
    }(Phaser.Group));
    Fabrique.Icon = Icon;
})(Fabrique || (Fabrique = {}));
var Fabrique;
(function (Fabrique) {
    var ButtonComix = Fabrique.ButtonComix;
    var Comix = (function (_super) {
        __extends(Comix, _super);
        function Comix(game, parent) {
            _super.call(this, game, parent);
            if (GameData.Data.comixIndex >= (GameData.Data.progressIndex + 2)) {
                this.removeAll();
            }
            else {
                this.init();
            }
        }
        Comix.prototype.shutdown = function () {
            GameData.Data.comixIndex++;
            this.buttonNext.shutdown();
            this.removeAll();
        };
        Comix.prototype.init = function () {
            this.index = 0;
            this.createBackground();
            this.createButton();
            this.createBorder();
        };
        Comix.prototype.createBackground = function () {
            this.background = new Phaser.Sprite(this.game, 0, 0, GameData.Data.comixes[GameData.Data.comixIndex][this.index]);
            this.addChild(this.background);
        };
        Comix.prototype.createButton = function () {
            this.buttonNext = new ButtonComix(this.game, this, Constants.BUTTON_NEXT, 'ДАЛЕЕ', 60, 600, 530);
            this.buttonNext.event.add(this.onButtonClick, this);
        };
        Comix.prototype.createBorder = function () {
            var border = new Phaser.Sprite(this.game, 0, 0, Images.BorderImage);
            this.addChild(border);
        };
        Comix.prototype.onButtonClick = function (event) {
            if ((GameData.Data.comixes[GameData.Data.comixIndex].length - 1) === this.index) {
                this.shutdown();
                this.parent.removeChild(this);
            }
            else {
                this.index++;
                this.background.loadTexture(GameData.Data.comixes[GameData.Data.comixIndex][this.index]);
            }
        };
        return Comix;
    }(Phaser.Group));
    Fabrique.Comix = Comix;
})(Fabrique || (Fabrique = {}));
var Fabrique;
(function (Fabrique) {
    var Card = (function (_super) {
        __extends(Card, _super);
        function Card(game, parent, fighterName, card) {
            _super.call(this, game, parent);
            this.cardData = card;
            this.nameFighter = fighterName;
            this.init();
        }
        Card.prototype.shutdown = function () {
            this.removeAll();
        };
        Card.prototype.dragAndDrop = function (value) {
            if (value === true) {
                this.cardSprite.inputEnabled = true;
                this.cardSprite.input.enableDrag(false, true);
            }
            else {
                this.cardSprite.inputEnabled = false;
            }
        };
        Card.prototype.init = function () {
            var headerSprite;
            var footerSprite;
            if (this.cardData.type === Constants.CARD_TYPE_ATTACK) {
                headerSprite = new Phaser.Sprite(this.game, 0, 0, Atlases.Cards, this.nameFighter + "_hand.png");
                footerSprite = new Phaser.Sprite(this.game, 0, 0, Atlases.Cards, this.nameFighter + "_hand.png");
            }
            else {
                headerSprite = new Phaser.Sprite(this.game, 0, 0, Atlases.Cards, this.nameFighter + "_block.png");
                footerSprite = new Phaser.Sprite(this.game, 0, 0, Atlases.Cards, this.nameFighter + "_block.png");
            }
            this.cardSprite = new Phaser.Sprite(this.game, 0, 0);
            // Size header 126x157
            var bitmapData = this.game.make.bitmapData(126, 157);
            bitmapData.copy(headerSprite);
            bitmapData.update(126, 157);
            this.header = new Phaser.Sprite(this.game, 0, 0, bitmapData);
            this.cardSprite.addChild(this.header);
            // Size footer 126x33
            bitmapData = this.game.make.bitmapData(126, 33);
            bitmapData.copy(footerSprite, 0, 0, 126, 190, 0, -157);
            bitmapData.update(126, 33);
            this.footer = new Phaser.Sprite(this.game, 0, 157, bitmapData);
            this.cardSprite.addChild(this.footer);
            this.addChild(this.cardSprite);
        };
        return Card;
    }(Phaser.Group));
    Fabrique.Card = Card;
})(Fabrique || (Fabrique = {}));
var StreetFighterCards;
(function (StreetFighterCards) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            _super.call(this);
            this.name = Boot.Name;
        }
        /*
        * Загружаем ассеты необходимые для прелоадера
        */
        Boot.prototype.init = function () {
            // отключаем контекстное меню
            this.game.canvas.oncontextmenu = function (e) {
                e.preventDefault();
            };
        };
        Boot.prototype.preload = function () {
            this.game.load.image(Images.PreloaderImage, 'assets/images/' + Images.PreloaderImage);
        };
        Boot.prototype.create = function () {
            var _this = this;
            this.game.state.start(StreetFighterCards.Preloader.Name, true, false, {
                nextStage: StreetFighterCards.Menu.Name,
                preloadHandler: function () {
                    Images.preloadList.forEach(function (assetName) {
                        _this.game.load.image(assetName, 'assets/images/' + assetName);
                    });
                    Atlases.preloadList.forEach(function (assetName) {
                        _this.game.load.atlas(assetName, 'assets/atlas/' + assetName + '.png', 'assets/atlas/' + assetName + '.json');
                    });
                    Animations.preloadList.forEach(function (assetName) {
                        _this.game.load.json(assetName, 'assets/atlas/' + assetName);
                    });
                    /*
                    Sheet.preloadList.forEach((assetName: string) => {
                        this.game.load.spritesheet(assetName, 'assets/images/' + assetName, 186, 46);
                    });
                    */
                    _this.game.load.spritesheet(Sheet.preloadList[0], 'assets/images/' + Sheet.preloadList[0], 186, 46);
                    _this.game.load.spritesheet(Sheet.preloadList[1], 'assets/images/' + Sheet.preloadList[1], 187, 56);
                    Decks.preloadList.forEach(function (assetName) {
                        _this.game.load.json(assetName, 'assets/data/' + assetName);
                    });
                }
            });
        };
        Boot.prototype.shutdown = function () {
            //this.game.stage.removeChildren();
        };
        Boot.Name = 'booter';
        return Boot;
    }(Phaser.State));
    StreetFighterCards.Boot = Boot;
})(StreetFighterCards || (StreetFighterCards = {}));
var StreetFighterCards;
(function (StreetFighterCards) {
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            _super.call(this);
            this.name = Preloader.Name;
            this.loadPercent = 0;
        }
        Preloader.prototype.init = function (config) {
            this.config = config;
        };
        Preloader.prototype.preload = function () {
            this.game.add.sprite(0, 0, Images.PreloaderImage);
            this.game.load.onLoadStart.add(this.onLoadStart, this);
            this.game.load.onFileComplete.add(this.onFileComplete, this);
            this.game.load.onLoadComplete.add(this.onLoadComplete, this);
            this.config.preloadHandler();
            if (this.game.load.totalQueuedFiles() === 0) {
                this.onLoadComplete();
            }
        };
        Preloader.prototype.onLoadStart = function () {
            this.preloadText = this.game.add.text(310, 490, "ЗАГРУЗКА 0%", { font: "24px Georgia", fill: "#000000" });
        };
        Preloader.prototype.onFileComplete = function (progress, cacheKey, success, totalLoaded, totalFiles) {
            this.loadPercent = Math.round(progress * 0.1);
            if (this.loadPercent <= 0)
                this.loadPercent = 1;
            if (this.preloadText !== null) {
                this.preloadText.text = "ЗАГРУЗКА " + this.loadPercent + "0 %";
            }
        };
        Preloader.prototype.onLoadComplete = function () {
            GameData.Data.initPersonages(this.game);
            this.game.stage.removeChildren();
            this.game.state.start(this.config.nextStage, true, false);
        };
        Preloader.Name = "preloader";
        return Preloader;
    }(Phaser.State));
    StreetFighterCards.Preloader = Preloader;
})(StreetFighterCards || (StreetFighterCards = {}));
var StreetFighterCards;
(function (StreetFighterCards) {
    var Settings = Fabrique.Settings;
    var ButtonOrange = Fabrique.ButtonOrange;
    var AnimationBigKen = Fabrique.AnimationBigKen;
    var AnimationBigRyu = Fabrique.AnimationBigRyu;
    var Menu = (function (_super) {
        __extends(Menu, _super);
        function Menu() {
            _super.call(this);
            this.name = Menu.Name;
        }
        Menu.prototype.create = function () {
            this.groupMenu = new Phaser.Group(this.game, this.stage);
            this.menuSprite = new Phaser.Sprite(this.game, 0, 0, Images.MenuImage);
            this.groupMenu.addChild(this.menuSprite);
            var bigKen = new AnimationBigKen(this.game);
            bigKen.scale.setTo(0.4, 0.4);
            bigKen.x = 35;
            bigKen.y = 225;
            this.groupMenu.addChild(bigKen);
            var bigRyu = new AnimationBigRyu(this.game);
            bigRyu.scale.setTo(0.4, 0.4);
            bigRyu.x = 555;
            bigRyu.y = 225;
            this.groupMenu.addChild(bigRyu);
            this.createButtons();
        };
        Menu.prototype.shutdown = function () {
            this.buttonStart.shutdown();
            this.buttonSettings.shutdown();
            this.buttonInvate.shutdown();
            this.groupMenu.removeAll();
            this.groupButtons.removeAll();
            this.game.stage.removeChildren();
        };
        Menu.prototype.createButtons = function () {
            this.groupButtons = new Phaser.Group(this.game, this.groupMenu);
            this.groupButtons.x = 300;
            this.groupButtons.y = 300;
            this.buttonStart = new ButtonOrange(this.game, this.groupButtons, Constants.BUTTON_PLAY, 'НАЧАТЬ ИГРУ', 35, 0, 0);
            this.buttonStart.event.add(this.onButtonClick, this);
            this.buttonSettings = new ButtonOrange(this.game, this.groupButtons, Constants.BUTTON_SETTINGS, 'НАСТРОЙКИ', 40, 0, 50);
            this.buttonSettings.event.add(this.onButtonClick, this);
            this.buttonInvate = new ButtonOrange(this.game, this.groupButtons, Constants.BUTTON_INVATE, 'ПРИГЛАСИТЬ', 35, 0, 100);
            this.buttonSettings.event.add(this.onButtonClick, this);
        };
        Menu.prototype.settingsCreate = function () {
            this.settings = new Settings(this.game, this.groupMenu);
            this.settings.event.add(this.onButtonClick, this);
        };
        Menu.prototype.settingsClose = function () {
            this.settings.removeAll();
            this.groupMenu.removeChild(this.settings);
        };
        Menu.prototype.onButtonClick = function (event) {
            switch (event.name) {
                case Constants.BUTTON_PLAY:
                    {
                        this.game.state.start(StreetFighterCards.ChoiceFighter.Name, true, false);
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
        };
        Menu.Name = "menu";
        return Menu;
    }(Phaser.State));
    StreetFighterCards.Menu = Menu;
})(StreetFighterCards || (StreetFighterCards = {}));
var StreetFighterCards;
(function (StreetFighterCards) {
    var ButtonComix = Fabrique.ButtonComix;
    var Slides = Fabrique.Slides;
    var Tutorial = Fabrique.Tutorial;
    var Settings = Fabrique.Settings;
    var Comix = Fabrique.Comix;
    var ChoiceFighter = (function (_super) {
        __extends(ChoiceFighter, _super);
        function ChoiceFighter() {
            _super.call(this);
            this.name = StreetFighterCards.Menu.Name;
        }
        ChoiceFighter.prototype.create = function () {
            this.groupWindow = new Phaser.Group(this.game, this.stage);
            this.createBackground();
            this.createButtons();
            this.createSlides();
            this.createTutorial();
            this.createBorder();
            this.createComix();
        };
        ChoiceFighter.prototype.shutdown = function () {
            this.slides.shutdown();
            this.buttonBack.shutdown();
            this.buttonSelect.shutdown();
            this.buttonSettings.shutdown();
            this.tutorial.shutdown();
            this.groupWindow.removeAll();
            this.game.stage.removeChildren();
        };
        ChoiceFighter.prototype.createBackground = function () {
            var backgroundSprite = new Phaser.Sprite(this.game, 0, 0, Images.ChoiceImage);
            this.groupWindow.addChild(backgroundSprite);
        };
        ChoiceFighter.prototype.createButtons = function () {
            this.buttonBack = new ButtonComix(this.game, this.groupWindow, Constants.BUTTON_BACK, 'НАЗАД', 60, 10, 10);
            this.buttonBack.event.add(this.onButtonClick, this);
            this.buttonSettings = new ButtonComix(this.game, this.groupWindow, Constants.BUTTON_SETTINGS, 'НАСТРОЙКИ', 40, 300, 530);
            this.buttonSettings.event.add(this.onButtonClick, this);
            this.buttonSelect = new ButtonComix(this.game, this.groupWindow, Constants.BUTTON_SELECT, 'ВЫБРАТЬ', 55, 600, 530);
            this.buttonSelect.event.add(this.onButtonClick, this);
        };
        ChoiceFighter.prototype.createSlides = function () {
            this.slides = new Slides(this.game, this.groupWindow);
        };
        ChoiceFighter.prototype.createTutorial = function () {
            this.tutorial = new Tutorial(this.game, 'Выберите персонаж!');
            this.groupWindow.addChild(this.tutorial);
        };
        ChoiceFighter.prototype.createBorder = function () {
            var borderSprite = new Phaser.Sprite(this.game, 0, 0, Images.BorderImage);
            this.groupWindow.addChild(borderSprite);
        };
        ChoiceFighter.prototype.createComix = function () {
            var comix = new Comix(this.game, this.groupWindow);
        };
        ChoiceFighter.prototype.settingsCreate = function () {
            this.settings = new Settings(this.game, this.groupWindow);
            this.settings.event.add(this.onButtonClick, this);
        };
        ChoiceFighter.prototype.settingsClose = function () {
            this.settings.removeAll();
            this.groupWindow.removeChild(this.settings);
        };
        ChoiceFighter.prototype.onButtonClick = function (event) {
            switch (event.name) {
                case Constants.BUTTON_SELECT:
                    {
                        GameData.Data.initTournament();
                        this.game.state.start(StreetFighterCards.Tournament.Name, true, false);
                        break;
                    }
                case Constants.BUTTON_BACK:
                    {
                        this.game.state.start(StreetFighterCards.Menu.Name, true, false);
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
        };
        ChoiceFighter.Name = "choce_fighter";
        return ChoiceFighter;
    }(Phaser.State));
    StreetFighterCards.ChoiceFighter = ChoiceFighter;
})(StreetFighterCards || (StreetFighterCards = {}));
var StreetFighterCards;
(function (StreetFighterCards) {
    var Icon = Fabrique.Icon;
    var ButtonComix = Fabrique.ButtonComix;
    var Settings = Fabrique.Settings;
    var Comix = Fabrique.Comix;
    var Tournament = (function (_super) {
        __extends(Tournament, _super);
        function Tournament() {
            _super.call(this);
            this.name = Tournament.Name;
        }
        Tournament.prototype.create = function () {
            this.group = new Phaser.Group(this.game, this.stage);
            this.createBackground();
            this.createVSPlayers();
            this.createIcons();
            this.createButtons();
            this.createBorder();
            this.createComix();
        };
        Tournament.prototype.shutdown = function () {
            this.icons.forEach(function (icon) {
                icon.shutdown();
            });
            this.buttonBack.shutdown();
            this.buttonStartBattle.shutdown();
            this.buttonSettings.shutdown();
            if (this.tutorial != null)
                this.tutorial.shutdown();
            this.group.removeAll();
        };
        Tournament.prototype.createBackground = function () {
            var background = new Phaser.Sprite(this.game, 0, 0, Images.BackgroundTournament);
            this.group.addChild(background);
        };
        Tournament.prototype.createVSPlayers = function () {
            /* Player */
            var player = new Phaser.Sprite(this.game, 200, 300, GameData.Data.fighters[GameData.Data.fighterIndex][3]);
            player.anchor.setTo(.5, .5);
            player.scale.x *= -1;
            //this.player.scale.y *= -1;
            this.group.addChild(player);
            var playerName = this.game.add.text(35, 350, GameData.Data.personages[GameData.Data.fighterIndex].name, { font: "54px Georgia", fill: "#FFFFFF", align: "left" });
            playerName.setShadow(-5, 5, 'rgba(0,0,0,0.5)', 0);
            this.group.addChild(playerName);
            /* Opponent */
            var opponentId = GameData.Data.tournamentListIds[GameData.Data.progressIndex];
            var opponent = new Phaser.Sprite(this.game, 400, 0, GameData.Data.fighters[opponentId][3]);
            this.group.addChild(opponent);
            var opponentName = this.game.add.text(575, 350, GameData.Data.personages[opponentId].name, { font: "54px Georgia", fill: "#FFFFFF", align: "left" });
            opponentName.setShadow(5, 5, 'rgba(0,0,0,0.5)', 0);
            this.group.addChild(opponentName);
            /* VS */
            var vs = new Phaser.Sprite(this.game, 195, 200, Images.vsTournament);
            vs.scale.set(0.8, 0.8);
            this.group.addChild(vs);
        };
        Tournament.prototype.createIcons = function () {
            var _this = this;
            /* Icons */
            var icon;
            var position = [
                [25, 415, Icon.LEFT], [110, 415, Icon.LEFT], [195, 415, Icon.LEFT], [280, 415, Icon.LEFT],
                [440, 415, Icon.RIGHT], [525, 415, Icon.RIGHT], [610, 415, Icon.RIGHT], [695, 415, Icon.RIGHT],
                [45, 455, Icon.LEFT], [130, 455, Icon.LEFT], [215, 455, Icon.LEFT],
                [505, 455, Icon.RIGHT], [590, 455, Icon.RIGHT], [675, 455, Icon.RIGHT],
                [65, 495, Icon.LEFT], [150, 495, Icon.LEFT],
                [570, 495, Icon.RIGHT], [655, 495, Icon.RIGHT],
                [85, 535, Icon.LEFT],
                [635, 535, Icon.RIGHT]
            ];
            this.icons = [];
            var i = 0;
            GameData.Data.tournamentListIds.forEach(function (index) {
                icon = new Icon(_this.game, _this.group, i, index, position[i][0], position[i][1], position[i][2]);
                _this.icons.push(icon);
                i++;
            });
        };
        Tournament.prototype.createButtons = function () {
            this.buttonBack = new ButtonComix(this.game, this.group, Constants.BUTTON_BACK, 'НАЗАД', 60, 10, 10);
            this.buttonBack.event.add(this.onButtonClick, this);
            this.buttonSettings = new ButtonComix(this.game, this.group, Constants.BUTTON_SETTINGS, 'НАСТРОЙКИ', 40, 600, 10);
            this.buttonSettings.event.add(this.onButtonClick, this);
            this.buttonStartBattle = new ButtonComix(this.game, this.group, Constants.BUTTON_START_BATTLE, 'НАЧАТЬ БОЙ', 35, 300, 530);
            this.buttonStartBattle.event.add(this.onButtonClick, this);
        };
        Tournament.prototype.createBorder = function () {
            var border = new Phaser.Sprite(this.game, 0, 0, Images.BorderImage);
            this.group.addChild(border);
        };
        Tournament.prototype.createComix = function () {
            var comix = new Comix(this.game, this.group);
        };
        Tournament.prototype.settingsCreate = function () {
            this.settings = new Settings(this.game, this.group);
            this.settings.event.add(this.onButtonClick, this);
        };
        Tournament.prototype.settingsClose = function () {
            this.settings.removeAll();
            this.group.removeChild(this.settings);
        };
        Tournament.prototype.onButtonClick = function (event) {
            switch (event.name) {
                case Constants.BUTTON_START_BATTLE:
                    {
                        this.game.state.start(StreetFighterCards.Level.Name, true, false);
                        break;
                    }
                case Constants.BUTTON_BACK:
                    {
                        this.game.state.start(StreetFighterCards.Menu.Name, true, false);
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
        };
        Tournament.Name = "tournament";
        return Tournament;
    }(Phaser.State));
    StreetFighterCards.Tournament = Tournament;
})(StreetFighterCards || (StreetFighterCards = {}));
var StreetFighterCards;
(function (StreetFighterCards) {
    var AnimationFighter = Fabrique.AnimationFighter;
    var ButtonComix = Fabrique.ButtonComix;
    var Settings = Fabrique.Settings;
    var Card = Fabrique.Card;
    var Level = (function (_super) {
        __extends(Level, _super);
        function Level() {
            _super.call(this);
            this.name = Level.Name;
        }
        Level.prototype.create = function () {
            this.group = new Phaser.Group(this.game, this.stage);
            this.boardGroup = new Phaser.Group(this.game, this.stage);
            GameData.Data.deckMix(GameData.Data.fighterIndex);
            GameData.Data.deckMix(GameData.Data.tournamentListIds[GameData.Data.progressIndex]);
            this.createBackground();
            this.createFighters();
            this.createButtons();
            this.createHand();
            this.createDeck();
            this.createBorder();
        };
        Level.prototype.shutdown = function () {
            this.buttonExit.shutdown();
            this.buttonSettings.shutdown();
            this.group.removeAll();
            this.playerDeck.forEach(function (card) {
                card.shutdown();
            });
            this.playerHand.forEach(function (card) {
                card.shutdown();
            });
            this.playerSlots.forEach(function (card) {
                card.shutdown();
            });
            this.game.stage.removeChildren();
        };
        Level.prototype.createBackground = function () {
            var opponentID = GameData.Data.tournamentListIds[GameData.Data.progressIndex];
            var levelTexture = GameData.Data.personages[opponentID].level;
            var background = new Phaser.Sprite(this.game, 0, 0, levelTexture);
            this.group.addChild(background);
        };
        Level.prototype.createHand = function () {
            var background = new Phaser.Sprite(this.game, 0, 375, Images.HandBackground);
            this.group.addChild(background);
        };
        Level.prototype.createFighters = function () {
            var playerPersonage = GameData.Data.personages[GameData.Data.fighterIndex];
            this.playerAnimation = new AnimationFighter(this.game, playerPersonage.name, playerPersonage.animStance);
            this.playerAnimation.x = 280;
            this.playerAnimation.y = 185;
            this.group.addChild(this.playerAnimation);
            var opponentPersonage = GameData.Data.personages[GameData.Data.tournamentListIds[GameData.Data.progressIndex]];
            this.opponentAnimation = new AnimationFighter(this.game, opponentPersonage.name, opponentPersonage.animStance);
            this.opponentAnimation.x = 480;
            this.opponentAnimation.y = 185;
            this.opponentAnimation.anchor.setTo(.5, .5);
            this.opponentAnimation.scale.x *= -1;
            this.group.addChild(this.opponentAnimation);
        };
        Level.prototype.createButtons = function () {
            this.buttonExit = new ButtonComix(this.game, this.group, Constants.BUTTON_EXIT_BATTLE, 'ВЫЙТИ ИЗ БОЯ', 27, 20, 310);
            this.buttonExit.event.add(this.onButtonClick, this);
            this.buttonSettings = new ButtonComix(this.game, this.group, Constants.BUTTON_SETTINGS, 'НАСТРОЙКИ', 40, 600, 310);
            this.buttonSettings.event.add(this.onButtonClick, this);
        };
        Level.prototype.createBorder = function () {
            var border = new Phaser.Sprite(this.game, 0, 0, Images.BorderLevel);
            this.group.addChild(border);
        };
        Level.prototype.createDeck = function () {
            var _this = this;
            this.group.inputEnableChildren = true; // enable drag and drop
            // PLAYER
            this.playerDeck = [];
            var playerName = GameData.Data.personages[GameData.Data.fighterIndex].name;
            GameData.Data.personages[GameData.Data.fighterIndex].deck.forEach(function (cardData) {
                _this.playerDeck.push(new Card(_this.game, _this.group, playerName, cardData));
                _this.playerDeck[_this.playerDeck.length - 1].x = 657;
                _this.playerDeck[_this.playerDeck.length - 1].y = 390;
                _this.playerDeck[_this.playerDeck.length - 1].cardSprite.events.onDragStart.add(_this.onDragStart, _this);
                _this.playerDeck[_this.playerDeck.length - 1].cardSprite.events.onDragStop.add(_this.onDragStop, _this);
            });
            this.playerHand = [];
            this.playerSlots = [];
            this.shirt = new Phaser.Sprite(this.game, 657, 390, Atlases.Cards, "card_back.png");
            this.group.addChild(this.shirt);
            // OPPONENT
            this.opponentDeck = [];
            var opponentName = GameData.Data.personages[GameData.Data.tournamentListIds[GameData.Data.progressIndex]].name;
            GameData.Data.personages[GameData.Data.tournamentListIds[GameData.Data.progressIndex]].deck.forEach(function (cardData) {
                _this.opponentDeck.push(new Card(_this.game, _this.group, opponentName, cardData));
                _this.opponentDeck[_this.opponentDeck.length - 1].x = 0;
                _this.opponentDeck[_this.opponentDeck.length - 1].y = 0;
            });
            this.opponentHand = [];
            this.opponentSlots = [];
            this.moveCardDeckToHand();
        };
        Level.prototype.onDragStart = function (sprite, pointer, x, y) {
            console.log("START: x=" + pointer.x + " y=" + pointer.y);
            this.boardGroup.addChild(sprite);
            this.group.removeChild(sprite);
        };
        Level.prototype.onDragStop = function (sprite, pointer) {
            console.log("STOP: x=" + pointer.x + " y=" + pointer.y);
            this.group.addChild(sprite);
            this.boardGroup.removeChild(sprite);
            sprite.inputEnabled = false;
        };
        Level.prototype.settingsCreate = function () {
            this.settings = new Settings(this.game, this.group);
            this.settings.event.add(this.onButtonClick, this);
        };
        Level.prototype.settingsClose = function () {
            this.settings.removeAll();
            this.group.removeChild(this.settings);
        };
        Level.prototype.onButtonClick = function (event) {
            switch (event.name) {
                case Constants.BUTTON_EXIT_BATTLE:
                    {
                        this.game.state.start(StreetFighterCards.Menu.Name, true, false);
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
        };
        Level.prototype.moveCardDeckToHand = function () {
            if (this.playerHand.length < 5) {
                this.playerHand.push(this.playerDeck.shift());
                this.playerHand[this.playerHand.length - 1].cardSprite.inputEnabled = true;
                this.playerHand[this.playerHand.length - 1].cardSprite.input.enableDrag(false, true);
                this.tween = this.game.add.tween(this.playerHand[this.playerHand.length - 1]);
                this.tween.onComplete.add(this.moveCardDeckToHand, this);
                this.tween.to({ x: 20 + (128 * (this.playerHand.length - 1)) }, 500, 'Linear');
                this.tween.start();
            }
        };
        Level.Name = "level";
        return Level;
    }(Phaser.State));
    StreetFighterCards.Level = Level;
})(StreetFighterCards || (StreetFighterCards = {}));
/// <reference path="..\node_modules\phaser-ce\typescript\phaser.d.ts" />
/// <reference path="Data\Constants.ts" />
/// <reference path="Data\Config.ts" />
/// <reference path="Data\Images.ts" />
/// <reference path="Data\Animations.ts" />
/// <reference path="Data\Atlases.ts" />
/// <reference path="Data\Sheets.ts" />
/// <reference path="Data\Decks.ts" />
/// <reference path="Data\GameData.ts" />
/// <reference path="Data\Utilits.ts" />
/// <reference path="Fabrique\Objects\Tutorial.ts" />
/// <reference path="Fabrique\Objects\Settings.ts" />
/// <reference path="Fabrique\Objects\ButtonOrange.ts" />
/// <reference path="Fabrique\Objects\ButtonComix.ts" />
/// <reference path="Fabrique\Objects\AnimationBigKen.ts" />
/// <reference path="Fabrique\Objects\AnimationBigRyu.ts" />
/// <reference path="Fabrique\Objects\AnimationFighter.ts" />
/// <reference path="Fabrique\Objects\FighterCard.ts" />
/// <reference path="Fabrique\Objects\Slides.ts" />
/// <reference path="Fabrique\Objects\Icon.ts" />
/// <reference path="Fabrique\Objects\Comix.ts" />
/// <reference path="Fabrique\Objects\Card.ts" />
/// <reference path="States\Boot.ts" />
/// <reference path="States\Preloader.ts" />
/// <reference path="States\Menu.ts" />
/// <reference path="States\ChoiceFighter.ts" />
/// <reference path="States\Tournament.ts" />
/// <reference path="States\Level.ts" />
/// <reference path="app.ts" /> 

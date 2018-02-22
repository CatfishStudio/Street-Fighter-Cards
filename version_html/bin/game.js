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
    Constants.BUTTON_SELECT = 'button_select';
    Constants.BUTTON_ARROW_LEFT = 'button_arrow_left';
    Constants.BUTTON_ARROW_RIGHT = 'button_arrow_right';
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
    Images.akumaBig = 'tournament/akuma.png';
    Images.alexBig = 'tournament/alex.png';
    Images.chunliBig = 'tournament/chun_li.png';
    Images.dudleyBig = 'tournament/dudley.png';
    Images.elenaBig = 'tournament/elena.png';
    Images.gillBig = 'tournament/gill.png';
    Images.hugoBig = 'tournament/hugo.png';
    Images.ibukiBig = 'tournament/ibuki.png';
    Images.kenBig = 'tournament/ken.png';
    Images.makotoBig = 'tournament/makoto.png';
    Images.necroBig = 'tournament/necro.png';
    Images.oroBig = 'tournament/oro.png';
    Images.qBig = 'tournament/q.png';
    Images.remyBig = 'tournament/remy.png';
    Images.ryuBig = 'tournament/ryu.png';
    Images.seanBig = 'tournament/sean.png';
    Images.twelveBig = 'tournament/twelve.png';
    Images.urienBig = 'tournament/urien.png';
    Images.yangBig = 'tournament/yang.png';
    Images.yunBig = 'tournament/yun.png';
    Images.akumaIcon = 'icons/akuma.png';
    Images.alexIcon = 'icons/alex.png';
    Images.chunliIcon = 'icons/chun_li.png';
    Images.dudleyIcon = 'icons/dudley.png';
    Images.elenaIcon = 'icons/elena.png';
    Images.gillIcon = 'icons/gill.png';
    Images.hugoIcon = 'icons/hugo.png';
    Images.ibukiIcon = 'icons/ibuki.png';
    Images.kenIcon = 'icons/ken.png';
    Images.makotoIcon = 'icons/makoto.png';
    Images.necroIcon = 'icons/necro.png';
    Images.oroIcon = 'icons/oro.png';
    Images.qIcon = 'icons/q.png';
    Images.remyIcon = 'icons/remy.png';
    Images.ryuIcon = 'icons/ryu.png';
    Images.seanIcon = 'icons/sean.png';
    Images.twelveIcon = 'icons/twelve.png';
    Images.urienIcon = 'icons/urien.png';
    Images.yangIcon = 'icons/yang.png';
    Images.yunIcon = 'icons/yun.png';
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
        Images.akumaBig,
        Images.alexBig,
        Images.chunliBig,
        Images.dudleyBig,
        Images.elenaBig,
        Images.gillBig,
        Images.hugoBig,
        Images.ibukiBig,
        Images.kenBig,
        Images.makotoBig,
        Images.necroBig,
        Images.oroBig,
        Images.qBig,
        Images.remyBig,
        Images.ryuBig,
        Images.seanBig,
        Images.twelveBig,
        Images.urienBig,
        Images.yangBig,
        Images.yunBig,
        Images.akumaIcon,
        Images.alexIcon,
        Images.chunliIcon,
        Images.dudleyIcon,
        Images.elenaIcon,
        Images.gillIcon,
        Images.hugoIcon,
        Images.ibukiIcon,
        Images.kenIcon,
        Images.makotoIcon,
        Images.necroIcon,
        Images.oroIcon,
        Images.qIcon,
        Images.remyIcon,
        Images.ryuIcon,
        Images.seanIcon,
        Images.twelveIcon,
        Images.urienIcon,
        Images.yangIcon,
        Images.yunIcon,
    ];
    return Images;
}());
var Atlases = (function () {
    function Atlases() {
    }
    Atlases.BigKen = 'BigKen';
    Atlases.BigRyu = 'BigRyu';
    Atlases.BigCards = 'BigCards';
    Atlases.preloadList = [
        Atlases.BigKen,
        Atlases.BigRyu,
        Atlases.BigCards,
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
            GameData.Data.personages = [];
            var personage;
            var card;
            var deck;
            var i = 0;
            Decks.preloadList.forEach(function (value) {
                personage = {};
                personage.id = game.cache.getJSON(value).id;
                personage.name = game.cache.getJSON(value).name;
                personage.attack = 0;
                personage.defense = 0;
                personage.energy = game.cache.getJSON(value).energy;
                personage.life = 0;
                personage.deck = [];
                deck = game.cache.getJSON(value).deck;
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
                GameData.Data.personages.push(personage);
                console.log(GameData.Data.personages[i]);
                i++;
            });
        };
        Data.initTournament = function () {
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
        Data.fighters = [
            [0, 'Akuma', 'akuma_card.png', Images.akumaBig, Images.akumaIcon],
            [1, 'Alex', 'alex_card.png', Images.alexBig, Images.alexIcon],
            [2, 'Chun Li', 'chun_li_card.png', Images.chunliBig, Images.chunliIcon],
            [3, 'Dudley', 'dudley_card.png', Images.dudleyBig, Images.dudleyIcon],
            [4, 'Elena', 'elena_card.png', Images.elenaBig, Images.elenaIcon],
            [5, 'Gill', 'gill_card.png', Images.gillBig, Images.gillBig],
            [6, 'Hugo', 'hugo_card.png', Images.hugoBig, Images.hugoIcon],
            [7, 'Ibuki', 'ibuki_card.png', Images.ibukiBig, Images.ibukiIcon],
            [8, 'Ken', 'ken_card.png', Images.kenBig, Images.kenIcon],
            [9, 'Makoto', 'makoto_card.png', Images.makotoBig, Images.makotoIcon],
            [10, 'Necro', 'necro_card.png', Images.necroBig, Images.necroIcon],
            [11, 'Oro', 'oro_card.png', Images.oroBig, Images.oroIcon],
            [12, 'Q', 'q_card.png', Images.qBig, Images.qIcon],
            [13, 'Remy', 'remy_card.png', Images.remyBig, Images.remyBig],
            [14, 'Ryu', 'ryu_card.png', Images.ryuBig, Images.ryuIcon],
            [15, 'Sean', 'sean_card.png', Images.seanBig, Images.seanIcon],
            [16, 'Twelve', 'twelve_card.png', Images.twelveBig, Images.twelveIcon],
            [17, 'Urien', 'urien_card.png', Images.urienBig, Images.urienIcon],
            [18, 'Yang', 'yang_card.png', Images.yangBig, Images.yangIcon],
            [19, 'Yun', 'yun_card.png', Images.yunBig, Images.yunIcon]
        ];
        Data.fighterIndex = 0;
        Data.progressIndex = 0;
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
            this.addChild(button);
            var textBack = new Phaser.Text(this.game, textX - 1, 14, text, { font: "bold 16px Arial", fill: "#FFFFFF" });
            this.addChild(textBack);
            var textFront = new Phaser.Text(this.game, textX, 15, text, { font: "bold 16px Arial", fill: "#9B372C" });
            this.addChild(textFront);
        };
        ButtonOrange.prototype.onButtonClick = function (event) {
            this.event.dispatch(event);
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
            this.textButton = new Phaser.Text(this.game, textX, 20, text, { font: "bold 16px Arial", fill: "#666666" });
            this.addChild(this.textButton);
        };
        ButtonComix.prototype.onButtonClick = function (event) {
            this.event.dispatch(event);
        };
        ButtonComix.prototype.onButtonInputOut = function (event) {
            this.textButton.fill = "#666666";
        };
        ButtonComix.prototype.onButtonInputOver = function (event) {
            this.textButton.fill = "#9E32EC";
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
        function Icon(game, parent, fighterIndex, x, y) {
            _super.call(this, game, parent);
            this.init(fighterIndex, x, y);
        }
        Icon.prototype.shutdown = function () {
            this.removeAll();
        };
        Icon.prototype.init = function (index, x, y) {
            this.x = x;
            this.y = y;
            var polygonLeft = new Phaser.Polygon([
                new Phaser.Point(0, 0),
                new Phaser.Point(85, 0),
                new Phaser.Point(105, 40),
                new Phaser.Point(20, 40),
                new Phaser.Point(0, 0)
            ]);
            var background = new Phaser.Graphics(this.game, 0, 0);
            background.beginFill(0xFFFFFF, 0.95);
            background.lineStyle(2, 0x07111D, 0.95);
            background.drawPolygon(polygonLeft);
            background.endFill();
            this.addChild(background);
            var polygonMask = new Phaser.Polygon([
                new Phaser.Point(x + 2, y + 2),
                new Phaser.Point(x + 84, y + 2),
                new Phaser.Point(x + 103, y + 38),
                new Phaser.Point(x + 22, y + 38),
                new Phaser.Point(x + 2, y + 2)
            ]);
            var iconMask = new Phaser.Graphics(this.game, 0, 0);
            iconMask.beginFill(0xFFFFFF);
            iconMask.drawPolygon(polygonMask);
            iconMask.endFill();
            var iconSprite = new Phaser.Sprite(this.game, 0, 0, GameData.Data.fighters[index][4]);
            iconSprite.mask = iconMask;
            this.addChild(iconSprite);
            //let border: Phaser.Graphics = new Phaser.Graphics(this.game, 0, 0);
        };
        return Icon;
    }(Phaser.Group));
    Fabrique.Icon = Icon;
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
                        GameData.Data.initPersonages(this.game);
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
            this.buttonBack = new ButtonComix(this.game, this.groupWindow, Constants.BUTTON_BACK, 'НАЗАД', 55, 10, 10);
            this.buttonBack.event.add(this.onButtonClick, this);
            this.buttonSettings = new ButtonComix(this.game, this.groupWindow, Constants.BUTTON_SETTINGS, 'НАСТРОЙКИ', 35, 300, 530);
            this.buttonSettings.event.add(this.onButtonClick, this);
            this.buttonSelect = new ButtonComix(this.game, this.groupWindow, Constants.BUTTON_SELECT, 'ВЫБРАТЬ', 50, 600, 530);
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
    var Tournament = (function (_super) {
        __extends(Tournament, _super);
        function Tournament() {
            _super.call(this);
            this.name = Tournament.Name;
        }
        Tournament.prototype.create = function () {
            this.group = new Phaser.Group(this.game, this.stage);
            /* Background */
            var background = new Phaser.Sprite(this.game, 0, 0, Images.BackgroundTournament);
            this.group.addChild(background);
            /* Player */
            var player = new Phaser.Sprite(this.game, 200, 300, GameData.Data.fighters[GameData.Data.fighterIndex][3]);
            player.anchor.setTo(.5, .5);
            player.scale.x *= -1;
            //this.player.scale.y *= -1;
            this.group.addChild(player);
            /* Opponent */
            var opponentId = GameData.Data.tournamentListIds[GameData.Data.progressIndex];
            var opponent = new Phaser.Sprite(this.game, 400, 0, GameData.Data.fighters[opponentId][3]);
            this.group.addChild(opponent);
            /* VS */
            var vs = new Phaser.Sprite(this.game, 150, 200, Images.vsTournament);
            this.group.addChild(vs);
            /* Icons */
            this.icon = new Icon(this.game, this.group, 0, 25, 425);
            /* Border */
            var border = new Phaser.Sprite(this.game, 0, 0, Images.BorderImage);
            this.group.addChild(border);
        };
        Tournament.prototype.shutdown = function () {
            this.icon.shutdown();
            this.group.removeAll();
        };
        Tournament.Name = "tournament";
        return Tournament;
    }(Phaser.State));
    StreetFighterCards.Tournament = Tournament;
})(StreetFighterCards || (StreetFighterCards = {}));
/// <reference path="..\node_modules\phaser-ce\typescript\phaser.d.ts" />
/// <reference path="Data\Constants.ts" />
/// <reference path="Data\Config.ts" />
/// <reference path="Data\Images.ts" />
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
/// <reference path="Fabrique\Objects\FighterCard.ts" />
/// <reference path="Fabrique\Objects\Slides.ts" />
/// <reference path="Fabrique\Objects\Icon.ts" />
/// <reference path="States\Boot.ts" />
/// <reference path="States\Preloader.ts" />
/// <reference path="States\Menu.ts" />
/// <reference path="States\ChoiceFighter.ts" />
/// <reference path="States\Tournament.ts" />
/// <reference path="app.ts" /> 

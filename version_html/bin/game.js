var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MortalKombatCards;
(function (MortalKombatCards) {
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
            this.state.add(MortalKombatCards.Boot.Name, MortalKombatCards.Boot, false);
            this.state.add(MortalKombatCards.Preloader.Name, MortalKombatCards.Preloader, false);
            this.state.add(MortalKombatCards.Menu.Name, MortalKombatCards.Menu, false);
        }
        Game.getInstance = function () {
            if (MortalKombatCards.Game.instance === null) {
                Game.instance = new Game();
            }
            return Game.instance;
        };
        Game.prototype.start = function () {
            this.state.start(MortalKombatCards.Boot.Name);
        };
        Game.instance = null;
        return Game;
    }(Phaser.Game));
    MortalKombatCards.Game = Game;
})(MortalKombatCards || (MortalKombatCards = {}));
var Constants = (function () {
    function Constants() {
    }
    Constants.GAME_WIDTH = 800;
    Constants.GAME_HEIGHT = 600;
    return Constants;
}());
var Config = (function () {
    function Config() {
    }
    Config.settintSound = true;
    Config.settintMusic = true;
    Config.settintTutorial = true;
    return Config;
}());
var Images = (function () {
    function Images() {
    }
    Images.PreloaderImage = 'preloader.png';
    Images.MenuImage = 'menu.png';
    Images.preloadList = [
        Images.MenuImage,
    ];
    return Images;
}());
var Atlases = (function () {
    function Atlases() {
    }
    /*public static Video1: string = 'video1';*/
    Atlases.preloadList = [];
    return Atlases;
}());
var Sheet = (function () {
    function Sheet() {
    }
    Sheet.ButtonStyle1 = 'button_style_1_sheet.png';
    Sheet.preloadList = [
        Sheet.ButtonStyle1,
    ];
    return Sheet;
}());
var Fabrique;
(function (Fabrique) {
    var Tutorial = (function (_super) {
        __extends(Tutorial, _super);
        function Tutorial(game, text) {
            _super.call(this, game, 0, 0, Atlases.VideoHelp, 0);
            this.text = text;
            this.init();
        }
        Tutorial.prototype.init = function () {
            var graphics = this.game.add.graphics(0, 0);
            graphics.beginFill(0x000000, 0);
            graphics.lineStyle(10, 0x000000, 1);
            graphics.drawRect(0, 0, 400, 116);
            graphics.endFill();
            graphics.beginFill(0x000000, 0.6);
            graphics.lineStyle(1, 0x000000, 1);
            graphics.drawRect(150, 0, 250, 116);
            graphics.endFill();
            graphics.beginFill(0x000000, 0.5);
            graphics.lineStyle(2, 0xFFFFFF, 0.5);
            graphics.drawRect(0, 0, 400, 116);
            graphics.endFill();
            this.addChild(graphics);
            var messageText = this.game.add.text(175, 10, this.text, { font: "18px Georgia", fill: "#FFFFFF", align: "left" });
            this.addChild(messageText);
            var anim = this.animations.add(Atlases.VideoHelp);
            anim.onComplete.add(this.onCompleteVideo, this);
            anim.play(10, true, false);
        };
        Tutorial.prototype.onCompleteVideo = function () {
        };
        Tutorial.prototype.show = function (x, y) {
            var tween = this.game.add.tween(this);
            tween.to({ x: x, y: y }, 500, 'Linear');
            tween.start();
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
            /* bacground and border */
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
            graphicOverlay.beginFill(0x000000, 0.8);
            graphicOverlay.lineStyle(2, 0x777777, 1);
            graphicOverlay.drawPolygon(polygon);
            graphicOverlay.endFill();
            graphicOverlay.inputEnabled = true;
            this.addChild(graphicOverlay);
            /* title */
            var title = new Phaser.Text(this.game, startX + 35, startY + 5, "НАСТРОЙКИ ИГРЫ", { font: "24px Georgia", fill: "#FFFFFF", align: "left" });
            this.addChild(title);
            /* sound */
            var buttonSound;
            if (Config.settintSound === true)
                buttonSound = new Phaser.Button(this.game, startX + 25, startY + 50, Images.ButtonOn, this.onButtonClick, this);
            else
                buttonSound = new Phaser.Button(this.game, startX + 25, startY + 50, Images.ButtonOff, this.onButtonClick, this);
            buttonSound.name = 'sound';
            this.addChild(buttonSound);
            var labelSound = new Phaser.Text(this.game, startX + 90, startY + 55, "Звук", { font: "18px Georgia", fill: "#FFFFFF", align: "left" });
            this.addChild(labelSound);
            /* music */
            var buttonMusic;
            if (Config.settintMusic === true)
                buttonMusic = new Phaser.Button(this.game, startX + 155, startY + 50, Images.ButtonOn, this.onButtonClick, this);
            else
                buttonMusic = new Phaser.Button(this.game, startX + 155, startY + 50, Images.ButtonOff, this.onButtonClick, this);
            buttonMusic.name = 'music';
            this.addChild(buttonMusic);
            var labelMusic = new Phaser.Text(this.game, startX + 220, startY + 55, "Музыка", { font: "18px Georgia", fill: "#FFFFFF", align: "left" });
            this.addChild(labelMusic);
            /* tutorial */
            var buttonTutorial;
            if (Config.settintTutorial === true)
                buttonTutorial = new Phaser.Button(this.game, startX + 25, startY + 100, Images.ButtonOn, this.onButtonClick, this);
            else
                buttonTutorial = new Phaser.Button(this.game, startX + 25, startY + 100, Images.ButtonOff, this.onButtonClick, this);
            buttonTutorial.name = 'tutorial';
            this.addChild(buttonTutorial);
            var labelTutorial = new Phaser.Text(this.game, startX + 90, startY + 105, "Обучение в игре", { font: "18px Georgia", fill: "#FFFFFF", align: "left" });
            this.addChild(labelTutorial);
            /* button close */
            var buttonClose = new Phaser.Button(this.game, startX + 25, startY + 150, Sheet.ButtonClose, this.onButtonCloseClick, this, 1, 2);
            buttonClose.name = 'setting_close';
            this.addChild(buttonClose);
            this.updateTransform();
        };
        Settings.prototype.onButtonCloseClick = function (event) {
            this.event.dispatch(event);
        };
        Settings.prototype.onButtonClick = function (event) {
            switch (event.name) {
                case 'sound':
                    {
                        if (Config.settintSound === true) {
                            Config.settintSound = false;
                            this.removeChild(event);
                            event = new Phaser.Button(this.game, event.x, event.y, Images.ButtonOff, this.onButtonClick, this);
                            event.name = 'sound';
                            this.addChild(event);
                        }
                        else {
                            Config.settintSound = true;
                            this.removeChild(event);
                            event = new Phaser.Button(this.game, event.x, event.y, Images.ButtonOn, this.onButtonClick, this);
                            event.name = 'sound';
                            this.addChild(event);
                        }
                        break;
                    }
                case 'music':
                    {
                        if (Config.settintMusic === true) {
                            Config.settintMusic = false;
                            this.removeChild(event);
                            event = new Phaser.Button(this.game, event.x, event.y, Images.ButtonOff, this.onButtonClick, this);
                            event.name = 'music';
                            this.addChild(event);
                        }
                        else {
                            Config.settintMusic = true;
                            this.removeChild(event);
                            event = new Phaser.Button(this.game, event.x, event.y, Images.ButtonOn, this.onButtonClick, this);
                            event.name = 'music';
                            this.addChild(event);
                        }
                        break;
                    }
                case 'tutorial':
                    {
                        if (Config.settintTutorial === true) {
                            Config.settintTutorial = false;
                            this.removeChild(event);
                            event = new Phaser.Button(this.game, event.x, event.y, Images.ButtonOff, this.onButtonClick, this);
                            event.name = 'tutorial';
                            this.addChild(event);
                        }
                        else {
                            Config.settintTutorial = true;
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
var MortalKombatCards;
(function (MortalKombatCards) {
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
            this.game.state.start(MortalKombatCards.Preloader.Name, true, false, {
                nextStage: MortalKombatCards.Menu.Name,
                preloadHandler: function () {
                    Images.preloadList.forEach(function (assetName) {
                        _this.game.load.image(assetName, 'assets/images/' + assetName);
                    });
                    Atlases.preloadList.forEach(function (assetName) {
                        _this.game.load.atlas(assetName, 'assets/atlas/' + assetName + '.png', 'assets/atlas/' + assetName + '.json');
                    });
                    Sheet.preloadList.forEach(function (assetName) {
                        _this.game.load.spritesheet(assetName, 'assets/images/' + assetName, 186, 46);
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
    MortalKombatCards.Boot = Boot;
})(MortalKombatCards || (MortalKombatCards = {}));
var MortalKombatCards;
(function (MortalKombatCards) {
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
    MortalKombatCards.Preloader = Preloader;
})(MortalKombatCards || (MortalKombatCards = {}));
var MortalKombatCards;
(function (MortalKombatCards) {
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
            this.createButtons();
        };
        Menu.prototype.shutdown = function () {
            this.groupMenu.removeAll();
            this.game.stage.removeChildren();
        };
        Menu.prototype.createButtons = function () {
            this.groupButtons = new Phaser.Group(this.game, this.groupMenu);
            this.groupButtons.x = 300;
            this.groupButtons.y = 300;
            var buttonStart = new Phaser.Button(this.game, 0, 0, Sheet.ButtonStyle1, this.onButtonClick, this, 1, 2);
            buttonStart.name = 'start';
            this.groupButtons.addChild(buttonStart);
        };
        Menu.prototype.onButtonClick = function (event) {
            switch (event.name) {
                case 'start':
                    {
                        //this.game.state.start(Store.Name, true, false);
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
        };
        Menu.Name = "menu";
        return Menu;
    }(Phaser.State));
    MortalKombatCards.Menu = Menu;
})(MortalKombatCards || (MortalKombatCards = {}));
/// <reference path="..\node_modules\phaser-ce\typescript\phaser.d.ts" />
/// <reference path="Data\Constants.ts" />
/// <reference path="Data\Config.ts" />
/// <reference path="Data\Images.ts" />
/// <reference path="Data\Atlases.ts" />
/// <reference path="Data\Sheets.ts" />
/// <reference path="Data\Game.ts" />
/// <reference path="Fabrique\State.ts" />
/// <reference path="Fabrique\Objects\Tutorial.ts" />
/// <reference path="Fabrique\Objects\Settings.ts" />
/// <reference path="Fabrique\Objects\Title.ts" />
/// <reference path="Fabrique\Objects\FighterCard.ts" />
/// <reference path="States\Boot.ts" />
/// <reference path="States\Preloader.ts" />
/// <reference path="States\Menu.ts" />
/// <reference path="app.ts" /> 

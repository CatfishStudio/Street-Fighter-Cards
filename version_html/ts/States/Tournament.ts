module StreetFighterCards {
    import Icon = Fabrique.Icon;
    import ButtonComix = Fabrique.ButtonComix;
    import Tutorial = Fabrique.Tutorial;
    import Settings = Fabrique.Settings;
    import Comix = Fabrique.Comix;

    export class Tournament extends Phaser.State {

        public static Name: string = "tournament";
        public name: string = Tournament.Name;

        private icons: Icon[];
        private buttonInvate: ButtonComix;
        private buttonBack: ButtonComix;
        private buttonSettings: ButtonComix;
        private buttonStartBattle: ButtonComix;
        private tutorial: Tutorial;
        private settings: Settings;

        private group: Phaser.Group;

        constructor() {
            super();
        }

        public create(): void {
            this.group = new Phaser.Group(this.game, this.stage);

            if (GameData.Data.progressIndex === 18) GameData.Data.progressIndex++;

            if (GameData.Data.progressIndex < 20) {
                this.createBackground();
                this.createVSPlayers();
                this.createIcons();
                this.createButtons();
                this.createTutorial();
                this.createBorder();
            }
            this.createComix();
            this.playMusic();

            SocialVK.vkSaveData();
        }

        public shutdown(): void {
            this.icons.forEach(icon => {
                icon.shutdown();
            });
            this.buttonBack.shutdown();
            this.buttonStartBattle.shutdown();
            this.buttonSettings.shutdown();
            this.buttonInvate.shutdown();
            if (this.tutorial !== null && this.tutorial !== undefined) this.tutorial.shutdown();
            this.group.removeAll();
            this.game.stage.removeChildren();
        }

        private createBackground(): void {
            let background: Phaser.Sprite = new Phaser.Sprite(this.game, 0, 0, Images.BackgroundTournament)
            this.group.addChild(background);
        }

        private createVSPlayers(): void {
            /* Player */
            let player: Phaser.Sprite = new Phaser.Sprite(this.game, 200, 300, GameData.Data.fighters[GameData.Data.fighterIndex][3]);
            player.anchor.setTo(.5, .5);
            player.scale.x *= -1;
            //this.player.scale.y *= -1;
            this.group.addChild(player);

            let playerName: Phaser.Text = this.game.add.text(35, 350, GameData.Data.personages[GameData.Data.fighterIndex].name, { font: "54px Georgia", fill: "#FFFFFF", align: "left" });
            playerName.setShadow(-5, 5, 'rgba(0,0,0,0.5)', 0);
            this.group.addChild(playerName);

            /* Opponent */
            let opponentId: number = GameData.Data.tournamentListIds[GameData.Data.progressIndex];
            let opponent: Phaser.Sprite = new Phaser.Sprite(this.game, 400, 0, GameData.Data.fighters[opponentId][3]);
            this.group.addChild(opponent);

            let opponentName: Phaser.Text = this.game.add.text(575, 350, GameData.Data.personages[opponentId].name, { font: "54px Georgia", fill: "#FFFFFF", align: "left" });
            opponentName.setShadow(5, 5, 'rgba(0,0,0,0.5)', 0);
            this.group.addChild(opponentName);

            /* VS */
            let vs: Phaser.Sprite = new Phaser.Sprite(this.game, 195, 200, Images.vsTournament);
            vs.scale.set(0.8, 0.8);
            this.group.addChild(vs);
        }

        private createIcons(): void {
            /* Icons */
            let icon: Icon;
            let position: any[][] = [
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
            let i: number = 0;
            GameData.Data.tournamentListIds.forEach(index => {
                icon = new Icon(this.game, this.group, i, index, position[i][0], position[i][1], position[i][2]);
                this.icons.push(icon);
                i++;
            });
        }

        private createButtons(): void {
            this.buttonBack = new ButtonComix(this.game, this.group, Constants.BUTTON_BACK, 'НАЗАД В МЕНЮ', 28, 10, 10);
            this.buttonBack.event.add(this.onButtonClick, this);

            this.buttonInvate = new ButtonComix(this.game, this.group, Constants.BUTTON_INVATE, 'ПРИГЛАСИТЬ', 37, 315, 10);
            this.buttonInvate.event.add(this.onButtonClick, this);

            this.buttonSettings = new ButtonComix(this.game, this.group, Constants.BUTTON_SETTINGS, 'НАСТРОЙКИ', 40, 600, 10);
            this.buttonSettings.event.add(this.onButtonClick, this);

            this.buttonStartBattle = new ButtonComix(this.game, this.group, Constants.BUTTON_START_BATTLE, 'НАЧАТЬ БОЙ', 35, 315, 530);
            this.buttonStartBattle.event.add(this.onButtonClick, this);
        }

        private createTutorial(): void {
            if (Config.settingTutorial === true && GameData.Data.progressIndex === 0) {
                this.tutorial = new Tutorial(this.game, GameData.Data.tutorList[1], Tutorial.RIGHT);
                this.group.addChild(this.tutorial);
            }
        }

        private createBorder(): void {
            let border: Phaser.Sprite = new Phaser.Sprite(this.game, 0, 0, Images.BorderImage);
            this.group.addChild(border);
        }

        private createComix(): void {
            let comix: Comix = new Comix(this.game, this.group);
            comix.event.add(this.onGameOver, this);
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
            this.playButtonSound();
            switch (event.name) {
                case Constants.BUTTON_START_BATTLE:
                    {
                        this.game.state.start(Level.Name, true, false);
                        break;
                    }
                case Constants.BUTTON_BACK:
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
                case Constants.BUTTON_INVATE:
                    {
                        SocialVK.vkInvite();
                        break;
                    }
                default:
                    break;
            }
        }

        private playMusic(): void {
            GameData.Data.music.stop();
            GameData.Data.music.key = GameData.Data.musicList[1][0];
            GameData.Data.music.loop = true;
            GameData.Data.music.volume = GameData.Data.musicList[1][1];
            if (Config.settingMusic) {
                GameData.Data.music.play();
            }
        }

        private playButtonSound(): void {
            if (Config.settingSound) {
                GameData.Data.buttonSound.loop = false;
                GameData.Data.buttonSound.volume = 0.5;
                GameData.Data.buttonSound.play();
            }
        }

        private onGameOver(event) {
            Utilits.Data.debugLog('GAME:', 'OVER');
            if (event === Constants.GAME_OVER) {
                this.game.state.start(Menu.Name, true, false);
            }
        }

    }
}
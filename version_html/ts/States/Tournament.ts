module StreetFighterCards {
    import Icon = Fabrique.Icon;
    import ButtonComix = Fabrique.ButtonComix;

    export class Tournament extends Phaser.State{

        public static Name: string = "tournament";
        public name: string = Tournament.Name;

        private icons: Icon[];
        private buttonBack: ButtonComix;
        private buttonSettings: ButtonComix;
        private buttonStartBattle: ButtonComix;

        private group: Phaser.Group;

        constructor() {
            super();
        }

        public create():void {
            this.group = new Phaser.Group(this.game, this.stage);
            
            this.createBackground();
            this.createVSPlayers();
            this.createIcons();
            this.createButtons();          
            this.createBorder();
        }

        public shutdown():void {
            this.icons.forEach(icon => {
                icon.shutdown();
            });
            this.buttonBack.shutdown();
            this.buttonStartBattle.shutdown();
            this.buttonSettings.shutdown();
            this.group.removeAll();
        }

        private createBackground():void {
            let background: Phaser.Sprite = new Phaser.Sprite(this.game, 0, 0, Images.BackgroundTournament)
            this.group.addChild(background);
        }

        private createVSPlayers():void {
            /* Player */
            let player: Phaser.Sprite = new Phaser.Sprite(this.game, 200, 300, GameData.Data.fighters[GameData.Data.fighterIndex][3]);
            player.anchor.setTo(.5,.5);
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

        private createIcons():void {
            /* Icons */
            let icon: Icon;
            let position:any[][] = [
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
            let i:number = 0;
            GameData.Data.tournamentListIds.forEach(index => {
                icon = new Icon(this.game, this.group, i, index, position[i][0], position[i][1], position[i][2]);
                this.icons.push(icon);
                i++;
            });
        }

        private createButtons():void {
            this.buttonStartBattle = new ButtonComix(this.game, this.group, Constants.BUTTON_START_BATTLE, 'НАЧАТЬ БИТВУ', 30, 300, 530);
            this.buttonStartBattle.event.add(this.onButtonClick, this);
        }

        private createBorder():void {
            let border: Phaser.Sprite = new Phaser.Sprite(this.game, 0, 0, Images.BorderImage);
            this.group.addChild(border);
        }

        private onButtonClick(event) {
            switch (event.name) {
                case Constants.BUTTON_START_BATTLE:
                    {
                        //this.game.state.start(Tournament.Name, true, false);
                        break;
                    }
                         
                default:
                    break;
            }
        }

    }
}
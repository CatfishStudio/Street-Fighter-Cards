module StreetFighterCards {
    import Icon = Fabrique.Icon;

    export class Tournament extends Phaser.State{

        public static Name: string = "tournament";
        public name: string = Tournament.Name;

        private icons: Icon[];

        private group: Phaser.Group;

        constructor() {
            super();
        }

        public create():void {
            this.group = new Phaser.Group(this.game, this.stage);
            
            /* Background */
            let background: Phaser.Sprite = new Phaser.Sprite(this.game, 0, 0, Images.BackgroundTournament)
            this.group.addChild(background);

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
          
            //let messageText: Phaser.Text = this.game.add.text(5, 5, this.text, { font: "18px Georgia", fill: "#000000", align: "left" });
            

            /* Border */
            let border: Phaser.Sprite = new Phaser.Sprite(this.game, 0, 0, Images.BorderImage);
            this.group.addChild(border);
        }

        public shutdown():void {
            this.icons.forEach(icon => {
                icon.shutdown();
            });
            this.group.removeAll();
        }

    }
}
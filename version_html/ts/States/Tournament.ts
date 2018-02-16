module StreetFighterCards {
    import Icon = Fabrique.Icon;

    export class Tournament extends Phaser.State{

        public static Name: string = "tournament";
        public name: string = Tournament.Name;

        private icon: Icon;

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

            /* Opponent */
            let opponent: Phaser.Sprite = new Phaser.Sprite(this.game, 400, 0, GameData.Data.fighters[GameData.Data.fighterIndex][3]);
            this.group.addChild(opponent);

            /* VS */
            let vs: Phaser.Sprite = new Phaser.Sprite(this.game, 150, 200, Images.vsTournament);
            this.group.addChild(vs);

            /* Icons */
            this.icon = new Icon(this.game, this.group, 0, 25, 425);

            /* Border */
            let border: Phaser.Sprite = new Phaser.Sprite(this.game, 0, 0, Images.BorderImage);
            this.group.addChild(border);
        }

        public shutdown():void {
            this.icon.shutdown();
            this.group.removeAll();
        }

    }
}
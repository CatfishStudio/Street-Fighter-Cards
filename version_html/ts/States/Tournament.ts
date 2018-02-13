module StreetFighterCards {
    export class Tournament extends Phaser.State{

        public static Name: string = "tournament";
        public name: string = Tournament.Name;

        private background: Phaser.Sprite;
        private player: Phaser.Sprite;
        private opponent: Phaser.Sprite;
        private border: Phaser.Sprite;        

        private group: Phaser.Group;

        constructor() {
            super();
        }

        public create():void {
            this.group = new Phaser.Group(this.game, this.stage);
            
            this.background = new Phaser.Sprite(this.game, 0, 0, Images.BackgroundTournament)
            this.group.addChild(this.background);

            this.player = new Phaser.Sprite(this.game, 200, 300, GameData.Data.fighters[GameData.Data.fighterIndex][3]);
            this.player.anchor.setTo(.5,.5);
            this.player.scale.x *= -1;
            //this.player.scale.y *= -1;
            this.group.addChild(this.player);

            this.opponent = new Phaser.Sprite(this.game, 400, 0, GameData.Data.fighters[GameData.Data.fighterIndex][3]);
            this.group.addChild(this.opponent);

            this.border = new Phaser.Sprite(this.game, 0, 0, Images.BorderImage);
            this.group.addChild(this.border);
        }

        public shutdown():void {
            this.group.removeAll();
        }

    }
}
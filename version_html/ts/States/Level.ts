module StreetFighterCards {
    export class Level extends Phaser.State {
        public static Name: string = "level";
        public name: string = Level.Name;

        private group: Phaser.Group;

        constructor() {
            super();
        }

        public create():void {
            this.group = new Phaser.Group(this.game, this.stage);

            this.createBackground();
            this.createBorder();
        }

        public shutdown():void {
            this.group.removeAll();
            this.game.stage.removeChildren();
        }

        private createBackground():void {
            let opponentID: number = GameData.Data.tournamentListIds[GameData.Data.progressIndex];
            let levelTexture: string = GameData.Data.personages[opponentID].level;
            let background: Phaser.Sprite = new Phaser.Sprite(this.game, 0, 0, levelTexture);
            this.group.addChild(background);
        }

        private createBorder():void {
            let border: Phaser.Sprite = new Phaser.Sprite(this.game, 0, 0, Images.BorderImage);
            this.group.addChild(border);
        }


    }
}
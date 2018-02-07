module StreetFighterCards {
    export class Tournament extends Phaser.State{

        public static Name: string = "tournament";
        public name: string = Menu.Name;

        private background: Phaser.Sprite;
        private group: Phaser.Group;

        constructor() {
            super();
        }

        public create():void {
            this.group = new Phaser.Group(this.game, this.stage);
            
            this.background = new Phaser.Sprite(this.game, 0, 0, Images.BackgroundTournament)
            this.group.addChild(this.background);
        }

        public shutdown():void {
            this.group.removeAll();
        }

    }
}
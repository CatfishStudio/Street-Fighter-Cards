module StreetFighterCards {
    export class ChoiceFighter extends Phaser.State{

        public static Name: string = "choce_fighter";
        public name: string = Menu.Name;

        private groupWindow: Phaser.Group;
        private backgroundSprite:Phaser.Sprite;

        constructor() {
            super();
        }

        public create() {
            this.groupWindow = new Phaser.Group(this.game, this.stage);
            
            this.backgroundSprite = new Phaser.Sprite(this.game, 0, 0, Images.ChoiceImage)
            this.groupWindow.addChild(this.backgroundSprite);

        }

        public shutdown(){
            this.groupWindow.removeChildren();
            this.groupWindow.removeAll();
            this.game.stage.removeChildren();
        }
    }
}
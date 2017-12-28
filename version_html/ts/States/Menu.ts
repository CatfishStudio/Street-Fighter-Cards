module MortalKombatCards {

    import Tutorial = Fabrique.Tutorial;
    import Settings = Fabrique.Settings;

    export class Menu extends Phaser.State{
        public static Name: string = "menu";
        public name: string = Menu.Name;
        private menuSprite:Phaser.Sprite;
        private groupMenu: Phaser.Group;
        
        constructor() {
            super();
        }
        
        public create() {
            this.groupMenu = new Phaser.Group(this.game, this.stage);
            
            this.menuSprite = new Phaser.Sprite(this.game, 0, 0, Images.MenuImage)
            this.groupMenu.addChild(this.menuSprite);
            
            //this.createButtons();
        }

        public shutdown(){
            this.groupMenu.removeAll();
            this.game.stage.removeChildren();
        }
    }
}
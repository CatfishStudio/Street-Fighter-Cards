module Fabrique {

    export class FighterCard extends Phaser.Sprite {

        private dataFighter:Game.IFighter;
        private damageText:Phaser.Text;
        private defenseText:Phaser.Text;
        private energyText:Phaser.Text;
        private healthText:Phaser.Text;

        constructor(game:Phaser.Game, x:number, y:number, data:Game.IFighter){
            super(game, x, y, Atlases.FightersCards, data.frame);
            this.dataFighter = data;
            this.init();
        }

        private init():void{
            this.damageText = this.game.add.text(5, 240, "5%", { font: "18px Arial", fill: "#FFFFFF", align: "left" })
            this.addChild(this.damageText);
            this.defenseText = this.game.add.text(5, 45, "10%", { font: "18px Arial", fill: "#FFFFFF", align: "left" })
            this.addChild(this.defenseText);
        }



    }

}

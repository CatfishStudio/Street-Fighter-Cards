module Fabrique {

    export class FighterCard extends Phaser.Sprite {

        private dataFighter:Game.IFighter;
        private damageText:Phaser.Text;
        private defenseText:Phaser.Text;
        private energyText:Phaser.Text;
        private healthText:Phaser.Text;

        constructor(game:Phaser.Game, x:number, y:number, data:Game.IFighter){
            super(game, x, y, Atlases.BigCards, data.frame);
            this.dataFighter = data;
            this.init();
        }

        private init():void{
            this.defenseText = this.game.add.text(13, 13, "500", { font: "bold 18px Times New Roman", fill: "#FFFFFF", align: "left" })
            this.addChild(this.defenseText);
            this.healthText = this.game.add.text(150, 13, "200", { font: "bold 18px Times New Roman", fill: "#FFFFFF", align: "left" })
            this.addChild(this.healthText);

            this.damageText = this.game.add.text(11, 242, "300", { font: "bold 18px Times New Roman", fill: "#D83900", align: "left"})
            this.addChild(this.damageText);
            this.energyText = this.game.add.text(157, 242, "10", { font: "bold 18px Times New Roman", fill: "#0026FF", align: "left" })
            this.addChild(this.energyText);
            
        }



    }
}

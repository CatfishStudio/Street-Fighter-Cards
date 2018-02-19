module Fabrique {

    export class FighterCard extends Phaser.Sprite {

        private damageText:Phaser.Text;
        private defenseText:Phaser.Text;
        private energyText:Phaser.Text;
        private healthText:Phaser.Text;

        constructor(game:Phaser.Game, x:number, y:number, frame:string|number, index:number){
            super(game, x, y, Atlases.BigCards, frame);
            this.init(index);
        }

        private init(index:number):void{
            this.defenseText = this.game.add.text(13, 13, GameData.Data.personages[index].defense.toString(), { font: "bold 18px Times New Roman", fill: "#FFFFFF", align: "left" })
            this.addChild(this.defenseText);
            this.healthText = this.game.add.text(150, 13, GameData.Data.personages[index].life.toString(), { font: "bold 18px Times New Roman", fill: "#FFFFFF", align: "left" })
            this.addChild(this.healthText);

            this.damageText = this.game.add.text(11, 242, GameData.Data.personages[index].attack.toString(), { font: "bold 18px Times New Roman", fill: "#D83900", align: "left"})
            this.addChild(this.damageText);
            this.energyText = this.game.add.text(157, 242, GameData.Data.personages[index].energy.toString(), { font: "bold 18px Times New Roman", fill: "#0026FF", align: "left" })
            this.addChild(this.energyText);
        }
    }
}

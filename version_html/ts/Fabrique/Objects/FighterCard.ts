module Fabrique {

    export class FighterCard extends Phaser.Sprite {

        private damageText: Phaser.Text;
        private defenseText: Phaser.Text;
        private energyText: Phaser.Text;
        private healthText: Phaser.Text;

        constructor(game: Phaser.Game, x: number, y: number, frame: string | number, index: number) {
            super(game, x, y, Atlases.BigCards, frame);
            this.init(index);
        }

        private init(index: number): void {
            let defense: string = GameData.Data.personages[index].defense.toString();
            let health: string = GameData.Data.personages[index].life.toString();
            let damage: string = GameData.Data.personages[index].attack.toString();
            let energy: string = GameData.Data.personages[index].energy.toString();

            if(defense.length < 3){
                this.defenseText = this.game.add.text(17, 13, defense, { font: "bold 16px Times New Roman", fill: "#FFFFFF", align: "left" })
            }else{
                this.defenseText = this.game.add.text(13, 13, defense, { font: "bold 16px Times New Roman", fill: "#FFFFFF", align: "left" })
            }
            this.addChild(this.defenseText);
            this.healthText = this.game.add.text(152, 13, health, { font: "bold 16px Times New Roman", fill: "#FFFFFF", align: "left" })
            this.addChild(this.healthText);

            this.damageText = this.game.add.text(12, 243, damage, { font: "bold 16px Times New Roman", fill: "#E52D00", align: "left" })
            this.addChild(this.damageText);
            this.energyText = this.game.add.text(157, 243, energy, { font: "bold 16px Times New Roman", fill: "#0026FF", align: "left" })
            this.addChild(this.energyText);
        }
    }
}

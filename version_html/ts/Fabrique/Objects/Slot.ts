module Fabrique {
    export class Slot extends Phaser.Sprite {
        private backgroundColor:number;
        private borderColor:number;

        constructor(game: Phaser.Game, x: number, y: number, playerSlot:boolean, index:number){
            super(game, x, y);
            this.init(playerSlot, index);
        }

        public shutdown(): void {
            this.removeChildren();
        }

        private init(playerSlot:boolean, index:number):void {
            let text:Phaser.Text;
            if(playerSlot){
                this.backgroundColor = 0x266DA8;      // 0xC7D9E1; //
                this.borderColor = 0x266DA8;          // 0xC7D9E1; //
                this.createPlayerSlot();
                text = this.game.add.text(27, 13, index.toString(), { font: "bold 52px arial", fill: "#266DA8", align: "left" })
            }else{
                this.backgroundColor = 0xA32727;      // 0xC7D9E1; //
                this.borderColor = 0xA32727;          // 0xC7D9E1; //
                this.createOpponentSlot();
                text = this.game.add.text(27, 13, index.toString(), { font: "bold 52px arial", fill: "#A32727", align: "left" })
            } 
            this.addChild(text);
        }

        private createPlayerSlot():void {
            let graphics: Phaser.Graphics = new Phaser.Graphics(this.game, 0, 0);
            graphics.beginFill(this.backgroundColor, 0.5);
            graphics.lineStyle(5, this.borderColor, 0.8);
            graphics.drawRect(0, 0, 84, 84);
            graphics.endFill();

            graphics.beginFill(this.backgroundColor, 0.9);
            graphics.lineStyle(0, this.borderColor, 0.9);
            graphics.moveTo(-2,25);
            graphics.lineTo(-5,20);
            graphics.lineTo(-5,-5);
            graphics.lineTo(20,-5);
            graphics.lineTo(25,-2);
            graphics.lineTo(-2,-2);
            graphics.endFill();

            graphics.beginFill(this.backgroundColor, 0.9);
            graphics.lineStyle(0, this.borderColor, 0.9);
            graphics.moveTo(87,25);
            graphics.lineTo(90,30);
            graphics.lineTo(90,90);
            graphics.lineTo(69,90);
            graphics.lineTo(64,87);
            graphics.lineTo(87,87);
            graphics.endFill();
            this.addChild(graphics);
        }

        private createOpponentSlot():void {
            let graphics: Phaser.Graphics = new Phaser.Graphics(this.game, 0, 0);
            graphics.beginFill(this.backgroundColor, 0.5);
            graphics.lineStyle(5, this.borderColor, 0.8);
            graphics.drawRect(0, 0, 84, 84);
            graphics.endFill();

            graphics.beginFill(this.backgroundColor, 0.9);
            graphics.lineStyle(0, this.borderColor, 0.9);
            graphics.moveTo(86,25);
            graphics.lineTo(89,20);
            graphics.lineTo(89,-5);
            graphics.lineTo(64,-5);
            graphics.lineTo(59,-2);
            graphics.lineTo(86,-2);
            graphics.endFill();

            graphics.beginFill(this.backgroundColor, 0.9);
            graphics.lineStyle(0, this.borderColor, 0.9);
            graphics.moveTo(-2,25);
            graphics.lineTo(-5,30);
            graphics.lineTo(-5,90);
            graphics.lineTo(15,90);
            graphics.lineTo(20,87);
            graphics.lineTo(-2,87);
            graphics.endFill();
            this.addChild(graphics);
        }
    }
}
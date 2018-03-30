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
            let graphic: Phaser.Graphics = new Phaser.Graphics(this.game, 0, 0);
            graphic.beginFill(this.backgroundColor, 0.5);
            graphic.lineStyle(5, this.borderColor, 0.8);
            graphic.drawRect(0, 0, 84, 84);
            graphic.endFill();

            graphic.beginFill(this.backgroundColor, 0.9);
            graphic.lineStyle(0, this.borderColor, 0.9);
            graphic.moveTo(-2,25);
            graphic.lineTo(-5,20);
            graphic.lineTo(-5,-5);
            graphic.lineTo(20,-5);
            graphic.lineTo(25,-2);
            graphic.lineTo(-2,-2);
            graphic.endFill();

            graphic.beginFill(this.backgroundColor, 0.9);
            graphic.lineStyle(0, this.borderColor, 0.9);
            graphic.moveTo(87,25);
            graphic.lineTo(90,30);
            graphic.lineTo(90,90);
            graphic.lineTo(69,90);
            graphic.lineTo(64,87);
            graphic.lineTo(87,87);
            graphic.endFill();
            this.addChild(graphic);
        }

        private createOpponentSlot():void {
            let graphic: Phaser.Graphics = new Phaser.Graphics(this.game, 0, 0);
            graphic.beginFill(this.backgroundColor, 0.5);
            graphic.lineStyle(5, this.borderColor, 0.8);
            graphic.drawRect(0, 0, 84, 84);
            graphic.endFill();

            graphic.beginFill(this.backgroundColor, 0.9);
            graphic.lineStyle(0, this.borderColor, 0.9);
            graphic.moveTo(86,25);
            graphic.lineTo(89,20);
            graphic.lineTo(89,-5);
            graphic.lineTo(64,-5);
            graphic.lineTo(59,-2);
            graphic.lineTo(86,-2);
            graphic.endFill();

            graphic.beginFill(this.backgroundColor, 0.9);
            graphic.lineStyle(0, this.borderColor, 0.9);
            graphic.moveTo(-2,25);
            graphic.lineTo(-5,30);
            graphic.lineTo(-5,90);
            graphic.lineTo(15,90);
            graphic.lineTo(20,87);
            graphic.lineTo(-2,87);
            graphic.endFill();
            this.addChild(graphic);
        }
    }
}
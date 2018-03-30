module Fabrique {
    export class Slot extends Phaser.Sprite {
        private backgroundColor:number;
        private borderColor:number;

        constructor(game: Phaser.Game, x: number, y: number){
            super(game, x, y);
            this.init();
        }

        public shutdown(): void {
            this.removeChildren();
        }

        private init():void {
            let graphic: Phaser.Graphics = new Phaser.Graphics(this.game, 0, 0);
            graphic.beginFill(0xFFFFFF, 0.5);
            graphic.lineStyle(2, 0xFFFFFF, 0.8);
            graphic.drawRect(0, 0, 84, 84);
            graphic.endFill();
            this.addChild(graphic);

            /*
            graphics.moveTo(210,300);
            graphics.lineTo(450,320);
            graphics.lineTo(570,350);
            graphics.quadraticCurveTo(600, 0, 480,100);
            graphics.lineTo(330,120);
            graphics.lineTo(410,200);
            graphics.lineTo(210,300);
            graphics.endFill();
            */
        }
    }
}
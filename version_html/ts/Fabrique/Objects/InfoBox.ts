module Fabrique {

    export class InfoBox extends Phaser.Group {

        private dataFighter:Game.IFighter;

        constructor(game:Phaser.Game, parent:Phaser.Group, data:Game.IFighter){
            super(game, parent);
            this.dataFighter = data;
            this.init();
        }

        private init():void{
            let startX:number = (Constants.GAME_WIDTH / 2) - 225;
            let startY:number = (Constants.GAME_HEIGHT / 2) + 100;
            /* bacground and border */
            let graphics: Phaser.Graphics = new Phaser.Graphics(this.game, 0, 0);
            
            graphics.beginFill(0x000000, 0.8);
            graphics.lineStyle(1, 0x000000, 1);
            graphics.drawRect(startX, startY, 450, 60);
            graphics.endFill();

            graphics.lineStyle(1, 0x777777, 1);

            graphics.moveTo(startX-2, startY-2);
            graphics.lineTo(startX-2+150, startY-2);
            graphics.moveTo(startX-2, startY-2);
            graphics.lineTo(startX-2, startY+25-2);

            graphics.moveTo(startX+2, startY+2);
            graphics.lineTo(startX+150+2, startY+2);
            graphics.moveTo(startX+2, startY+2);
            graphics.lineTo(startX+2, startY+25+2);

            graphics.moveTo(startX+450-2, startY+60-2);
            graphics.lineTo(startX+300-2, startY+60-2);
            graphics.moveTo(startX+450-2, startY+60-2);
            graphics.lineTo(startX+450-2, startY+35-2);

            graphics.moveTo(startX+450+2, startY+60+2);
            graphics.lineTo(startX+300+2, startY+60+2);
            graphics.moveTo(startX+450+2, startY+60+2);
            graphics.lineTo(startX+450+2, startY+35+2);
            graphics.endFill();
            
            graphics.inputEnabled = true;
            this.addChild(graphics);
        }

    }

}
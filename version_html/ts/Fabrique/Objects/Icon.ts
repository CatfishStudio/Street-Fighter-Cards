module Fabrique {

    export class Icon extends Phaser.Group {
        
        constructor(game:Phaser.Game, parent:Phaser.Group, fighterIndex:number, x:number, y:number){
            super(game, parent);
            this.init(fighterIndex, x, y);
        }

        public shutdown():void {
            this.removeAll();
        }

        private init(index:number, x:number, y:number):void{
            this.x = x;
            this.y = y;

            let iconMask: Phaser.Graphics = new Phaser.Graphics(this.game, 0, 0);
            iconMask.beginFill(0xFFFFFF);
            iconMask.drawCircle(100, 100, 100);
            //iconMask.endFill();

            let iconSprite: Phaser.Sprite = new Phaser.Sprite(this.game, 0, 0, GameData.Data.fighters[index][4]);
            iconSprite.mask = iconMask;
            this.addChild(iconSprite);

            let border: Phaser.Graphics;
        }
    }

}
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

            let polygonLeft:Phaser.Polygon = new Phaser.Polygon([   
                new Phaser.Point(0, 0), 
                new Phaser.Point(85, 0), 
                new Phaser.Point(105, 40), 
                new Phaser.Point(20, 40),  
                new Phaser.Point(0, 0)
            ]);
            
            let background: Phaser.Graphics = new Phaser.Graphics(this.game, 0, 0);
            background.beginFill(0xFFFFFF, 0.95);
            background.lineStyle(2, 0x07111D, 0.95);
            background.drawPolygon(polygonLeft);
            background.endFill();
            this.addChild(background);

            let polygonMask:Phaser.Polygon = new Phaser.Polygon([   
                new Phaser.Point(x+2, y+2), 
                new Phaser.Point(x+84, y+2), 
                new Phaser.Point(x+103, y+38), 
                new Phaser.Point(x+22, y+38),  
                new Phaser.Point(x+2, y+2)
            ]);

            let iconMask: Phaser.Graphics = new Phaser.Graphics(this.game, 0, 0);
            iconMask.beginFill(0xFFFFFF);
            iconMask.drawPolygon(polygonMask);
            iconMask.endFill();
            
            let iconSprite: Phaser.Sprite = new Phaser.Sprite(this.game, 0, 0, GameData.Data.fighters[index][4]);
            iconSprite.mask = iconMask;
            this.addChild(iconSprite);

           
            //let border: Phaser.Graphics = new Phaser.Graphics(this.game, 0, 0);

        }
    }

}
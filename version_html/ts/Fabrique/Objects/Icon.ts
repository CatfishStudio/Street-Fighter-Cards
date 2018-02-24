module Fabrique {

    export class Icon extends Phaser.Group {
        
        constructor(game:Phaser.Game, parent:Phaser.Group, fighterIndex:number, x:number, y:number, orientation:string){
            super(game, parent);
            this.init(fighterIndex, x, y, orientation);
        }

        public static LEFT:string = "left";
        public static RIGHT:string = "right";

        public shutdown():void {
            this.removeAll();
        }

        private init(index:number, x:number, y:number, orientation:string):void{
            this.x = x;
            this.y = y;
           
            let polygonLeft:Phaser.Polygon = new Phaser.Polygon([   
                new Phaser.Point(0, 0), 
                new Phaser.Point(85, 0), 
                new Phaser.Point(105, 40), 
                new Phaser.Point(20, 40),  
                new Phaser.Point(0, 0)
            ]);

            let polygonLeftMask:Phaser.Polygon = new Phaser.Polygon([   
                new Phaser.Point(x+2, y+2), 
                new Phaser.Point(x+84, y+2), 
                new Phaser.Point(x+103, y+38), 
                new Phaser.Point(x+22, y+38),  
                new Phaser.Point(x+2, y+2)
            ]);

            let polygonRight:Phaser.Polygon = new Phaser.Polygon([   
                new Phaser.Point(0, 0), 
                new Phaser.Point(85, 0), 
                new Phaser.Point(65, 40), 
                new Phaser.Point(-20, 40),  
                new Phaser.Point(0, 0)
            ]);

            let polygonRightMask:Phaser.Polygon = new Phaser.Polygon([   
                new Phaser.Point(x+2, y+2), 
                new Phaser.Point(x+82, y+2), 
                new Phaser.Point(x+63, y+38), 
                new Phaser.Point(x-18, y+38),  
                new Phaser.Point(x+2, y+2)
            ]);

            let background: Phaser.Graphics;
            let iconMask: Phaser.Graphics;
            let iconSprite: Phaser.Sprite;

            if(orientation === Icon.LEFT){
                background = new Phaser.Graphics(this.game, 0, 0);
                background.beginFill(0xFFFFFF, 0.95);
                background.lineStyle(2, 0x07111D, 0.95);
                background.drawPolygon(polygonLeft);
                background.endFill();
                this.addChild(background);

                iconMask = new Phaser.Graphics(this.game, 0, 0);
                iconMask.beginFill(0xFFFFFF);
                iconMask.drawPolygon(polygonLeftMask);
                iconMask.endFill();
                
                iconSprite = new Phaser.Sprite(this.game, 0, 0, GameData.Data.fighters[index][4]);
                iconSprite.mask = iconMask;
                this.addChild(iconSprite);
            }else{
                background = new Phaser.Graphics(this.game, 0, 0);
                background.beginFill(0xFFFFFF, 0.95);
                background.lineStyle(2, 0x07111D, 0.95);
                background.drawPolygon(polygonRight);
                background.endFill();
                this.addChild(background);

                iconMask = new Phaser.Graphics(this.game, 0, 0);
                iconMask.beginFill(0xFFFFFF);
                iconMask.drawPolygon(polygonRightMask);
                iconMask.endFill();
                
                iconSprite = new Phaser.Sprite(this.game, 40, 20, GameData.Data.fighters[index][4]);
                iconSprite.anchor.setTo(.5,.5);
                iconSprite.scale.x *= -1;
                iconSprite.mask = iconMask;
                this.addChild(iconSprite);
            }
           
            let playerBorder:Phaser.Polygon = new Phaser.Polygon([   
                new Phaser.Point(0, 0), 
                new Phaser.Point(85, 0), 
                new Phaser.Point(90, 10), 
                new Phaser.Point(30, 10),
                new Phaser.Point(10, 20),
            ]);
           
            if(index === GameData.Data.fighterIndex){
                let border: Phaser.Graphics = new Phaser.Graphics(this.game, 0, 0);
                border.beginFill(0x0026FF, 0.95);
                border.lineStyle(0, 0x0026FF, 0.0);
                border.drawPolygon(playerBorder);
                border.endFill();
                this.addChild(border);

                let playerText1: Phaser.Text = this.game.add.text(7, 0, "И", { font: "12px Georgia", fill: "#FFFFFF", align: "left" });
                this.addChild(playerText1);

                let playerText2: Phaser.Text = this.game.add.text(17, -2, "грок", { font: "10px Georgia", fill: "#FFFFFF", align: "left" });
                this.addChild(playerText2);
            }
            

        }
    }

}
module Fabrique {
    export class ButtonOrange extends Phaser.Group {
        public event: Phaser.Signal;
        
        constructor(game:Phaser.Game, parent:Phaser.Group, name:string, text:string, textX:number, x:number, y:number){
            super(game, parent);
            this.init(name, text, textX, x, y);
        }

        public shutdown():void {
            this.removeAll();
        }

        private init(name:string, text:string, textX:number, x:number, y:number):void{
            this.x = x;
            this.y = y;

            this.event = new Phaser.Signal();

            let button = new Phaser.Button(this.game, 0, 0, Sheet.ButtonStyle1, this.onButtonClick, this, 1, 2);
            button.name = name;
            this.addChild(button);

            let textBack = new Phaser.Text(this.game, textX - 1, 14, text, {font: "bold 16px Arial", fill: "#FFFFFF"});
            this.addChild(textBack);

            let textFront = new Phaser.Text(this.game, textX, 15, text, {font: "bold 16px Arial", fill: "#9B372C"});
            this.addChild(textFront);
        }

        private onButtonClick(event) {
            this.event.dispatch(event);
        }
    }
}

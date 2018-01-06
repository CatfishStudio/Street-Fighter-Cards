module Fabrique {
    export class ButtonOrange extends Phaser.Group {
        public event: Phaser.Signal;
        
        constructor(game:Phaser.Game, parent:Phaser.Group, name:string, text:string, textX:number, x:number, y:number){
            super(game, parent);
            this.init(name, text, textX, x, y);
        }

        private init(name:string, text:string, textX:number, x:number, y:number):void{
            this.x = x;
            this.y = y;

            this.event = new Phaser.Signal();

            let buttonStart = new Phaser.Button(this.game, 0, 0, Sheet.ButtonStyle1, this.onButtonClick, this, 1, 2);
            buttonStart.name = name;
            this.addChild(buttonStart);

            let textBack = new Phaser.Text(this.game, textX - 1, 14, text, {font: "16px Arial Black", fill: "#FFFFFF"});
            this.addChild(textBack);

            let textFront = new Phaser.Text(this.game, textX, 15, text, {font: "16px Arial Black", fill: "#9B372C"});
            this.addChild(textFront);
        }

        private onButtonClick(event) {
            this.event.dispatch(event);
        }
    }
}

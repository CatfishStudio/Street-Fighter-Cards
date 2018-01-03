module Fabrique {
    export class ButtonOrange extends Phaser.Group {
        public event: Phaser.Signal;
        
        constructor(game:Phaser.Game, parent:Phaser.Group, name:string, x:number, y:number){
            super(game, parent);
            this.init(name, x, y);
        }

        private init(name:string, x:number, y:number):void{
            this.event = new Phaser.Signal();

            let buttonStart = new Phaser.Button(this.game, 0, 0, Sheet.ButtonStyle1, this.onButtonClick, this, 1, 2);
            buttonStart.name = 'start';
            this.addChild(buttonStart);

            let text = new Phaser.Text(this.game, 10, 10, "НАЧАТЬ ИГРУ", {font: "24px Georgia", fill: "#000000"});
            this.addChild(text);
        }

        private onButtonClick(event) {
            this.event.dispatch(event);
        }
    }
}

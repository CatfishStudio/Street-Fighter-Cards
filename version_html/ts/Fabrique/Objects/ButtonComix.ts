module Fabrique {
    export class ButtonComix extends Phaser.Group {
        public event: Phaser.Signal;
        private textButton:Phaser.Text;
        
        constructor(game:Phaser.Game, parent:Phaser.Group, name:string, text:string, textX:number, x:number, y:number){
            super(game, parent);
            this.init(name, text, textX, x, y);
        }

        public shutdown():void {
            this.removeAll();
        }

        private init(name:string, text:string, textX:number, x:number, y:number):void {
            this.x = x;
            this.y = y;
            
            this.event = new Phaser.Signal();

            let button = new Phaser.Button(this.game, 0, 0, Sheet.ButtonStyle2, this.onButtonClick, this, 1, 2);
            button.name = name;
            button.events.onInputOut.add(this.onButtonInputOut, this);
            button.events.onInputOver.add(this.onButtonInputOver, this);
            this.addChild(button);

            this.textButton = new Phaser.Text(this.game, textX, 20, text, {font: "16px Arial Black", fill: "#666666"});
            this.addChild(this.textButton);
        }

        private onButtonClick(event) {
            this.event.dispatch(event);
        }

        private onButtonInputOut(event){
            this.textButton.fill = "#666666";
        }

        private onButtonInputOver(event){
            this.textButton.fill = "#9E32EC";
        }
    }
}
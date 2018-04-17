module Fabrique {
    export class ButtonTablo extends Phaser.Group {
        public event: Phaser.Signal;
        private button: Phaser.Button
        private textButton:Phaser.Text;

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

            this.button = new Phaser.Button(this.game, 0, 0, Sheet.ButtonStyle3, this.onButtonClick, this, 1, 2);
            this.button.name = name;
            this.button.events.onInputOut.add(this.onButtonInputOut, this);
            this.button.events.onInputOver.add(this.onButtonInputOver, this);
            this.addChild(this.button);

            this.textButton = new Phaser.Text(this.game, textX, 5, text, {font: "bold 16px Arial", fill: "#000000"});
            this.textButton.setShadow(-1, -1, 'rgba(255,255,255,1)', 0);
            this.addChild(this.textButton);
        }

        private onButtonClick(event) {
            this.event.dispatch(event);
        }

        private onButtonInputOut(event){
            this.textButton.fill = "#000000";
            this.textButton.setShadow(-1, -1, 'rgba(255,255,255,1)', 0);
        }

        private onButtonInputOver(event){
            this.textButton.fill = "#FFFFFF";
            this.textButton.setShadow(-1, -1, 'rgba(0,0,0,1)', 0);
        }

        public buttonVisible(flag:boolean) {
            this.textButton.visible = flag;
            this.textButton.fill = "#000000";
            this.textButton.setShadow(-1, -1, 'rgba(255,255,255,1)', 0);

            this.button.visible = flag;
            this.button.frame = 0;
        }
    }
}
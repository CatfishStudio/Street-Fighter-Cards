module Fabrique {
    export class Timer extends Phaser.Sprite {

        public event: Phaser.Signal;
        
        private count:number;
        private pause:boolean;
        private stop:boolean;
        private timerText:Phaser.Text;
        private messageText:Phaser.Text;
        

        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, Images.TabloLevel);
            this.init();
        }

        public shutdown(): void {
            this.stopTimer(true);
            this.removeChildren();
        }

        private init(): void {
            this.event = new Phaser.Signal();

            this.count = 30;
            this.pause = false;
            this.stop = false;

            this.timerText = this.game.add.text(45, 12, "0:" + this.count.toString(), { font: "bold 24px arial", fill: "#FFFFFF", align: "left" })
            this.addChild(this.timerText);

            this.messageText = this.game.add.text(40, 40, "...", { font: "bold 12px arial", fill: "#FFFFFF", align: "left" })
            this.addChild(this.messageText);
        }

        public runTimer(): void {
            setTimeout(this.onTimerComplete.bind(this), 1000);
        }

        public pauseTimer(value:boolean):void {
            this.pause = value;
            if(this.pause === false) this.runTimer();
        }

        public stopTimer(value:boolean):void {
            this.stop = value;
            this.count = 30;
        }

        private onTimerComplete():void {
            if(this.pause === true || this.stop === true) return;

            this.count--;
            if (this.timerText !== undefined && this.timerText !== null) {
                if(this.count > 9) this.timerText.text = "0:" + this.count.toString();
                else this.timerText.text = "0:0" + this.count.toString();
            }
           
            if(this.count <= 0){
                this.count = 30;
                this.event.dispatch(Constants.TIMER_END);
            }
                        
            this.runTimer();
        }

        public setMessage(value:string):void {
            if (this.messageText !== undefined && this.messageText !== null) {
                this.messageText.text = value;
                if(value.length < 10) this.messageText.x = 42;
                else this.messageText.x = 20;
            }
        }
    }
}
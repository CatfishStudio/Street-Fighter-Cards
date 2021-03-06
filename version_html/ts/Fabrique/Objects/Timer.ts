module Fabrique {
    export class Timer extends Phaser.Sprite {
        public event: Phaser.Signal;
        private count: number;
        private timerText: Phaser.Text;
        private messageText: Phaser.Text;

        private timer: Phaser.Timer;

        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, Images.TabloLevel);
            this.init();
        }

        public shutdown(): void {
            this.timer.stop(true);
            this.removeChildren();
        }

        private init(): void {
            this.event = new Phaser.Signal();

            this.count = 30;

            this.timer = this.game.time.create(false);
            this.timer.loop(1000, this.onTimerComplete, this);

            this.timerText = this.game.add.text(45, 12, "0:" + this.count.toString(), { font: "bold 24px arial", fill: "#FFFFFF", align: "left" })
            this.addChild(this.timerText);

            this.messageText = this.game.add.text(40, 40, "............................", { font: "bold 12px arial", fill: "#FFFFFF", align: "left" })
            this.addChild(this.messageText);
        }

        private onTimerComplete(): void {
            this.count--;
            if (this.timerText !== undefined && this.timerText !== null) {
                if (this.count > 9) this.timerText.text = "0:" + this.count.toString();
                else this.timerText.text = "0:0" + this.count.toString();
            }

            if (this.count === 0) {
                this.event.dispatch(Constants.TIMER_END);
                this.count = 30;
                Utilits.Data.debugLog("TIMER:", "ON COMPLETE");
            }
        }

        private run(): void {
            this.timer.start(this.count);
        }

        public runTimer(): void {
            this.resetTimer();
            this.run();
        }

        public pauseTimer(value: boolean = true): void {
            /*
            if(value === true) this.timer.pause();
            else this.timer.start(this.count);
            */
            if (value === true) this.timer.stop(false);
            else this.timer.start(this.count);
            Utilits.Data.debugLog("TIMER PAUSE:", value);
        }

        public stopTimer(): void {
            this.timer.stop(false);
            this.count = 30;
            this.setMessage("............................");
            Utilits.Data.debugLog("TIMER:", "STOP");
        }

        public resetTimer(): void {
            this.count = 30;
        }

        public setMessage(value: string): void {
            if (this.messageText !== undefined && this.messageText !== null) {
                this.messageText.text = value;
                if (value.length < 10) this.messageText.x = 42;
                else this.messageText.x = 20;
            }
        }
    }
}
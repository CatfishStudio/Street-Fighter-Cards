module Fabrique {

    export class Tutorial extends Phaser.Sprite {
        public static LEFT: string = "left";
        public static RIGHT: string = "right";

        private text: string;
        private dialog: Phaser.Sprite;
        private tween: Phaser.Tween;
        private orientation: string;

        constructor(game: Phaser.Game, text: string, orientation: string) {
            if (orientation === Tutorial.LEFT) {
                super(game, 25, 600, Images.TutorialLeftImage);
                
            } else {
                super(game, 625, 600, Images.TutorialRightImage);
            }
            
            this.text = text;
            this.orientation = orientation;
            this.init();
        }

        public shutdown(): void {
            this.tween.stop();
            this.removeChild(this.dialog);
        }

        private init(): void {
            this.tween = this.game.add.tween(this);
            this.tween.to({ x: this.x, y: this.y - 225 }, 750, 'Linear');
            this.tween.onComplete.add(this.onComplete, this);
            this.tween.start();
        }

        private onComplete(): void {
            if (this.orientation === Tutorial.LEFT) {
                this.createLeftDialog();
            } else {
                this.createRightDialog();
            }

        }

        private createLeftDialog(): void {
            this.dialog = new Phaser.Sprite(this.game, 0, 0);

            let graphics: Phaser.Graphics = this.game.add.graphics(0, 0);

            graphics.beginFill(0xFFFFFF, 1);
            graphics.lineStyle(2, 0x000000, 1);
            graphics.moveTo(-20, 20);
            graphics.lineTo(5, 30);
            graphics.lineTo(5, 47);
            graphics.lineTo(-20, 20);
            graphics.endFill();

            graphics.beginFill(0xFFFFFF, 1);
            graphics.lineStyle(2, 0x000000, 1);
            graphics.drawRoundedRect(0, 0, 200, 70, 15);
            graphics.endFill();

            graphics.beginFill(0xFFFFFF, 1);
            graphics.lineStyle(1, 0xFFFFFF, 1);
            graphics.drawRect(-1, 28, 4, 11);
            graphics.endFill();

            this.dialog.addChild(graphics);

            let messageText: Phaser.Text = this.game.add.text(5, 5, this.text, { font: "18px Georgia", fill: "#000000", align: "left" });
            this.dialog.addChild(messageText);

            this.dialog.x = 110;
            this.dialog.y = 75;
            this.addChild(this.dialog);

            this.tweenDialogStart();
        }

        private createRightDialog(): void {
            this.dialog = new Phaser.Sprite(this.game, 0, 0);

            let graphics: Phaser.Graphics = this.game.add.graphics(0, 0);

            graphics.beginFill(0xFFFFFF, 1);
            graphics.lineStyle(2, 0x000000, 1);
            graphics.moveTo(-40, 20);
            graphics.lineTo(-65, 30);
            graphics.lineTo(-65, 47);
            graphics.lineTo(-40, 20);
            graphics.endFill();

            graphics.beginFill(0xFFFFFF, 1);
            graphics.lineStyle(2, 0x000000, 1);
            graphics.drawRoundedRect(-265, 0, 200, 70, 15);
            graphics.endFill();

            graphics.beginFill(0xFFFFFF, 1);
            graphics.lineStyle(1, 0xFFFFFF, 1);
            graphics.drawRect(-68, 30, 4, 13.5);
            graphics.endFill();


            this.dialog.addChild(graphics);

            let messageText: Phaser.Text = this.game.add.text(-255, 5, this.text, { font: "18px Georgia", fill: "#000000", align: "left" });
            this.dialog.addChild(messageText);

            this.dialog.x = 85;
            this.dialog.y = 75;
            this.addChild(this.dialog);

            this.tweenDialogStart();
        }

        private tweenDialogStart(): void {
            this.tween = this.game.add.tween(this.dialog);
            this.tween.to({ x: this.dialog.x + 25, y: this.dialog.y }, 1000, 'Linear');
            this.tween.onComplete.add(this.tweenDialogEnd, this);
            this.tween.start();
        }

        private tweenDialogEnd(): void {
            this.tween = this.game.add.tween(this.dialog);
            this.tween.to({ x: this.dialog.x - 25, y: this.dialog.y }, 1000, 'Linear');
            this.tween.onComplete.add(this.tweenDialogStart, this);
            this.tween.start();
        }
    }

}
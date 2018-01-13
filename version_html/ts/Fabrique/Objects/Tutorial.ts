module Fabrique {

    export class Tutorial extends Phaser.Sprite {

        private text:string;
        private dialog:Phaser.Sprite;
        private tween: Phaser.Tween;
        
        constructor(game:Phaser.Game, text:string){
            super(game, 25, 600, Images.TutorialImage);
            this.text = text;
            this.init();
        }

        public shutdown():void {
            this.tween.stop();
            this.removeChild(this.dialog);
        }

        private init():void{
            this.tween = this.game.add.tween(this);
            this.tween.to({ x: this.x, y: this.y - 225}, 750, 'Linear');
            this.tween.onComplete.add(this.onComplete, this);
            this.tween.start();
        }

        private onComplete():void {
            this.createDialog();
        }

        private createDialog():void {
            this.dialog = new Phaser.Sprite(this.game, 0, 0);

            let graphics:Phaser.Graphics = this.game.add.graphics(0, 0);

            graphics.beginFill(0xFFFFFF, 1);
            graphics.lineStyle(2, 0x000000, 1);
            graphics.moveTo(-20,20);
            graphics.lineTo(5,30);
            graphics.lineTo(5,47);
            graphics.lineTo(-20,20);
            graphics.endFill();

            graphics.beginFill(0xFFFFFF, 1);
            graphics.lineStyle(0, 0x000000, 1);
            graphics.drawRoundedRect(0,0,200,50, 15);
            graphics.endFill();

            graphics.beginFill(0xFFFFFF, 0);
            graphics.lineStyle(2, 0x000000, 1);
            graphics.drawRoundedRect(0,0,200,50, 15);
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

        private tweenDialogStart():void{
            this.tween = this.game.add.tween(this.dialog);
            this.tween.to({ x: this.dialog.x + 25, y: this.dialog.y}, 1000, 'Linear');
            this.tween.onComplete.add(this.tweenDialogEnd, this);
            this.tween.start();
        }

        private tweenDialogEnd():void {
            this.tween = this.game.add.tween(this.dialog);
            this.tween.to({ x: this.dialog.x - 25, y: this.dialog.y}, 1000, 'Linear');
            this.tween.onComplete.add(this.tweenDialogStart, this);
            this.tween.start();
        }
    }

}
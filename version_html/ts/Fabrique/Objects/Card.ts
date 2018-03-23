module Fabrique {
    export class Card extends Phaser.Sprite {

        private nameFighter: string;
        private cardData: GameData.ICard;
        private header: Phaser.Sprite;
        private footer: Phaser.Sprite;
        private tweenHeader: Phaser.Tween;
        private tweenFooter: Phaser.Tween;
        
        constructor(game:Phaser.Game, x:number, y:number, fighterName:string, card: GameData.ICard){
            super(game, x, y);
            this.cardData = card;
            this.nameFighter = fighterName;
            this.init();
        }

        public shutdown():void {
            this.removeChildren();
        }

        public dragAndDrop(value:boolean):void { // перетаскивание
            if(value === true){
                this.inputEnabled = true;
                this.input.enableDrag(false, true);
            }else{
                this.inputEnabled = false;
            }
        }

        public reduce(value:boolean):void { // уменьшить
            if(value === true){
                this.tweenFooter = this.game.add.tween(this.footer);
                this.tweenFooter.to({y: this.footer.y - 50}, 250, 'Linear');
                this.tweenFooter.start();

                this.tweenHeader = this.game.add.tween(this.header);
                this.tweenHeader.to({height: this.header.height - 30}, 250, 'Linear');
                this.tweenHeader.start();
            }else{

            }
        }

        private init():void {
            let headerSprite: Phaser.Sprite;
            let footerSprite: Phaser.Sprite;
            if(this.cardData.type === Constants.CARD_TYPE_ATTACK){
                headerSprite = new Phaser.Sprite(this.game, 0, 0, Atlases.Cards, this.nameFighter + "_hand.png");
                footerSprite = new Phaser.Sprite(this.game, 0, 0, Atlases.Cards, this.nameFighter + "_hand.png");
            }else{
                headerSprite = new Phaser.Sprite(this.game, 0, 0, Atlases.Cards, this.nameFighter + "_block.png");
                footerSprite = new Phaser.Sprite(this.game, 0, 0, Atlases.Cards, this.nameFighter + "_block.png");
            }

            // Size header 126x157
            let bitmapData = this.game.make.bitmapData(126, 157);
            bitmapData.copy(headerSprite);
            bitmapData.update(126, 157);
            this.header = new Phaser.Sprite(this.game, 0, 0, bitmapData);
            this.addChild(this.header);
            
            // Size footer 126x33
            bitmapData = this.game.make.bitmapData(126, 33);
            bitmapData.copy(footerSprite, 0, 0, 126, 190, 0, -157);
            bitmapData.update(126, 33);
            this.footer = new Phaser.Sprite(this.game, 0, 157, bitmapData);
            this.addChild(this.footer);
        }

    }
}
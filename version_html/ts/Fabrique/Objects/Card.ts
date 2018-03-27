module Fabrique {
    export class Card extends Phaser.Sprite {

        private nameFighter: string;
        private cardData: GameData.ICard;
        private header: Phaser.Sprite;
        private footer: Phaser.Sprite;
        private tweenFooter: Phaser.Tween;
        private headerHeight: number;
        private footerHeight: number;
        public indexInHand:number;

        constructor(game: Phaser.Game, x: number, y: number, fighterName: string, card: GameData.ICard) {
            super(game, x, y);
            this.cardData = card;
            this.nameFighter = fighterName;
            this.headerHeight = 157;
            this.footerHeight = 33;
            this.init();
        }

        public shutdown(): void {
            this.removeChildren();
        }

        public dragAndDrop(value: boolean): void { // перетаскивание
            if (value === true) {
                this.inputEnabled = true;
                this.input.enableDrag(false, true);
            } else {
                this.inputEnabled = false;
            }
        }

        public reduce(value: boolean): void { // уменьшить
            if (value === true) {
                this.tweenFooter = this.game.add.tween(this.footer);
                this.tweenFooter.to({ y: 94 }, 250, 'Linear');
                this.tweenFooter.onUpdateCallback(this.headerUpdateMinus, this);
                this.tweenFooter.start();
            } else {
                this.tweenFooter = this.game.add.tween(this.footer);
                this.tweenFooter.to({ y: 157 }, 250, 'Linear');
                this.tweenFooter.onUpdateCallback(this.headerUpdatePlus, this);
                this.tweenFooter.start();
            }
        }

        private headerUpdateMinus(callback: any, callbackContext: object): void {
            let headerSprite: Phaser.Sprite;
            if (this.cardData.type === Constants.CARD_TYPE_ATTACK) {
                if(this.cardData.power > 20){
                    headerSprite = new Phaser.Sprite(this.game, 0, 0, Atlases.Cards, this.nameFighter + "_leg.png");
                }else{
                    headerSprite = new Phaser.Sprite(this.game, 0, 0, Atlases.Cards, this.nameFighter + "_hand.png");
                }
            } else {
                headerSprite = new Phaser.Sprite(this.game, 0, 0, Atlases.Cards, this.nameFighter + "_block.png");
            }
            this.headerHeight -= 2;
            let bitmapData = this.game.make.bitmapData(126, this.headerHeight);
            bitmapData.copy(headerSprite);
            bitmapData.update(126, 126);
            this.header.setTexture(bitmapData.texture, true);
        }

        private headerUpdatePlus(callback: any, callbackContext: object): void {
            let headerSprite: Phaser.Sprite;
            if (this.cardData.type === Constants.CARD_TYPE_ATTACK) {
                if(this.cardData.power > 20){
                    headerSprite = new Phaser.Sprite(this.game, 0, 0, Atlases.Cards, this.nameFighter + "_leg.png");
                }else{
                    headerSprite = new Phaser.Sprite(this.game, 0, 0, Atlases.Cards, this.nameFighter + "_hand.png");
                }
            } else {
                headerSprite = new Phaser.Sprite(this.game, 0, 0, Atlases.Cards, this.nameFighter + "_block.png");
            }
            this.headerHeight += 2;
            let bitmapData = this.game.make.bitmapData(126, this.headerHeight);
            bitmapData.copy(headerSprite);
            bitmapData.update(126, 126);
            this.header.setTexture(bitmapData.texture, true);
        }

        private init(): void {
            let headerSprite: Phaser.Sprite;
            let footerSprite: Phaser.Sprite;
            if (this.cardData.type === Constants.CARD_TYPE_ATTACK) {
                if(this.cardData.power > 20){
                    headerSprite = new Phaser.Sprite(this.game, 0, 0, Atlases.Cards, this.nameFighter + "_leg.png");
                    footerSprite = new Phaser.Sprite(this.game, 0, 0, Atlases.Cards, this.nameFighter + "_leg.png");
                }else{
                    headerSprite = new Phaser.Sprite(this.game, 0, 0, Atlases.Cards, this.nameFighter + "_hand.png");
                    footerSprite = new Phaser.Sprite(this.game, 0, 0, Atlases.Cards, this.nameFighter + "_hand.png");
                }
            } else {
                headerSprite = new Phaser.Sprite(this.game, 0, 0, Atlases.Cards, this.nameFighter + "_block.png");
                footerSprite = new Phaser.Sprite(this.game, 0, 0, Atlases.Cards, this.nameFighter + "_block.png");
            }

            // Size header 126x157
            let bitmapData = this.game.make.bitmapData(126, this.headerHeight);
            bitmapData.copy(headerSprite);
            bitmapData.update(126, this.headerHeight);
            this.header = new Phaser.Sprite(this.game, 0, 0, bitmapData);
            this.addChild(this.header);

            // Size footer 126x33
            bitmapData = this.game.make.bitmapData(126, this.footerHeight);
            bitmapData.copy(footerSprite, 0, 0, 126, 190, 0, -this.headerHeight);
            bitmapData.update(126, this.footerHeight);
            this.footer = new Phaser.Sprite(this.game, 0, this.headerHeight, bitmapData);
            this.addChild(this.footer);
        }

    }
}
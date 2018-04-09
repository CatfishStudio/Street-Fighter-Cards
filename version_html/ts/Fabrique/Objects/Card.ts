module Fabrique {
    export class Card extends Phaser.Sprite {

        public cardData: GameData.ICard;
        public indexInHand: number = -1;

        private nameFighter: string;
        private header: Phaser.Sprite;
        private footer: Phaser.Sprite;
        private tweenFooter: Phaser.Tween;
        private headerHeight: number;
        private footerHeight: number;

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
                this.tweenFooter.onUpdateCallback(this.headerUpdate, this);
                this.tweenFooter.start();
            } else {
                this.tweenFooter = this.game.add.tween(this.footer);
                this.tweenFooter.to({ y: 157 }, 250, 'Linear');
                this.tweenFooter.onUpdateCallback(this.headerUpdate, this);
                this.tweenFooter.start();
            }
        }

        private headerUpdate(callback: any, callbackContext: object): void {
            let headerSprite: Phaser.Sprite;
            if (this.cardData.type === Constants.CARD_TYPE_ATTACK) {
                if (this.cardData.power > 20) {
                    headerSprite = new Phaser.Sprite(this.game, 0, 0, Atlases.Cards, this.nameFighter + "_leg.png");
                } else {
                    headerSprite = new Phaser.Sprite(this.game, 0, 0, Atlases.Cards, this.nameFighter + "_hand.png");
                }
            } else {
                headerSprite = new Phaser.Sprite(this.game, 0, 0, Atlases.Cards, this.nameFighter + "_block.png");
            }
            let bitmapData = this.game.make.bitmapData(126, this.footer.y + 5);
            bitmapData.copy(headerSprite);
            bitmapData.update(126, 126);
            this.header.setTexture(bitmapData.texture, true);
        }

        private init(): void {
            this.indexInHand = -1;
            let energyText: Phaser.Text;
            let powerText: Phaser.Text;
            let headerSprite: Phaser.Sprite;
            let footerSprite: Phaser.Sprite;
            if (this.cardData.type === Constants.CARD_TYPE_ATTACK) {
                if (this.cardData.power > 20) {
                    headerSprite = new Phaser.Sprite(this.game, 0, 0, Atlases.Cards, this.nameFighter + "_leg.png");
                    footerSprite = new Phaser.Sprite(this.game, 0, 0, Atlases.Cards, this.nameFighter + "_leg.png");
                } else {
                    headerSprite = new Phaser.Sprite(this.game, 0, 0, Atlases.Cards, this.nameFighter + "_hand.png");
                    footerSprite = new Phaser.Sprite(this.game, 0, 0, Atlases.Cards, this.nameFighter + "_hand.png");
                }
                powerText = this.game.add.text(40, 5, 'Удар: ' + this.cardData.power.toString(), { font: "bold 18px Times New Roman", fill: "#FFFFFF", align: "left" })
            } else {
                headerSprite = new Phaser.Sprite(this.game, 0, 0, Atlases.Cards, this.nameFighter + "_block.png");
                footerSprite = new Phaser.Sprite(this.game, 0, 0, Atlases.Cards, this.nameFighter + "_block.png");
                powerText = this.game.add.text(40, 5, 'Блок: ' + this.cardData.power.toString(), { font: "bold 18px Times New Roman", fill: "#FFFFFF", align: "left" })
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

            // Text
            energyText = this.game.add.text(14, 6, this.cardData.energy.toString(), { font: "bold 18px Times New Roman", fill: "#FFFFFF", align: "left" })
            this.addChild(energyText);
            this.footer.addChild(powerText);
        }
    }
}
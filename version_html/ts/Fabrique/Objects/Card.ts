module Fabrique {
    export class Card extends Phaser.Group {

        private nameFighter: string;
        private cardData: GameData.ICard;
        private header: Phaser.Sprite;
        private footer: Phaser.Sprite;

        constructor(game:Phaser.Game, parent:Phaser.Group, fighterName:string, card: GameData.ICard){
            super(game, parent);
            this.cardData = card;
            this.nameFighter = fighterName;
            this.init();
        }

        public shutdown():void {
            this.removeAll();
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
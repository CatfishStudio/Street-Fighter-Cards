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
            if(this.cardData.type === Constants.CARD_TYPE_ATTACK){
                this.header = new Phaser.Sprite(this.game, 0, 0, Atlases.Cards, this.nameFighter + "_hand.png");
            }else{
                this.header = new Phaser.Sprite(this.game, 0, 0, Atlases.Cards, this.nameFighter + "_block.png");
            }
            this.addChild(this.header);
        }

    }
}
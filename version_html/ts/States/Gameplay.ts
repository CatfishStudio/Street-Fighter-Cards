module MyGame {
    export class GamePlay extends Phaser.State {
        public static Name: string = 'gameplay';
        public name: string = GamePlay.Name;

        private data: any;
        private phaserSprite: Phaser.Sprite;

        constructor() {
            super();
        }

        /**
         * Параметр получает предварительные данные
         * @param data
         */
        public init(data: any): void {
            this.data = data;
        }

        public create(): void {
            super.create();

            this.phaserSprite = this.game.add.sprite(0,0,Images.ImagePhaser);

            this.resize();
        }

        public shutdown(): void {
            
        }

        /**
         * Изменение размеров при смене ориентации
         * Для мобильной версии
         */
        public resize(): void {
            this.game.stage.updateTransform();
            if (this.game.width > this.game.height) {
                this.elementsPositionLandscape();
            } else {
                this.elementsPositionPortrait();
            }
        }

        private elementsPositionLandscape(): void {

        }

        private elementsPositionPortrait(): void {

        }        

        
    }
}
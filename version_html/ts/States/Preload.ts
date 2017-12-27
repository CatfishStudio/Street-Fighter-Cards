module MyGame {
    export class Preload extends Phaser.State {
        public static Name: string = 'preload';

        public name: string = Preload.Name;

        constructor() {
            super();
        }

        public preload(): void {
            this.game.load.onLoadStart.add(this.onPreloadStart, this);
            this.game.load.onFileComplete.add(this.onPreloadedFile, this)
            this.game.load.onLoadComplete.add(this.onPreloadEnd, this);

            Images.preloadList.forEach((assetName: string) => {
                this.game.load.image(assetName, 'assets/images/' + assetName + '.png');
            });

            Atlases.preloadList.forEach((assetName: string) => {
                this.game.load.atlas(assetName, 'assets/atlas/' + assetName + '.png', 'assets/atlas/' + assetName + '.json');
            });

            Sounds.preloadList.forEach((assetName: string) => {
                this.game.load.audio(assetName, ['assets/sound/' + assetName + '.mp3', 'assets/sound/' + assetName + '.ogg', 'assets/sound/' + assetName + '.m4a']);
            });
        }

        private onPreloadStart(): void {
            console.log('[PRELOADER]: start');
        }

        private onPreloadedFile(progress: number): void {
            console.log('[PRELOADER]: load');
        }

        private onPreloadEnd(): void {
            console.log('[PRELOADER]: end');

            //Do some audio decoding before continuing;
            Sounds.preloadList.forEach((assetName: string) => {
                this.game.add.audio(assetName);
            });
            this.game.sound.setDecodedCallback(Sounds.preloadList, this.startGameAfterDecodingAudio, this);
        }

        private startGameAfterDecodingAudio(): void {
            console.log('[PRELOADER]: decoding audio complete');
            this.game.state.start(Start.Name);
        }
    }
}
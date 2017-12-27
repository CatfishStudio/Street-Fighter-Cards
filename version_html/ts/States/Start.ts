module MyGame {

    export class Start extends Phaser.State {
        public static Name: string = 'start';
        public name: string = Start.Name;

        constructor() {
            super();
        }

        public create(): void {
            let data:any = null;
            this.game.state.start(GamePlay.Name, true, false, data);
        }
    }
}

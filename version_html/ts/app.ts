module Game {
    
    export class Game extends Phaser.Game {
        
        constructor(div: string) {
            super({
                enableDebug: false,             //No debug
                width: Constants.GAME_WIDTH,    //Configured width
                height: Constants.GAME_HEIGHT,  //Configured height
                renderer: Phaser.AUTO,          //We prefer WebGL over canvas rendering, but we fall back to canvas because we like to support IE
                parent: div,                    //The div in the html we want to put the game in, this helps with styling
                transparent: false,             //The game should be transparent
                antialias: true,                //ofcourse this is true
                forceSetTimeOut: false
            });

            this.state.add(MyGame.Boot.Name, MyGame.Boot, false);
            this.state.add(MyGame.Preload.Name, MyGame.Preload, false);
            this.state.add(MyGame.Start.Name, MyGame.Start, false);
            this.state.add(MyGame.GamePlay.Name, MyGame.GamePlay, false);
        }

        public start(): void {
            this.state.start(MyGame.Boot.Name);
        }
    }

    export function getGame(div: string): Game {
        return new Game(div);
    }
}

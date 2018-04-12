module StreetFighterCards{
        export class Game extends Phaser.Game {
                private static instance: Game = null;
                
                constructor() {
                        super({
                                enableDebug: false,             //No debug
                                width: Constants.GAME_WIDTH,    //Configured width
                                height: Constants.GAME_HEIGHT,  //Configured height
                                renderer: Phaser.AUTO,          //We prefer WebGL over canvas rendering, but we fall back to canvas because we like to support IE
                                parent: 'content',              //The div in the html we want to put the game in, this helps with styling
                                transparent: true,              //The game should be transparent
                                antialias: true,                //ofcourse this is true
                                forceSetTimeOut: false
                        });
                        
                        this.state.add(Boot.Name, Boot, false);
                        this.state.add(Preloader.Name, Preloader, false);
                        this.state.add(Menu.Name, Menu, false);
                        this.state.add(ChoiceFighter.Name, ChoiceFighter, false);
                        this.state.add(Tournament.Name, Tournament, false);
                        this.state.add(Level.Name, Level, false);
                }
                
                public static getInstance(): Game {
                        if(StreetFighterCards.Game.instance === null) {
                                Game.instance = new Game();
                        }
                        return Game.instance;
                }
                
                public start(): void {
                        Game.instance.onBlur.add(this.onGameBlur, this);
                        Game.instance.onFocus.add(this.onGameFocus, this);
                        Game.instance.onPause.add(this.onGamePause, this);
                        Game.instance.onResume.add(this.onGameResume, this);
                        this.state.start(Boot.Name);
                }
                
                private onGameBlur(...values):void {
                        console.log('-- Blur --', values);
                }

                private onGameFocus(...values):void {
                        console.log('-- Focus --', values);
                        //this.stage.disableVisibilityChange = false;
                }

                private onGamePause(...values):void {
                        console.log('-- Pause --', values);
                        //this.stage.disableVisibilityChange = true;
                   }

                private onGameResume(...values):void {
                        console.log('-- Resume --', values);
                }
        }
}
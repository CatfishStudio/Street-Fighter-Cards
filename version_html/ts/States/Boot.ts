module MyGame {
    export class Boot extends Phaser.State {
        public static Name: string = 'boot';

        public name: string = Boot.Name;

        constructor() {
            super();
        }

        /**
         * Loader, here we load the assets we need in order to show the loader
         */
        public init(): void {
            this.game.stage.backgroundColor = '#A45DF1';
            
            
            //Disable contextual menu (right click)
            this.game.canvas.oncontextmenu = function (e) {
                e.preventDefault();
            };

            //We limit the game to 1 pointer, because it doesn't support multi-touch!
            this.game.input.maxPointers = 1;

            //We do a custom scale for mobile, because we want to keep a custom viewport
            this.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;

            //resize because it's better than any of the phaser provided resizes
            window.addEventListener('resize', (e: Event) => this.mobileResizeCallback(this.game.scale));
            this.game.scale.onSizeChange.add(() => {
                this.game.state.getCurrentState().resize();
            }, this);
            this.mobileResizeCallback(this.game.scale);
        }

        /**
         * Here we do mobile scaling, there are different scale modes per device pixel ratio in order to get the optimal performance.
         *
         * @param manager
         */
        public mobileResizeCallback(manager: Phaser.ScaleManager): void {
            let width: number = window.innerWidth;
            let height: number = window.innerHeight;

            let userRatio: number = 1;

            if (width < height) {
                userRatio /= Math.round(height / Constants.GAME_WIDTH * 10) / 10;
            } else {
                userRatio /= Math.round(width / Constants.GAME_WIDTH * 10) / 10;
            }

            let expectedWidh: number = Math.ceil(width * userRatio);
            let expecteHeight: number = Math.ceil(height * userRatio);

            if (manager.width !== expectedWidh || manager.height !== expecteHeight) {
                manager.setGameSize(expectedWidh, expecteHeight);
                manager.setUserScale(1 / userRatio, 1 / userRatio);
            }

            this.checkOrientation();
        }

        /**
         * Here we check the game's exact orientation, which we do in a cross-browser way.
         * We also check if the viewport's within the acceptable bounds, and if not, show a blocking screen.
         */
        private checkOrientation(): void {

            var w: number = document.getElementById('dummy').getBoundingClientRect().left;
            var h: number = document.getElementById('dummy').getBoundingClientRect().top;

            if (w > h && h < 300) {
                this.enterIncorrectOrientation();
            } else {
                this.leaveIncorrectOrientation();
            }
        }

        /**
         * Show a screen to the user that he needs to rotate his device
         */
        private enterIncorrectOrientation(): void {
            document.getElementById('orientation').style.display = 'block';
            document.getElementById('content').style.display = 'none';
        }

        /**
         * User rotate to correct orientation, lets hide the block screen
         */
        private leaveIncorrectOrientation(): void {
            document.getElementById('orientation').style.display = 'none';
            document.getElementById('content').style.display = 'block';
        }

        /**
         * Everything's done, let's load the splash screen
         */
        public create(): void {
            this.game.state.start(Preload.Name);
        }
    }
}
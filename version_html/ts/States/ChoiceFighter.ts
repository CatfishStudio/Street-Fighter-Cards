module StreetFighterCards {
    import ButtonComix = Fabrique.ButtonComix;
    import Slides = Fabrique.Slides;
    import Tutorial = Fabrique.Tutorial;
    import Settings = Fabrique.Settings;
    import Comix = Fabrique.Comix;

    export class ChoiceFighter extends Phaser.State{

        public static Name: string = "choce_fighter";
        public name: string = Menu.Name;

        private groupWindow: Phaser.Group;
        
        private buttonBack: ButtonComix;
        private buttonSettings: ButtonComix;
        private buttonSelect: ButtonComix;

        private slides:Slides;
        private tutorial:Tutorial;
        private settings:Settings;

        constructor() {
            super();
        }

        public create() {
            this.groupWindow = new Phaser.Group(this.game, this.stage);
            
            this.createBackground();
            this.createButtons();
            this.createSlides();
            this.createTutorial();
            this.createBorder();
            this.createComix();
        }

        public shutdown(){
            this.slides.shutdown();
            this.buttonBack.shutdown();
            this.buttonSelect.shutdown();
            this.buttonSettings.shutdown();
            this.tutorial.shutdown();
            this.groupWindow.removeAll();
            this.game.stage.removeChildren();
        }

        private createBackground():void {
            let backgroundSprite:Phaser.Sprite = new Phaser.Sprite(this.game, 0, 0, Images.ChoiceImage);
            this.groupWindow.addChild(backgroundSprite);
        }

        private createButtons():void {
            this.buttonBack = new ButtonComix(this.game, this.groupWindow, Constants.BUTTON_BACK, 'НАЗАД', 60, 10, 10);
            this.buttonBack.event.add(this.onButtonClick, this);

            this.buttonSettings = new ButtonComix(this.game, this.groupWindow, Constants.BUTTON_SETTINGS, 'НАСТРОЙКИ', 40, 300, 530);
            this.buttonSettings.event.add(this.onButtonClick, this);

            this.buttonSelect = new ButtonComix(this.game, this.groupWindow, Constants.BUTTON_SELECT, 'ВЫБРАТЬ', 55, 600, 530);
            this.buttonSelect.event.add(this.onButtonClick, this);
        }

        private createSlides():void {
            this.slides = new Slides(this.game, this.groupWindow);
        }

        private createTutorial():void {
            this.tutorial = new Tutorial(this.game, GameData.Data.tutorList[GameData.Data.tutorProgress], Tutorial.RIGHT);
            this.groupWindow.addChild(this.tutorial);
        }

        private createBorder():void {
            let borderSprite:Phaser.Sprite = new Phaser.Sprite(this.game, 0, 0, Images.BorderImage);
            this.groupWindow.addChild(borderSprite);
        }

        private createComix():void {
            let comix: Comix = new Comix(this.game, this.groupWindow);
        }

        private settingsCreate() {
            this.settings = new Settings(this.game, this.groupWindow);
            this.settings.event.add(this.onButtonClick, this);
        }
        
        private settingsClose() {
            this.settings.removeAll();
            this.groupWindow.removeChild(this.settings);
        }

        private onButtonClick(event) {
            switch (event.name) {
                case Constants.BUTTON_SELECT:
                    {
                        GameData.Data.initTournament();
                        this.game.state.start(Tournament.Name, true, false);
                        break;
                    }
                case Constants.BUTTON_BACK:
                    {
                        this.game.state.start(Menu.Name, true, false);
                        break;
                    }
                case Constants.BUTTON_SETTINGS:
                    {
                        this.settingsCreate();
                        break;
                    }
                case Constants.BUTTON_SETTINGS_CLOSE:
                    {
                        this.settingsClose();
                        break;
                    }           
                default:
                    break;
            }
        }


    }
}
module Fabrique {
    export class FighterProgressBar extends Phaser.Group {

        constructor(game: Phaser.Game, parent: Phaser.Group, fighterIndex: number, x: number, y: number, orientation: string) {
            super(game, parent);
            this.init(fighterIndex, x, y, orientation);
        }

        public static LEFT: string = "left";
        public static RIGHT: string = "right";

        private orientation: string;
        private fighterIndex: number;

        private lifeBar: Phaser.Group;
        private lifeProgress: Phaser.Graphics;
        private energyBar: Phaser.Group;
        private energyProgress: Phaser.Graphics;

        private lifeText:Phaser.Text;
        private energyText:Phaser.Text;

        public shutdown(): void {
            this.lifeBar.removeAll();
            this.energyBar.removeAll();
            this.removeAll();
        }

        private init(fighterIndex: number, x: number, y: number, orientation: string): void {
            this.x = x;
            this.y = y;
            this.orientation = orientation;
            this.fighterIndex = fighterIndex;

            this.energyBar = new Phaser.Group(this.game, this);
            this.lifeBar = new Phaser.Group(this.game, this);

            if (orientation === Icon.LEFT) {
                this.leftBars();
                this.leftIcon();
            } else {
                this.rightBars();
                this.rightIcon();
            }

            this.energyProgress = new Phaser.Graphics(this.game, 0, 0);
            this.lifeProgress = new Phaser.Graphics(this.game, 0, 20);
            this.energyBar.addChild(this.energyProgress);
            this.lifeBar.addChild(this.lifeProgress);

            this.energyText = this.game.add.text(0, 0, "0/10", { font: "bold 12px Times New Roman", fill: "#FFFFFF", align: "left" })
            this.energyBar.addChild(this.energyText);
            this.lifeText = this.game.add.text(0, 20, "0/200", { font: "bold 12px Times New Roman", fill: "#FFFFFF", align: "left" })
            this.lifeBar.addChild(this.lifeText);
        }

        private leftIcon(): void {
            let polygonLeft: Phaser.Polygon = new Phaser.Polygon([
                new Phaser.Point(0, 0),
                new Phaser.Point(85, 0),
                new Phaser.Point(105, 40),
                new Phaser.Point(20, 40),
                new Phaser.Point(0, 0)
            ]);

            let polygonLeftMask: Phaser.Polygon = new Phaser.Polygon([
                new Phaser.Point(this.x + 4, this.y + 2),
                new Phaser.Point(this.x + 83, this.y + 2),
                new Phaser.Point(this.x + 101, this.y + 38),
                new Phaser.Point(this.x + 22, this.y + 38),
                new Phaser.Point(this.x + 4, this.y + 2)
            ]);

            let background: Phaser.Graphics;
            let iconMask: Phaser.Graphics;
            let iconBackgroundSprite: Phaser.Sprite;
            let iconSprite: Phaser.Sprite;

            background = new Phaser.Graphics(this.game, 0, 0);
            background.beginFill(0xFFFFFF, 0.95);
            background.lineStyle(2, 0x006FBD, 0.95);
            background.drawPolygon(polygonLeft);
            background.endFill();
            this.addChild(background);

            iconMask = new Phaser.Graphics(this.game, 0, 0);
            iconMask.beginFill(0xFFFFFF);
            iconMask.drawPolygon(polygonLeftMask);
            iconMask.endFill();

            iconBackgroundSprite = new Phaser.Sprite(this.game, 0, 0, Images.BackgroundIcon);
            iconBackgroundSprite.mask = iconMask;
            this.addChild(iconBackgroundSprite);

            iconSprite = new Phaser.Sprite(this.game, 0, 0, GameData.Data.fighters[this.fighterIndex][4]);
            iconSprite.mask = iconMask;
            this.addChild(iconSprite);
        }

        private rightIcon(): void {
            let polygonRight: Phaser.Polygon = new Phaser.Polygon([
                new Phaser.Point(0, 0),
                new Phaser.Point(85, 0),
                new Phaser.Point(65, 40),
                new Phaser.Point(-20, 40),
                new Phaser.Point(0, 0)
            ]);

            let polygonRightMask: Phaser.Polygon = new Phaser.Polygon([
                new Phaser.Point(this.x + 2, this.y + 2),
                new Phaser.Point(this.x + 82, this.y + 2),
                new Phaser.Point(this.x + 63, this.y + 38),
                new Phaser.Point(this.x - 16, this.y + 38),
                new Phaser.Point(this.x + 2, this.y + 2)
            ]);

            let background: Phaser.Graphics;
            let iconMask: Phaser.Graphics;
            let iconBackgroundSprite: Phaser.Sprite;
            let iconSprite: Phaser.Sprite;

            background = new Phaser.Graphics(this.game, 0, 0);
            background.beginFill(0xFFFFFF, 0.95);
            //background.lineStyle(2, 0x006FBD, 0.95);
            background.lineStyle(2, 0xA32727, 0.95);
            background.drawPolygon(polygonRight);
            background.endFill();
            this.addChild(background);

            iconMask = new Phaser.Graphics(this.game, 0, 0);
            iconMask.beginFill(0xFFFFFF);
            iconMask.drawPolygon(polygonRightMask);
            iconMask.endFill();

            iconBackgroundSprite = new Phaser.Sprite(this.game, -20, 0, Images.BackgroundIcon);
            iconBackgroundSprite.mask = iconMask;
            this.addChild(iconBackgroundSprite);

            iconSprite = new Phaser.Sprite(this.game, 40, 20, GameData.Data.fighters[this.fighterIndex][4]);
            iconSprite.anchor.setTo(.5, .5);
            iconSprite.scale.x *= -1;
            iconSprite.mask = iconMask;
            this.addChild(iconSprite);
        }

        private leftBars(): void {
            // Energy
            let backgroundEnergy: Phaser.Graphics;
            let polygonEnergy: Phaser.Polygon = new Phaser.Polygon([
                new Phaser.Point(0, 0), new Phaser.Point(130, 0),
                new Phaser.Point(140, 20), new Phaser.Point(0, 20),
                new Phaser.Point(0, 0)
            ]);
            backgroundEnergy = new Phaser.Graphics(this.game, 80, 0);
            backgroundEnergy.beginFill(0x006FBD, 0.5);
            backgroundEnergy.lineStyle(2, 0x006FBD, 0.95);
            backgroundEnergy.drawPolygon(polygonEnergy);
            backgroundEnergy.endFill();
            this.energyBar.addChild(backgroundEnergy);

            // Life
            let backgroundLife: Phaser.Graphics;
            let polygonLife: Phaser.Polygon = new Phaser.Polygon([
                new Phaser.Point(0, 0), new Phaser.Point(140, 0),
                new Phaser.Point(150, 20), new Phaser.Point(0, 20),
                new Phaser.Point(0, 0)
            ]);
            backgroundLife = new Phaser.Graphics(this.game, 80, 20);
            backgroundLife.beginFill(0x000000, 0.5);
            backgroundLife.lineStyle(2, 0x006FBD, 0.95);
            backgroundLife.drawPolygon(polygonLife);
            backgroundLife.endFill();
            this.lifeBar.addChild(backgroundLife);
        }

        private rightBars(): void {
            // Energy
            let backgroundEnergy: Phaser.Graphics;
            let polygonEnergy: Phaser.Polygon = new Phaser.Polygon([
                new Phaser.Point(-80, 0), new Phaser.Point(-200, 0),
                new Phaser.Point(-210, 20), new Phaser.Point(-80, 20),
                new Phaser.Point(-80, 0)
            ]);
            backgroundEnergy = new Phaser.Graphics(this.game, 80, 0);
            //backgroundEnergy.beginFill(0x006FBD, 0.5);
            //backgroundEnergy.lineStyle(2, 0x006FBD, 0.95);
            backgroundEnergy.beginFill(0xA32727, 0.5);
            backgroundEnergy.lineStyle(2, 0xA32727, 0.95);
            backgroundEnergy.drawPolygon(polygonEnergy);
            backgroundEnergy.endFill();
            this.energyBar.addChild(backgroundEnergy);

            // Life
            let backgroundLife: Phaser.Graphics;
            let polygonLife: Phaser.Polygon = new Phaser.Polygon([
                new Phaser.Point(-80, 0), new Phaser.Point(-210, 0),
                new Phaser.Point(-220, 20), new Phaser.Point(-80, 20),
                new Phaser.Point(-80, 0)
            ]);
            backgroundLife = new Phaser.Graphics(this.game, 80, 20);
            backgroundLife.beginFill(0x000000, 0.5);
            //backgroundLife.lineStyle(2, 0x006FBD, 0.95);
            backgroundLife.lineStyle(2, 0xA32727, 0.95);
            backgroundLife.drawPolygon(polygonLife);
            backgroundLife.endFill();
            this.lifeBar.addChild(backgroundLife);
        }

        public setEnergy(value: number): void { // 10/10
            if (this.orientation === FighterProgressBar.LEFT) {
                let i: number = (130 / 10);
                let polygonEnergyProgress: Phaser.Polygon = new Phaser.Polygon([
                    new Phaser.Point(1, 1), new Phaser.Point((value * i), 1),
                    new Phaser.Point((value * i) + 10, 19), new Phaser.Point(2, 19),
                    new Phaser.Point(1, 1)
                ]);
                this.energyProgress.x = 80;
                this.energyProgress.y = 0;
                this.energyProgress.clear();
                this.energyProgress.beginFill(0x00137F, 0.95);
                this.energyProgress.lineStyle(0, 0x000000, 0.95);
                this.energyProgress.drawPolygon(polygonEnergyProgress);
                this.energyProgress.endFill();

                this.energyText.x = 150;
                this.energyText.y = 2;
                this.energyText.setText(value.toString() + "/10");
            } else {
                let i: number = (125 / 10);
                let polygonEnergyProgress: Phaser.Polygon = new Phaser.Polygon([
                    new Phaser.Point(-1, 1), new Phaser.Point((value * -i) - 1, 1),     // 130
                    new Phaser.Point((value * -i) - 10, 19), new Phaser.Point(-1, 19), // 140
                    new Phaser.Point(-1, 1)
                ]);
                this.energyProgress.x = 6;
                this.energyProgress.y = 0;
                this.energyProgress.clear();
                this.energyProgress.beginFill(0x00137F, 0.95);
                this.energyProgress.lineStyle(0, 0x000000, 0.95);
                this.energyProgress.drawPolygon(polygonEnergyProgress);
                this.energyProgress.endFill();

                this.energyText.x = -75;
                this.energyText.y = 2;
                this.energyText.setText(value.toString() + "/10");
            }
        }

        public setLife(value: number): void { // 200/200
            if (this.orientation === FighterProgressBar.LEFT) {
                let i: number = (124 / 200);
                let polygonLifeProgress: Phaser.Polygon = new Phaser.Polygon([
                    new Phaser.Point(1, 1), new Phaser.Point((value * i) + 1, 1),
                    new Phaser.Point((value * i) + 10, 19), new Phaser.Point(2, 19),
                    new Phaser.Point(1, 1)
                ]);
                this.lifeProgress.x = 95;
                this.lifeProgress.y = 20;
                this.lifeProgress.clear();
                this.lifeProgress.beginFill(0x8E0000, 0.95);
                this.lifeProgress.lineStyle(0, 0x000000, 0.95);
                this.lifeProgress.drawPolygon(polygonLifeProgress);
                this.lifeProgress.endFill();

                this.lifeText.x = 140;
                this.lifeText.y = 22;
                this.lifeText.setText(value.toString() + "/200");
            } else {
                let i: number = (120 / 200);
                let polygonLifeProgress: Phaser.Polygon = new Phaser.Polygon([
                    new Phaser.Point(-1, 1), new Phaser.Point((value * -i) - 1, 1),
                    new Phaser.Point((value * -i) - 10, 19), new Phaser.Point(-1, 19),
                    new Phaser.Point(-1, 1)
                ]);
                this.lifeProgress.x = -10;
                this.lifeProgress.y = 20;
                this.lifeProgress.clear();
                this.lifeProgress.beginFill(0x8E0000, 0.95);
                this.lifeProgress.lineStyle(0, 0x000000, 0.95);
                this.lifeProgress.drawPolygon(polygonLifeProgress);
                this.lifeProgress.endFill();

                this.lifeText.x = -90;
                this.lifeText.y = 22;
                this.lifeText.setText(value.toString() + "/200");
            }
        }
    }
}
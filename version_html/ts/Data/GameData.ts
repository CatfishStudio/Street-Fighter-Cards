module GameData {
    
    export interface ICard {
        type:string;
        power:number;
        life:number;
        energy:number;
    }

    export interface IPersonage {
        id:number;
        name:string;
        attack:number;
        defense:number;
        life:number;
        energy:number;
        deck:ICard[];
        level:string;
    }

    export class Data {
        public static fighters:any[][] = [
            [0, 'Akuma', 'akuma_card.png', Images.akumaBig, Images.akumaIcon],
            [1, 'Alex', 'alex_card.png', Images.alexBig, Images.alexIcon],
            [2, 'Chun Li', 'chun_li_card.png', Images.chunliBig, Images.chunliIcon],
            [3, 'Dudley', 'dudley_card.png', Images.dudleyBig, Images.dudleyIcon],
            [4, 'Elena', 'elena_card.png', Images.elenaBig, Images.elenaIcon],
            [5, 'Gill', 'gill_card.png', Images.gillBig, Images.gillIcon],
            [6, 'Hugo', 'hugo_card.png', Images.hugoBig, Images.hugoIcon],
            [7, 'Ibuki', 'ibuki_card.png', Images.ibukiBig, Images.ibukiIcon],
            [8, 'Ken', 'ken_card.png', Images.kenBig, Images.kenIcon],
            [9, 'Makoto', 'makoto_card.png', Images.makotoBig, Images.makotoIcon],
            [10, 'Necro', 'necro_card.png', Images.necroBig, Images.necroIcon],
            [11, 'Oro', 'oro_card.png', Images.oroBig, Images.oroIcon],
            [12, 'Q', 'q_card.png', Images.qBig, Images.qIcon],
            [13, 'Remy', 'remy_card.png', Images.remyBig, Images.remyIcon],
            [14, 'Ryu', 'ryu_card.png', Images.ryuBig, Images.ryuIcon],
            [15, 'Sean', 'sean_card.png', Images.seanBig, Images.seanIcon],
            [16, 'Twelve', 'twelve_card.png', Images.twelveBig, Images.twelveIcon],
            [17, 'Urien', 'urien_card.png', Images.urienBig, Images.urienIcon],
            [18, 'Yang', 'yang_card.png', Images.yangBig, Images.yangIcon],
            [19, 'Yun', 'yun_card.png', Images.yunBig, Images.yunIcon]
        ];

        public static levels:any[][] = [
            [0, Images.level1],
            [1, Images.level2],
            [2, Images.level3],
            [3, Images.level4],
            [4, Images.level5],
            [5, Images.level10],
            [6, Images.level7],
            [7, Images.level8],
            [8, Images.level9],
            [9, Images.level6],
            [10, Images.level11],
            [11, Images.level12],
            [12, Images.level13],
            [13, Images.level14],
            [14, Images.level15],
            [15, Images.level16],
            [16, Images.level17],
            [17, Images.level18],
            [18, Images.level19],
            [19, Images.level20],
        ];

        public static comixes:any[] = [
            Images.comixPage1,
            Images.comixPage2
        ];

        public static fighterIndex:number = 0;      // id выбранного игроком персонажа
        public static progressIndex:number = -1;    // индекс прогресса в игре
        public static comixIndex:number = 0;        // индекс комикса
        public static personages:IPersonage[];      // массив персонажей и их характеристик
        public static tournamentListIds:number[];   // турнирная таблица

        public static initPersonages(game: Phaser.Game):void {
            this.progressIndex = -1;
            this.comixIndex = 0;

            GameData.Data.personages = [];

            let personage: GameData.IPersonage;
            let card: GameData.ICard;
            let deck;
            let i: number = 0;

            Decks.preloadList.forEach((value: string) => {
                personage = <IPersonage>{};
                personage.id = game.cache.getJSON(value).id;
                personage.name = game.cache.getJSON(value).name;
                personage.attack = 0;
                personage.defense = 0;
                personage.energy = game.cache.getJSON(value).energy;
                personage.life = 0;
                personage.deck = [];
                personage.level = this.levels[i][1];

                deck = game.cache.getJSON(value).deck;
                for (let key in deck.cards) {
                    card = <ICard>{};
                    card.type = deck.cards[key].type;
                    card.power = deck.cards[key].power;
                    card.life = deck.cards[key].life;
                    card.energy = deck.cards[key].energy;
                    personage.deck.push(card);

                    if(deck.cards[key].type === Constants.CARD_TYPE_ATTACK){
                        personage.attack += Number(deck.cards[key].power);
                    }else{
                        personage.defense += Number(deck.cards[key].power);
                    }
                    personage.life += Number(deck.cards[key].life);
                }

                GameData.Data.personages.push(personage);

                console.log(GameData.Data.personages[i]);
                i++;
            });
        }

        public static initTournament():void {
            this.progressIndex = 0;
            
            GameData.Data.tournamentListIds = [];

            let listIDs:number[] = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];
            let id:number;
            while(listIDs.length > 0){
                id = listIDs.splice(Utilits.Data.getRandomRangeIndex(0, listIDs.length-1), 1)[0];
                if(id === 5 || id === GameData.Data.fighterIndex)continue;
                GameData.Data.tournamentListIds.push(id);
            }
            GameData.Data.tournamentListIds.push(GameData.Data.fighterIndex);   // player
            GameData.Data.tournamentListIds.push(5);                            // boss
            console.log(GameData.Data.tournamentListIds);
        }
    }


}
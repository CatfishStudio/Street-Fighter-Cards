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
            [0, 'Akuma', 'akuma_card.png', 'tournament/akuma.png', 'icons/akuma.png'],
            [1, 'Alex', 'alex_card.png', 'tournament/alex.png', 'icons/alex.png'],
            [2, 'Chun Li', 'chun_li_card.png', 'tournament/chun_li.png', 'icons/chun_li.png'],
            [3, 'Dudley', 'dudley_card.png', 'tournament/dudley.png', 'icons/dudley.png'],
            [4, 'Elena', 'elena_card.png', 'tournament/elena.png', 'icons/elena.png'],
            [5, 'Gill', 'gill_card.png', 'tournament/gill.png', 'icons/gill.png'],
            [6, 'Hugo', 'hugo_card.png', 'tournament/hugo.png', 'icons/hugo.png'],
            [7, 'Ibuki', 'ibuki_card.png', 'tournament/ibuki.png', 'icons/ibuki.png'],
            [8, 'Ken', 'ken_card.png', 'tournament/ken.png', 'icons/ken.png'],
            [9, 'Makoto', 'makoto_card.png', 'tournament/makoto.png', 'icons/makoto.png'],
            [10, 'Necro', 'necro_card.png', 'tournament/necro.png', 'icons/necro.png'],
            [11, 'Oro', 'oro_card.png', 'tournament/oro.png', 'icons/oro.png'],
            [12, 'Q', 'q_card.png', 'tournament/q.png', 'icons/q.png'],
            [13, 'Remy', 'remy_card.png', 'tournament/remy.png', 'icons/remy.png'],
            [14, 'Ryu', 'ryu_card.png', 'tournament/ryu.png', 'icons/ryu.png'],
            [15, 'Sean', 'sean_card.png', 'tournament/sean.png', 'icons/sean.png'],
            [16, 'Twelve', 'twelve_card.png', 'tournament/twelve.png', 'icons/twelve.png'],
            [17, 'Urien', 'urien_card.png', 'tournament/urien.png', 'icons/urien.png'],
            [18, 'Yang', 'yang_card.png', 'tournament/yang.png', 'icons/yang.png'],
            [19, 'Yun', 'yun_card.png', 'tournament/yun.png', 'icons/yun.png',]
        ];

        public static comixes:any[][] = [
            ['comix/comix_page_1.jpg'],
            ['comix/comix_page_2.jpg'],
            ['comix/comix_page_3.jpg'],
            ['comix/comix_page_4.jpg'],
            ['comix/comix_page_5_1.jpg', 'comix/comix_page_5_2.jpg'],
            ['comix/comix_page_6.jpg'],
            ['comix/comix_page_7.jpg'],
            ['comix/comix_page_8_1.jpg', 'comix/comix_page_8_2.jpg'],
            ['comix/comix_page_9_1.jpg', 'comix/comix_page_9_2.jpg'],
            ['comix/comix_page_10.jpg'],
            ['comix/comix_page_11.jpg'],
            ['comix/comix_page_12.jpg'],
            ['comix/comix_page_13.jpg'],
            ['comix/comix_page_14.jpg'],
            ['comix/comix_page_15_1.jpg', 'comix/comix_page_15_2.jpg'],
            ['comix/comix_page_16.jpg'],
            ['comix/comix_page_17.jpg'],
            ['comix/comix_page_18.jpg'],
            ['comix/comix_page_19.jpg'],
            ['comix/comix_page_20.jpg'],
            ['comix/comix_page_21.jpg']
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
                personage.level = game.cache.getJSON(value).level;

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
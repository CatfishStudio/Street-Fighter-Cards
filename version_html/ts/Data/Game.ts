module GameData {
    export interface IFighter {
        id:number;
        name:string;
        frame:string;
    }

    export interface ICard {
        id:number;
        type:string;
        power:number;
        life:number;
        energy:number;
    }

    export interface IPersonage {
        id:number;
        attack:number;
        defense:number;
        life:number;
        energy:number;
    }

    export class Data {
        public static fighters:any[][] = [
            [0, 'Akuma', 'akuma_card.png'],
            [1, 'Alex', 'alex_card.png'],
            [2, 'Chun Li', 'chun_li_card.png'],
            [3, 'Dudley', 'dudley_card.png'],
            [4, 'Elena', 'elena_card.png'],
            [5, 'Gill', 'gill_card.png'],
            [6, 'Hugo', 'hugo_card.png'],
            [7, 'Ibuki', 'ibuki_card.png'],
            [8, 'Ken', 'ken_card.png'],
            [9, 'Makoto', 'makoto_card.png'],
            [10, 'Necro', 'necro_card.png'],
            [11, 'Oro', 'oro_card.png'],
            [12, 'Q', 'q_card.png'],
            [13, 'Remy', 'remy_card.png'],
            [14, 'Ryu', 'ryu_card.png'],
            [15, 'Sean', 'sean_card.png'],
            [16, 'Twelve', 'twelve_card.png'],
            [17, 'Urien', 'urien_card.png'],
            [18, 'Yang', 'yang_card.png'],
            [19, 'Yun', 'yun_card.png']
        ];

        public static fighterIndex:number = 0;

        public static personages:IPersonage[];
        public static deck1:ICard[];
        
    }


}
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
            [0, 'Akuma', 'akuma_card.png', Images.akumaBig],
            [1, 'Alex', 'alex_card.png', Images.alexBig],
            [2, 'Chun Li', 'chun_li_card.png', Images.chunliBig],
            [3, 'Dudley', 'dudley_card.png', Images.dudleyBig],
            [4, 'Elena', 'elena_card.png', Images.elenaBig],
            [5, 'Gill', 'gill_card.png', Images.gillBig],
            [6, 'Hugo', 'hugo_card.png', Images.hugoBig],
            [7, 'Ibuki', 'ibuki_card.png', Images.ibukiBig],
            [8, 'Ken', 'ken_card.png', Images.kenBig],
            [9, 'Makoto', 'makoto_card.png', Images.makotoBig],
            [10, 'Necro', 'necro_card.png', Images.necroBig],
            [11, 'Oro', 'oro_card.png', Images.oroBig],
            [12, 'Q', 'q_card.png', Images.qBig],
            [13, 'Remy', 'remy_card.png', Images.remyBig],
            [14, 'Ryu', 'ryu_card.png', Images.ryuBig],
            [15, 'Sean', 'sean_card.png', Images.seanBig],
            [18, 'Yang', 'yang_card.png', Images.yangBig],
            [19, 'Yun', 'yun_card.png', Images.yunBig]
        ];

        public static fighterIndex:number = 0;

        public static personages:IPersonage[];
        public static deck1:ICard[];
        
    }


}
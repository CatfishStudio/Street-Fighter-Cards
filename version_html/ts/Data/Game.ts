module GameData {
    export interface IFighter {
        id:number;
        name:string;
        frame:string;
    }

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
    }

    export class Data {
        public static fighters:any[][] = [
            [0, 'Akuma', 'akuma_card.png', Images.akumaBig, Images.akumaIcon],
            [1, 'Alex', 'alex_card.png', Images.alexBig, Images.alexIcon],
            [2, 'Chun Li', 'chun_li_card.png', Images.chunliBig, Images.chunliIcon],
            [3, 'Dudley', 'dudley_card.png', Images.dudleyBig, Images.dudleyIcon],
            [4, 'Elena', 'elena_card.png', Images.elenaBig, Images.elenaIcon],
            [5, 'Gill', 'gill_card.png', Images.gillBig, Images.gillBig],
            [6, 'Hugo', 'hugo_card.png', Images.hugoBig, Images.hugoIcon],
            [7, 'Ibuki', 'ibuki_card.png', Images.ibukiBig, Images.ibukiIcon],
            [8, 'Ken', 'ken_card.png', Images.kenBig, Images.kenIcon],
            [9, 'Makoto', 'makoto_card.png', Images.makotoBig, Images.makotoIcon],
            [10, 'Necro', 'necro_card.png', Images.necroBig, Images.necroIcon],
            [11, 'Oro', 'oro_card.png', Images.oroBig, Images.oroIcon],
            [12, 'Q', 'q_card.png', Images.qBig, Images.qIcon],
            [13, 'Remy', 'remy_card.png', Images.remyBig, Images.remyBig],
            [14, 'Ryu', 'ryu_card.png', Images.ryuBig, Images.ryuIcon],
            [15, 'Sean', 'sean_card.png', Images.seanBig, Images.seanIcon],
            [18, 'Yang', 'yang_card.png', Images.yangBig, Images.yangIcon],
            [19, 'Yun', 'yun_card.png', Images.yunBig, Images.yunIcon]
        ];

        public static fighterIndex:number = 0;

        public static personages:IPersonage[];
        public static deck1:ICard[];
        
    }


}
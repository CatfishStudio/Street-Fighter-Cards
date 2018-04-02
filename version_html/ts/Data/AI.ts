module AI {
    import Card = Fabrique.Card;

    export interface IDataPlayers {
        playerLife: number;
        playerEnergy: number;
        playerHand: Card[];
        playerSlots: Card[];
        aiLife: number;
        aiEnergy: number;
        aiHand: Card[];
    }

    export class Ai {
        public static data: IDataPlayers;
        
        public static setData(data: IDataPlayers):void {
            AI.Ai.data = data;
        }

        public static getHits():number[] {
            return [0, 1, 2];
        }
    }
}
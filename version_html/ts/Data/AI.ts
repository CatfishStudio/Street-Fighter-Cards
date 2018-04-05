module AI {
    import Card = Fabrique.Card;

    export interface IDataPlayers {
        playerLife: number;
        playerEnergy: number;
        playerSlots: Card[];
        aiLife: number;
        aiEnergy: number;
        aiHand: Card[];
    }

    export class Ai {
        private static ACTIVE_PLAYER = "active_player";
        private static ACTIVE_OPPONENT = "active_opponent";
        private static data: IDataPlayers;

        public static setData(data: IDataPlayers): void {
            AI.Ai.data = data;
        }

        public static getHits(statusAction: string): number[] {
            let result: number[];

            if (statusAction === Ai.ACTIVE_PLAYER) {  // атакует игрок (AI контратакует)
                result = Ai.playerAttack();
            } else {  // атакует AI (Игрок контратакует)
                result = Ai.aiAttack();
            }

            Utilits.Data.debugLog("AI: hits:", result);

            return result;
        }

        /* фактический урон который нанесет игрок*/
        private static getTotalPlayerDamage(): number {
            let damage: number = 0;
            Ai.data.playerSlots.forEach(card => {
                if (card === null) return;
                if (card.cardData.type === Constants.CARD_TYPE_ATTACK) {
                    damage += Number(card.cardData.power);
                }
            });
            Utilits.Data.debugLog("AI: player damage:", damage);
            return damage;
        }

        private static getCardsAI(attackCards: Card[], defenseCards: Card[]): void {
            attackCards = [];
            defenseCards = [];
            Ai.data.aiHand.forEach(card => {
                if (card.cardData.energy <= Ai.data.aiEnergy && card.cardData.type === Constants.CARD_TYPE_ATTACK) {
                    attackCards.push(card);
                }
                if (card.cardData.energy <= Ai.data.aiEnergy && card.cardData.type === Constants.CARD_TYPE_DEFENSE) {
                    defenseCards.push(card);
                }
            });

            attackCards.sort((a: Card, b: Card) => {
                return a.cardData.power - b.cardData.power;
            });

            defenseCards.sort((a: Card, b: Card) => {
                return a.cardData.power - b.cardData.power;
            });

            Utilits.Data.debugLog("AI: attack cards:", attackCards);
            Utilits.Data.debugLog("AI: defense cards:", defenseCards);
        }



        /* ============================== 
        * атакует игрок (AI контратакует) 
        ================================= */
        private static playerAttack(): number[] {
            let result: number[];
            let damage = Ai.getTotalPlayerDamage(); // фактический урон который нанесет игрок
            if (damage >= Ai.data.aiLife) {
                result = Ai.tacticsDefense();       // AI под угрозой уничтожения (тактика защиты)
            } else {
                result = Ai.tacticsContrAttack();   // AI в не опасности (тактика нападения)
            }
            return result;
        }

        /* ==============================
        * атакует AI (Игрок контратакует) 
        ================================= */
        private static aiAttack(): number[] {
            let result: number[];



            result = Ai.tacticsAttack();            // AI атакует



            return [];
        }

        /** ==============================
         * ТАКТИКА
         ================================= */

        /* тактика - контратака */
        private static tacticsContrAttack(): number[] {
            let result: number[] = [];

            let energy: number = Ai.data.aiEnergy;

            let attackCards: Card[];
            let defenseCards: Card[];
            Ai.getCardsAI(attackCards, defenseCards);

            Ai.data.playerSlots.forEach(card => {
                if (card === null) return;
                // Блокировка карт наносящих максимальный урон
                if (card.cardData.type === Constants.CARD_TYPE_ATTACK && card.cardData.power > 25) {

                }
            });


            return [];
        }

        /* тактика - атака */
        private static tacticsAttack(): number[] {
            let result: number[] = [];

            return [];
        }

        /* тактика - защита */
        private static tacticsDefense(): number[] {
            let result: number[] = [];

            return [];
        }


    }
}
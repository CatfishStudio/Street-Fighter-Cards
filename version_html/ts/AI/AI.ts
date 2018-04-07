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

    export interface IHit {
        index: number;
        energy: number;
    }

    const ATTACK = "attack";
    const DEFENSE = "defense";

    export class Ai {
        private data: IDataPlayers;
        private attackCards: Card[];
        private defenseCards: Card[];
        private energy:number;

        constructor() {
            this.data = null;
            this.attackCards = [];
            this.defenseCards = [];
            this.energy = 0;
        }

        public setData(data: IDataPlayers): void {
            this.data = data;
            this.energy = data.aiEnergy;
            this.initCardsAI();
        }

        private initCardsAI(): void {
            this.attackCards = [];
            this.defenseCards = [];
            this.data.aiHand.forEach(card => {
                if (card.cardData.energy <= this.data.aiEnergy && card.cardData.type === Constants.CARD_TYPE_ATTACK) {
                    this.attackCards.push(card);
                }
                if (card.cardData.energy <= this.data.aiEnergy && card.cardData.type === Constants.CARD_TYPE_DEFENSE) {
                    this.defenseCards.push(card);
                }
            });

            this.attackCards.sort((a: Card, b: Card) => {
                return a.cardData.power - b.cardData.power;
            });

            this.defenseCards.sort((a: Card, b: Card) => {
                return a.cardData.power - b.cardData.power;
            });

            Utilits.Data.debugLog("AI: attack cards:", this.attackCards);
            Utilits.Data.debugLog("AI: defense cards:", this.defenseCards);
        }

        public getHits(statusAction: string): number[] {
            let result: number[];

            if (this.attackCards.length === 0 && this.defenseCards.length === 0) {
                return [null, null, null];
            }

            if (statusAction === Constants.ACTIVE_PLAYER) {  // атакует игрок (AI контратакует)
                result = this.playerAttack();
            } else {  // атакует AI (Игрок контратакует)
                result = this.aiAttack();
            }

            Utilits.Data.debugLog("AI: hits:", result);

            return result;
        }

        /* фактический урон который нанесет игрок*/
        private getTotalPlayerDamage(): number {
            let damage: number = 0;
            this.data.playerSlots.forEach(card => {
                if (card === null) return;
                if (card.cardData.type === Constants.CARD_TYPE_ATTACK) {
                    damage += Number(card.cardData.power);
                }
            });
            Utilits.Data.debugLog("AI: player damage:", damage);
            return damage;
        }        

        /* основная логика расчета карты для хода */
        private getHitCardAI(priority: string): IHit {
            let hit: IHit = <IHit>{};
            let aiCard:Card;
            if (this.attackCards.length <= 0 && this.defenseCards.length <= 0) return hit;
            // поиск приоритетной карты
            if (priority === ATTACK && this.attackCards.length > 0) {
                for (let i = this.attackCards.length-1; i > 0 ; i--){
                    aiCard = this.attackCards[i];
                    if(aiCard.cardData.energy <= this.energy){
                        hit.index = aiCard.indexInHand;
                        hit.energy = aiCard.cardData.energy
                        this.attackCards.splice(i, 1);
                        return hit;
                    }
                }
            } else if (priority === DEFENSE && this.defenseCards.length > 0) {
                for (let i = this.defenseCards.length-1; i > 0 ; i--){
                    aiCard = this.defenseCards[i];
                    if(aiCard.cardData.energy <= this.energy){
                        hit.index = aiCard.indexInHand;
                        hit.energy = aiCard.cardData.energy
                        this.defenseCards.splice(i, 1);
                        return hit;
                    }
                }
            }
            // поиск любой подходящей карты
            if(hit.index === undefined || hit.index === null){
                for (let i = this.attackCards.length-1; i > 0 ; i--){
                    aiCard = this.attackCards[i];
                    if(aiCard.cardData.energy <= this.energy){
                        hit.index = aiCard.indexInHand;
                        hit.energy = aiCard.cardData.energy;
                        this.attackCards.splice(i, 1);
                        return hit;
                    }
                }
                for (let i = this.defenseCards.length-1; i > 0 ; i--){
                    aiCard = this.defenseCards[i];
                    if(aiCard.cardData.energy <= this.energy){
                        hit.index = aiCard.indexInHand;
                        hit.energy = aiCard.cardData.energy;
                        this.defenseCards.splice(i, 1);
                        return hit;
                    }
                }
            }
            return hit;
        }


        /* ============================== 
        * атакует игрок (AI контратакует) 
        ================================= */
        private playerAttack(): number[] {
            let result: number[];
            let damage = this.getTotalPlayerDamage(); // фактический урон который нанесет игрок
            if (damage >= this.data.aiLife) {
                result = this.tacticsDefense();       // AI под угрозой уничтожения (тактика защиты)
            } else {
                result = this.tacticsContrAttack();   // AI в не опасности (тактика нападения)
            }
            return result;
        }

        /* ==============================
        * атакует AI (Игрок контратакует) 
        ================================= */
        private aiAttack(): number[] {
            let result: number[];



            result = this.tacticsAttack();            // AI атакует



            return [];
        }

        /** ==============================
         * ТАКТИКА
         ================================= */

        /* тактика - контратака */
        private tacticsContrAttack(): number[] {
            let result: number[] = [null, null, null];

            // Обработка атакующих карт игрока
            let playerCard: Card;
            let aiCard: Card;
            let hit: IHit = <IHit>{};
            for (let i = 0; i < this.data.playerSlots.length; i++) {
                playerCard = this.data.playerSlots[i];
                if (playerCard === null) continue;
                if (playerCard.cardData.type === Constants.CARD_TYPE_ATTACK && playerCard.cardData.power > 30) {
                    hit = this.getHitCardAI(DEFENSE);   // карта атаки сильная - приоритет защита
                }else if(playerCard.cardData.type === Constants.CARD_TYPE_ATTACK && playerCard.cardData.power < 30){
                    if(Math.random() > 0.5) hit = this.getHitCardAI(ATTACK);    // случайный выбор атака
                    else hit = this.getHitCardAI(DEFENSE);                      // случайный выбор защита
                }
                if (hit.index !== undefined && hit.index !== null && result[i] === null) {
                    result[i] = hit.index;              // записываем выбранную карту AI
                    this.energy -= hit.energy;          // уменьшаем кол-во энергии AI
                }
                hit = <IHit>{};
                if (this.energy <= 0) break;
            }
            if (this.energy <= 0) return result;

            // Обработка пустых слотов игрока
            hit = <IHit>{};
            for (let i = 0; i < this.data.playerSlots.length; i++) {
                playerCard = this.data.playerSlots[i];
                if (playerCard === null) {
                    hit = this.getHitCardAI(ATTACK);        // слот игрока пуст - приоритет атакующая карта
                    if (hit.index !== undefined && hit.index !== null && result[i] === null) {
                        result[i] = hit.index;              // записываем выбранную карту AI
                        this.energy -= hit.energy;          // уменьшаем кол-во энергии AI
                    }
                }
                hit = <IHit>{};
                if (this.energy <= 0) break;
            }
            if (this.energy <= 0) return result;

            // Проверка заполненности слотов AI
            hit = <IHit>{};
            for(let i = 0; i < result.length; i++){
                if(result[i] === null){
                    hit = this.getHitCardAI(ATTACK);        // слот AI пуст - приоритет атакующая карта
                    if (hit.index !== undefined && hit.index !== null && result[i] === null) {
                        result[i] = hit.index;              // записываем выбранную карту AI
                        this.energy -= hit.energy;          // уменьшаем кол-во энергии AI
                    }
                }
                hit = <IHit>{};
                if (this.energy <= 0) break;
            }
            return result;
        }

        /* тактика - атака */
        private tacticsAttack(): number[] {
            let result: number[] = [null, null, null];

            return [];
        }

        /* тактика - защита */
        private tacticsDefense(): number[] {
            let result: number[] = [null, null, null];

            return [];
        }


    }
}
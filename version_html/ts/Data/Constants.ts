class Constants {
    public static GAME_WIDTH            = 800;
    public static GAME_HEIGHT           = 600;

    public static PLAYER                = 'player';
    public static OPPONENT              = 'opponent';
    public static PLAYER_AND_OPPONENT   = 'player_and_opponent';

    public static CARD_TYPE_ATTACK      = 'card_type_attack';
    public static CARD_TYPE_DEFENSE     = 'card_type_defense';

    public static ACTIVE_PLAYER         = "active_player";
    public static ACTIVE_OPPONENT       = "active_opponent";
    
    /**
     *  status-1: Ход игрока - игрок выкладывает карты - ИИ ждет				(кнопка - true)
     *  status-2: Ход игрока - игрок положил карты - ИИ выкладыват карты		(кнопка - false)
     *  status-3: Выполняются карты на столе (Атака Игрока)									(кнопка - false)
     *  status-4: Ход ИИ - ИИ выкладывает карты - игрок ждет					(кнопка - false)
     *  status-5: Ход ИИ - ИИ положил карты - игрок выкладывает карты			(кнопка - true)
     *  status-6: Выполняются карты на столе (Атака ИИ)							(кнопка - false)	
     */
    public static STATUS_1_PLAYER_P_PROCESS_AI_WAIT     = 1;
    public static STATUS_2_PLAYER_P_COMPLETE_AI_PROCESS = 2;
    public static STATUS_3_PLAYER_ATTACK                = 3;
    public static STATUS_4_AI_AI_PROCESS_P_WAIT         = 4;
    public static STATUS_5_AI_AI_COMPLETE_P_PROCESS     = 5;
    public static STATUS_6_AI_ATTACK                    = 6;

    public static ANIMATION_TYPE_STANCE     = "animation_type_stance";
    public static ANIMATION_TYPE_BLOCK      = "animation_type_block";
    public static ANIMATION_TYPE_HIT        = "animation_type_hit";
    public static ANIMATION_TYPE_DAMAGE     = "animation_type_damage";
    public static ANIMATION_TYPE_LOSE       = "animation_type_lose";
    public static ANIMATION_TYPE_WIN        = "animation_type_win";
    public static ANIMATION_PLAYER_COMPLETE = "animation_player_complete";
    public static ANIMATION_OPPONENT_COMPLETE = "animation_opponent_complete";
    public static ANIMATION_FLASH_COMPLETE  = "animation_flash_complete";

    public static BUTTON_CONTINUE       = 'button_continue';
    public static BUTTON_PLAY           = 'button_play';
    public static BUTTON_SETTINGS       = 'button_settings';
    public static BUTTON_SETTINGS_CLOSE = 'button_settings_close';
    public static BUTTON_INVATE         = 'button_invate';
    public static BUTTON_BACK           = 'button_back';
    public static BUTTON_NEXT           = 'button_next';
    public static BUTTON_SELECT         = 'button_select';
    public static BUTTON_ARROW_LEFT     = 'button_arrow_left';
    public static BUTTON_ARROW_RIGHT    = 'button_arrow_right';
    public static BUTTON_START_BATTLE   = 'button_start_battle';
    public static BUTTON_EXIT_BATTLE    = 'button_exit_battle';

    public static TIMER_END             = "timer_end";
    public static BUTTON_TABLO          = 'button_tablo';

    public static GAME_OVER             = "game_over";
}
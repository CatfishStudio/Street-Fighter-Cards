package SFCGame 
{
	import SFCGame.fighters.Fighters;
	import flash.display.Sprite;
	import flash.events.Event;
	
	import SFCGame.vkAPI.VKAPI;
	import SFCGame.data.Data;
	import SFCGame.data.Constants;
	import SFCGame.data.Utilits;
	import SFCGame.events.NavigationEvent;
	
	import SFCGame.menu.Menu;
	/**
	 * ...
	 * @author Catfish Studio
	 */
	public class Game extends Sprite 
	{
		private var gameMask:Sprite;
		
		private var menu:Menu;
		private var fighters:Fighters;
		
		public function Game() 
		{
			super();
			addEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
		}
		
		private function onAddedToStage(e:Event):void 
		{
			removeEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
			
			/* Маска -------------------------------------------------------------------------------- */
			gameMask = new Sprite();
			gameMask.graphics.beginFill(0x333333, 1);
			gameMask.graphics.drawRect(0, 0, Constants.GAME_WINDOW_WIDTH, Constants.GAME_WINDOW_HEIGHT);
			gameMask.x = 0; 
			gameMask.y = 0;
			gameMask.graphics.endFill();
			addChild(gameMask)
			mask = gameMask; // применение маски
			/*--------------------------------------------------------------------------------------- */
			
			/* Глобальное событие при выборе, смене окна */
			addEventListener(NavigationEvent.CHANGE_SCREEN, onChangeScreen);
			
			//getSaveGame(); // Загрузка сохранённых данных
			createMenu();
		}
		
		/* MENU ---------------------------- */
		private function createMenu():void
		{
			if(menu == null){
				menu = new Menu();
				addChild(menu);
			}
		}
		
		private function removeMenu():void
		{
			if(menu != null){
				removeChild(menu);
				menu = null;
			}
		}
		/* -------------------------------- */
		
		/* FIGHERS ------------------------ */
		private function createFighters():void
		{
			if(fighters == null){
				fighters = new Fighters();
				addChild(fighters);
			}
		}
		
		private function removeFighters():void
		{
			if(fighters != null){
				removeChild(fighters);
				fighters = null;
			}
		}
		/* -------------------------------- */
		
		/* Событие: управление окнами игры ===================================================== */
		private function onChangeScreen(e:NavigationEvent):void 
		{
			switch(e.param.id)
			{
				case Constants.MENU_BUTTON_CONTINUE:
					Utilits.consoleLog("Button_Continue_Game");
					break;
				
				case Constants.MENU_BUTTON_NEW_GAME: 
					removeMenu();
					createFighters();
					break;
				
				case Constants.MENU_BUTTON_SETTINGS: 
					Utilits.consoleLog("Button_Settings");
					break;
				
				case Constants.MENU_BUTTON_INVITE: 
					Utilits.consoleLog("Button_Ivent");
					break;
					
				default:
					break;
			}
		}
		/* ================================================================================== */
		
		
		
		
	}

}
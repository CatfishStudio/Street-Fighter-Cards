package SFCGame 
{
	import flash.display.Sprite;
	import flash.events.Event;
	
	import SFCGame.vkAPI.VKAPI;
	import SFCGame.data.Data;
	import SFCGame.data.Constants;
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
		
		/* Событие: управление окнами игры ===================================================== */
		private function onChangeScreen(e:NavigationEvent):void 
		{
			switch(e.param.id)
			{
				case Constants.MENU_BUTTON_CONTINUE: 
					break;
				   
				default:
					break;
			}
		}
		/* ================================================================================== */
		
		
		
		
	}

}
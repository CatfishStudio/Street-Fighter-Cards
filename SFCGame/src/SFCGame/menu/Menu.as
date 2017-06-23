package SFCGame.menu 
{
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.display.Bitmap;
	import flash.display.BitmapData;
	import flash.ui.Mouse;
	import flash.ui.MouseCursor;
	
	import SFCGame.utilits.Utilits;
	import SFCGame.data.Data;
	import SFCGame.data.Constants;
	import SFCGame.data.Assets;
	import SFCGame.data.Atlas;
	import SFCGame.data.AtlasAnimation;
	import SFCGame.animation.BigRyuAnimation;
	import SFCGame.animation.BigKenAnimation;
	import SFCGame.buttons.ButtonOrange;
	
	/**
	 * ...
	 * @author Catfish Studio
	 */
	public class Menu extends Sprite 
	{
		private var backgroundBitmap:Bitmap;
		
		private var continueButton:ButtonOrange;
		private var newGameButton:ButtonOrange;
		private var settingsButton:ButtonOrange;
		private var invateButton:ButtonOrange;
		
		private var bigRyuAtlas:AtlasAnimation;
		private var bigRyu:BigRyuAnimation;
		private var bigKenAtlas:AtlasAnimation;
		private var bigKen:BigKenAnimation;
		
		public function Menu() 
		{
			super();
			addEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
			addEventListener(Event.REMOVED_FROM_STAGE, onRemoveFromStage);
		}
		
		private function onAddedToStage(e:Event):void 
		{
			removeEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
			name = Constants.MENU;
			
			createBackground();
			createButtons();
			createAnimation();
		}
		
		private function onRemoveFromStage(e:Event):void 
		{
			removeEventListener(Event.REMOVED_FROM_STAGE, onRemoveFromStage);
			Mouse.cursor = MouseCursor.AUTO;
			
			if (backgroundBitmap != null){
				removeChild(backgroundBitmap);
				backgroundBitmap = null;
			}
			if (newGameButton != null){
				removeChild(newGameButton);
				newGameButton = null;
			}
			if (bigRyu != null){
				removeChild(bigRyu);
				bigRyu = null;
				bigRyuAtlas.clearAtlas();
			}
			if (bigKen != null){
				removeChild(bigKen);
				bigKen = null;
				bigKenAtlas.clearAtlas();
			}
			
			while (this.numChildren > 0)
			{
				this.removeChildren(0);
			}			
		}
		
		private function createBackground():void
		{
			backgroundBitmap = new Bitmap((Assets.assetsTexturesContent.menuBackgroundBitmap as Bitmap).bitmapData);
			backgroundBitmap.x = 0;
			backgroundBitmap.y = 0;
			addChild(backgroundBitmap);
		}
		
		private function createButtons():void
		{
			newGameButton = new ButtonOrange(300, 300, "НАЧАТЬ ИГРУ", 16,  Constants.MENU_BUTTON_NEW_GAME);
			addChild(newGameButton);
			newGameButton = new ButtonOrange(300, 370, "НАСТРОЙКИ", 16,  Constants.MENU_BUTTON_SETTINGS);
			addChild(newGameButton);
			newGameButton = new ButtonOrange(300, 440, "ПРИГЛАСИТЬ", 16,  Constants.MENU_BUTTON_INVITE);
			addChild(newGameButton);
		}
		
		private function createAnimation():void
		{
			bigKenAtlas = new AtlasAnimation(Assets.assetsAtlasesContent.BigKenAtlas, Assets.assetsAtlasesContent.BigKenAtlasXML);
			bigKen = new BigKenAnimation(bigKenAtlas);
			bigKen.scaleX = 0.4;
			bigKen.scaleY = 0.4;
			bigKen.x = 35;
			bigKen.y = 230;
			addChild(bigKen);
			
			bigRyuAtlas = new AtlasAnimation(Assets.assetsAtlasesContent.BigRyuAtlas, Assets.assetsAtlasesContent.BigRyuAtlasXML);
			bigRyu = new BigRyuAnimation(bigRyuAtlas);
			bigRyu.scaleX = 0.4;
			bigRyu.scaleY = 0.4;
			bigRyu.x = 550;
			bigRyu.y = 230;
			addChild(bigRyu);
		}
		
	}

}
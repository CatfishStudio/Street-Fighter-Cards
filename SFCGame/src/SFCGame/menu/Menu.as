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
	
	/**
	 * ...
	 * @author Catfish Studio
	 */
	public class Menu extends Sprite 
	{
		private var backgroundBitmap:Bitmap;
		private var logoBitmap:Bitmap;
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
			createLogo();
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
			if (logoBitmap != null){
				removeChild(logoBitmap);
				logoBitmap = null;
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
		
		private function createLogo():void
		{
			logoBitmap = new Bitmap((Assets.assetsTexturesContent.logoBitmap as Bitmap).bitmapData);
			logoBitmap.x = 150;
			logoBitmap.y = 0;
			addChild(logoBitmap);
		}
		
		private function createAnimation():void
		{
			bigKenAtlas = new AtlasAnimation(Assets.assetsAtlasesContent.BigKenAtlas, Assets.assetsAtlasesContent.BigKenAtlasXML);
			bigKen = new BigKenAnimation(bigKenAtlas);
			bigKen.scaleX = 0.4;
			bigKen.scaleY = 0.4;
			bigKen.x = 35;
			bigKen.y = 250;
			addChild(bigKen);
			
			bigRyuAtlas = new AtlasAnimation(Assets.assetsAtlasesContent.BigRyuAtlas, Assets.assetsAtlasesContent.BigRyuAtlasXML);
			bigRyu = new BigRyuAnimation(bigRyuAtlas);
			bigRyu.scaleX = 0.4;
			bigRyu.scaleY = 0.4;
			bigRyu.x = 550;
			bigRyu.y = 250;
			addChild(bigRyu);
		}
		
	}

}
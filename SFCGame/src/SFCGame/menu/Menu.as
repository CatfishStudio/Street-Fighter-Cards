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
	
	/**
	 * ...
	 * @author Catfish Studio
	 */
	public class Menu extends Sprite 
	{
		private var backgroundBitmap:Bitmap;
		private var logoBitmap:Bitmap;
		private var borderBitmap:Bitmap;
				
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
			
			//Atlas.loadAtlasBitmapData(Assets.assetsAtlasesContent.MenuAtlas, Assets.assetsAtlasesContent.MenuAtlasXML, Atlas.TYPE_TEXTURES);
			//Atlas.loadAtlasBitmapData(Assets.assetsAtlasesContent.ButtonsAtlas, Assets.assetsAtlasesContent.ButtonsAtlasXML, Atlas.TYPE_ANIMATION);
			
			createBackground();
			createLogo();
			createBorder();
		}
		
		private function onRemoveFromStage(e:Event):void 
		{
			removeEventListener(Event.REMOVED_FROM_STAGE, onRemoveFromStage);
			Mouse.cursor = MouseCursor.AUTO;
			
			Atlas.clearAtlases(Atlas.TYPE_TEXTURES);
			Atlas.clearAtlases(Atlas.TYPE_ANIMATION);
			
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
			logoBitmap.x = 0;
			logoBitmap.y = 0;
			addChild(logoBitmap);
		}
		
		private function createBorder():void
		{
			borderBitmap = new Bitmap((Assets.assetsTexturesContent.menuBorderBitmap as Bitmap).bitmapData);
			borderBitmap.x = 0;
			borderBitmap.y = 0;
			addChild(borderBitmap);
		}
		
	}

}
package SFCGame.fighters 
{
	import flash.display.Bitmap;
	import flash.display.Sprite;
	import flash.events.Event;
	
	import SFCGame.utilits.Utilits;
	import SFCGame.data.Data;
	import SFCGame.data.Constants;
	import SFCGame.data.Assets;
	import SFCGame.data.AtlasAnimation;
	import SFCGame.buttons.ButtonOrange;
	
	/**
	 * ...
	 * @author Catfish Studio
	 */
	public class Fighters extends Sprite 
	{
		private var backgroundBitmap:Bitmap;
		private var panelCards:Sprite;
		private var atlas:AtlasAnimation;
		
		public function Fighters() 
		{
			super();
			addEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
			addEventListener(Event.REMOVED_FROM_STAGE, onRemoveFromStage);
		}
		
		private function onAddedToStage(e:Event):void 
		{
			removeEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
			name = Constants.FIGHTERS;
			createBackground();
			createPanel();
		}
		
		private function onRemoveFromStage(e:Event):void 
		{
			removeEventListener(Event.REMOVED_FROM_STAGE, onRemoveFromStage);
			
			if (panelCards != null){
				removeChild(panelCards);
				panelCards = null;
			}
			
			while (this.numChildren)
			{
				this.removeChildren(0);
			}
		}
		
		private function createBackground():void
		{
			backgroundBitmap = new Bitmap((Assets.assetsTexturesContent.fightersBackgroundBitmap as Bitmap).bitmapData);
			backgroundBitmap.x = 0;
			backgroundBitmap.y = 0;
			addChild(backgroundBitmap);
		}
		
		private function createPanel():void
		{
			panelCards = new Sprite();
			panelCards.graphics.beginFill(0xFFFFFF, 1);
			panelCards.graphics.drawRect(0, 0, 90, 90);
			panelCards.graphics.endFill();
			panelCards.x = 0;
			panelCards.y = 0;
			addChild(panelCards);
			
			atlas = new AtlasAnimation(Assets.assetsAtlasesContent.FightersAtlas, Assets.assetsAtlasesContent.FightersAtlasXML);
			panelCards.addChild(new Bitmap(atlas.atlasAnimationsBitmap[0].bitmapData));
		}
		
	}

}
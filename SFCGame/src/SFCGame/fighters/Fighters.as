package SFCGame.fighters 
{
	import flash.display.Bitmap;
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.events.MouseEvent;
	
	import SFCGame.utilits.Utilits;
	import SFCGame.data.Data;
	import SFCGame.data.Constants;
	import SFCGame.data.Assets;
	import SFCGame.data.AtlasAnimation;
	import SFCGame.buttons.ButtonOrange;
	import SFCGame.buttons.ButtonArrow;
	
	/**
	 * ...
	 * @author Catfish Studio
	 */
	public class Fighters extends Sprite 
	{
		private var atlas:AtlasAnimation;
		
		private var backgroundBitmap:Bitmap;
		private var borderBitmap:Bitmap;
		
		private var panelCards:Sprite;
		private var arrowLeftButton:ButtonArrow;
		private var arrowRightButton:ButtonArrow;
		
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
			createArrowButtons();
			createPanel();
			createBorder();
		}
		
		private function onRemoveFromStage(e:Event):void 
		{
			removeEventListener(Event.REMOVED_FROM_STAGE, onRemoveFromStage);
			
			if (panelCards != null){
				while (panelCards.numChildren)
				{
					panelCards.removeChildren(0);
				}
				removeChild(panelCards);
				panelCards = null;
			}
			
			if (arrowLeftButton != null){
				arrowLeftButton.removeEventListener(MouseEvent.CLICK, onArrowLeft);
				removeChild(arrowLeftButton);
				arrowLeftButton = null;
			}
			
			if (arrowRightButton != null){
				arrowRightButton.removeEventListener(MouseEvent.CLICK, onArrowRight);
				removeChild(arrowRightButton);
				arrowRightButton = null;
			}
			
			if (backgroundBitmap != null){
				removeChild(backgroundBitmap);
				backgroundBitmap = null;
			}
			
			if (borderBitmap != null){
				removeChild(borderBitmap);
				borderBitmap = null;
			}
			
			atlas.clearAtlas();
			
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
		
		private function createArrowButtons():void
		{
			arrowLeftButton = new ButtonArrow(230, 185, Constants.FIGHTERS_BUTTON_ARROW_LEFT, "left");
			arrowLeftButton.addEventListener(MouseEvent.CLICK, onArrowLeft);
			addChild(arrowLeftButton);
			
			arrowRightButton = new ButtonArrow(480, 185, Constants.FIGHTERS_BUTTON_ARROW_RIGHT, "right");
			arrowRightButton.addEventListener(MouseEvent.CLICK, onArrowRight);
			addChild(arrowRightButton);
		}
		
		private function onArrowLeft(e:MouseEvent):void 
		{
			panelCards.x += 250;
		}
		
		private function onArrowRight(e:MouseEvent):void 
		{
			panelCards.x -= 250;
		}
		
		private function createPanel():void
		{
			panelCards = new Sprite();
			panelCards.graphics.beginFill(0xFFFFFF, 0);
			panelCards.graphics.drawRect(0, 0, 1, 300);
			panelCards.graphics.endFill();
			panelCards.x = 0;
			panelCards.y = 90;
			addChild(panelCards);
			
			atlas = new AtlasAnimation(Assets.assetsAtlasesContent.FightersAtlas, Assets.assetsAtlasesContent.FightersAtlasXML);
			var count:Number = atlas.atlasAnimationsBitmap.length;
			for (var i:Number = 0; i < count; i++)
			{
				atlas.atlasAnimationsBitmap[i].x = 55 + (250 * i);
				panelCards.addChild(atlas.atlasAnimationsBitmap[i]);
			}
			
		}
		
		private function createBorder():void
		{
			borderBitmap = new Bitmap((Assets.assetsTexturesContent.borderBitmap as Bitmap).bitmapData);
			borderBitmap.x = 0;
			borderBitmap.y = 0;
			addChild(borderBitmap);
		}
		
	}

}
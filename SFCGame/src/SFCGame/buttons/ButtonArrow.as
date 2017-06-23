package SFCGame.buttons 
{
	import flash.display.Sprite;
	import flash.display.BitmapData;
	import flash.events.Event;
	import flash.display.Bitmap;
	import flash.events.MouseEvent;
	import flash.ui.Mouse;
	import flash.ui.MouseCursor;
	
	import SFCGame.data.Assets;
	
	/**
	 * ...
	 * @author Catfish Studio
	 */
	public class ButtonArrow extends Sprite 
	{
		private var type:String;
		private var frameBitmap:Bitmap;
		
		public function ButtonArrow(_x:int, _y:int, _name:String, _type:String = "left") 
		{
			super();
			x = _x;
			y = _y;
			name = _name;
			type = _type;
			addEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
			addEventListener(Event.REMOVED_FROM_STAGE, onRemoveFromStage);
			addEventListener(MouseEvent.MOUSE_OUT, onMouseOutButton);
			addEventListener(MouseEvent.MOUSE_OVER, onMouseOverButton);
		}
		
		private function onAddedToStage(e:Event):void 
		{
			removeEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
			
			if (type == "left")
			{
				frameBitmap = new Bitmap((Assets.assetsTexturesContent.buttonArrowLeftBitmap as Bitmap).bitmapData);
			}else{
				frameBitmap = new Bitmap((Assets.assetsTexturesContent.buttonArrowRightBitmap as Bitmap).bitmapData);
			}
			frameBitmap.x = 0;
			frameBitmap.y = 0;
			addChild(frameBitmap);
		}
		
		private function onRemoveFromStage(e:Event):void 
		{
			removeEventListener(Event.REMOVED_FROM_STAGE, onRemoveFromStage);
			
			removeEventListener(MouseEvent.MOUSE_OUT, onMouseOutButton);
			removeEventListener(MouseEvent.MOUSE_OVER, onMouseOverButton);
			
			if(frameBitmap != null){
				removeChild(frameBitmap);
				frameBitmap = null;
			}
			
			while (this.numChildren > 0)
			{
				this.removeChildren(0);
			}
		}
		
		private function onMouseOutButton(e:MouseEvent):void 
		{
			Mouse.cursor = MouseCursor.AUTO;
		}
		
		private function onMouseOverButton(e:MouseEvent):void 
		{
			Mouse.cursor = MouseCursor.BUTTON;
		}
		
	}

}
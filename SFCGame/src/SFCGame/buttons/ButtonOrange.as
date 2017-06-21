package SFCGame.buttons 
{
	import flash.display.Sprite;
	import flash.display.BitmapData;
	import flash.events.Event;
	import flash.display.Bitmap;
	import flash.events.MouseEvent;
	import flash.ui.Mouse;
	import flash.ui.MouseCursor;
	
	import SFCGame.text.Label;
	import SFCGame.text.LabelCenter;
	import SFCGame.data.Assets;
	import SFCGame.events.NavigationEvent;
	
	/**
	 * ...
	 * @author Catfish Studio
	 */
	public class ButtonOrange extends Sprite 
	{
		private var text:String;
		private var textSize:int = 0;
		private var colorFront:int;
		private var colorBack:int;		
		private var labelBack:LabelCenter;
		private var labelFront:LabelCenter;
		
		private var frameBitmap:Bitmap;
		
		public function ButtonOrange(_x:int, _y:int, _text:String, _textSize:int, _name:String) 
		{
			super();
			x = _x;
			y = _y;
			name = _name;
			text = _text;
			textSize = _textSize;
			addEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
			addEventListener(Event.REMOVED_FROM_STAGE, onRemoveFromStage);
			
			addEventListener(MouseEvent.MOUSE_OUT, onMouseOutButton);
			addEventListener(MouseEvent.MOUSE_OVER, onMouseOverButton);
			addEventListener(MouseEvent.CLICK, onMouseClickButton);
		}
		
		private function onAddedToStage(e:Event):void 
		{
			removeEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
			
			colorBack = 0x000000;
			colorFront = 0xFFFFFF;
			
			
			frameBitmap = new Bitmap((Assets.assetsTexturesContent.buttonStyle1UpBitmap as Bitmap).bitmapData);
			frameBitmap.x = 0;
			frameBitmap.y = 0;
			addChild(frameBitmap);
			
			labelBack = new LabelCenter(5, 15, 170, 20, "arial", textSize, colorBack, text, false);
			addChild(labelBack);
			labelFront = new LabelCenter(6, 17, 170, 20, "arial", textSize, colorFront, text, false);
			addChild(labelFront);
		}
		
		private function onRemoveFromStage(e:Event):void 
		{
			removeEventListener(Event.REMOVED_FROM_STAGE, onRemoveFromStage);
			
			removeEventListener(MouseEvent.MOUSE_OUT, onMouseOutButton);
			removeEventListener(MouseEvent.MOUSE_OVER, onMouseOverButton);
			removeEventListener(MouseEvent.CLICK, onMouseClickButton);
			
			removeChild(frameBitmap);
			frameBitmap = null;
			
			text = null;
			
			removeChild(labelBack);
			labelBack = null;
			removeChild(labelFront);
			labelFront = null;
			
			while (this.numChildren > 0)
			{
				this.removeChildren(0);
			}
		}
		
		private function onMouseOutButton(e:MouseEvent):void 
		{
			Mouse.cursor = MouseCursor.AUTO;
			frameBitmap.bitmapData = (Assets.assetsTexturesContent.buttonStyle1UpBitmap as Bitmap).bitmapData;
		}
		
		private function onMouseOverButton(e:MouseEvent):void 
		{
			Mouse.cursor = MouseCursor.BUTTON;
			frameBitmap.bitmapData = (Assets.assetsTexturesContent.buttonStyle1DownBitmap as Bitmap).bitmapData;
		}
		
		private function onMouseClickButton(e:MouseEvent):void 
		{
			dispatchEvent(new NavigationEvent(NavigationEvent.CHANGE_SCREEN, { id: name }, true));
		}
	}

}
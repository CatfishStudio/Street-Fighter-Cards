package SFCGame.animation 
{
	import flash.display.MovieClip;
	import flash.events.Event;
	import flash.display.Bitmap;
	import flash.display.BitmapData;
	import SFCGame.data.Atlas;
	/**
	 * ...
	 * @author Catfish Studio
	 */
	public class BigRyuAnimation extends MovieClip 
	{
		private var frameBitmap:Bitmap;
		private var frames:Vector.<String>;
		private var count:int = 0;
		
		public function BigRyuAnimation() 
		{
			super();
			addEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
			addEventListener(Event.REMOVED_FROM_STAGE, onRemoveFromStage);
		}
		
		private function onAddedToStage(e:Event):void 
		{
			removeEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
			
			frames = new Vector.<String>();
			frames.push("ken1.png");
			frames.push("ken2.png");
			frames.push("ken3.png");
			frames.push("ken4.png");
			frames.push("ken5.png");
			frames.push("ken6.png");
			frames.push("ken7.png");
			frames.push("ken8.png");
			frames.push("ken9.png");
			frames.push("ken10.png");
			frames.push("ken11.png");
			frames.push("ken12.png");
			frames.push("ken13.png");
			
			frameBitmap = new Bitmap((Atlas.atlasAnimationsBitmapData[frames[count]] as BitmapData));
			addChild(frameBitmap);
			
			addEventListener(Event.ENTER_FRAME, onEnterFrame);
			play();
		}
		
		private function onRemoveFromStage(e:Event):void 
		{
			removeEventListener(Event.REMOVED_FROM_STAGE, onRemoveFromStage);
			stop();
			removeEventListener(Event.ENTER_FRAME, onEnterFrame);
			removeChild(frameBitmap);
			frameBitmap = null;
			frames = null;
			while (this.numChildren > 0)
			{
				this.removeChildren(0);
			}
		}
		
		private function onEnterFrame(e:Event):void 
		{
			count++;
			if (count == frames.length) count = 1;
			frameBitmap.bitmapData = (Atlas.atlasAnimationsBitmapData[frames[count]] as BitmapData);
		}
		
	}

}
package SFCGame.animation 
{
	import flash.display.MovieClip;
	import flash.events.Event;
	import flash.display.Bitmap;
	import flash.display.BitmapData;
	
	import SFCGame.data.AtlasAnimation;
	/**
	 * ...
	 * @author Catfish Studio
	 */
	public class BigKenAnimation extends MovieClip 
	{
		private var frameBitmap:Bitmap;
		private var count:int = 0;
		private var atlas:AtlasAnimation;
		
		public function BigKenAnimation(atlasAnimation:AtlasAnimation) 
		{
			super();
			atlas = atlasAnimation;
			addEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
			addEventListener(Event.REMOVED_FROM_STAGE, onRemoveFromStage);
		}
		
		private function onAddedToStage(e:Event):void 
		{
			removeEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
			
			frameBitmap = new Bitmap(atlas.atlasAnimationsBitmap[count].bitmapData);
			frameBitmap.x = atlas.atlasAnimationsBitmap[count].x;
			frameBitmap.y = atlas.atlasAnimationsBitmap[count].y;
			addChild(frameBitmap);
			
			addEventListener(Event.ENTER_FRAME, onEnterFrame);
			stage.frameRate = 15;
			play();
		}
		
		private function onRemoveFromStage(e:Event):void 
		{
			removeEventListener(Event.REMOVED_FROM_STAGE, onRemoveFromStage);
			stop();
			removeEventListener(Event.ENTER_FRAME, onEnterFrame);
			removeChild(frameBitmap);
			frameBitmap = null;
			while (this.numChildren > 0)
			{
				this.removeChildren(0);
			}
		}
		
		private function onEnterFrame(e:Event):void 
		{
			count++;
			if (count == atlas.atlasAnimationsBitmap.length) count = 1;
			frameBitmap.bitmapData = (atlas.atlasAnimationsBitmap[count].bitmapData);
			frameBitmap.x = atlas.atlasAnimationsBitmap[count].x;
			frameBitmap.y = atlas.atlasAnimationsBitmap[count].y;
		}
	}

}
package SFCPreloader
{
	import flash.display.Sprite;
	import flash.display.Bitmap;
	import flash.events.Event;
	
	/**
	 * ...
	 * @author Catfish Studio
	 */
	
	[SWF(width="800", height="600", frameRate="60", backgroundColor="#ffffff")]
	public class Main extends Sprite 
	{
		[Embed(source = '../../assets/background.png')]
		private var BackgroundImage:Class;
		private var backgroundBitmap:Bitmap = new BackgroundImage();
		private var progressText:Label;
		
		public function Main() 
		{
			if (stage) init();
			else addEventListener(Event.ADDED_TO_STAGE, init);
		}
		
		private function init(e:Event = null):void 
		{
			removeEventListener(Event.ADDED_TO_STAGE, init);
			
			addChild(backgroundBitmap);
			
			progressText = new Label(275, 482, 400, 70, "Arial", 42, 0x000000, "Загрузка 0%", false);
			progressText.text = "Загрузка 0%";
			progressText.scaleX = 0.9;
			progressText.scaleY = 0.9;
			this.addChild(progressText);
		}
		
		public function setValue(valuePercent:int):void
		{
			progressText.text = "Загрузка " + valuePercent.toString() + "%";
		}
		
		public function setText(valueText:String):void
		{
			progressText.text = valueText;
		}
		
		public function getValue():String
		{
			return progressText.text;
		}
		
	}
	
}
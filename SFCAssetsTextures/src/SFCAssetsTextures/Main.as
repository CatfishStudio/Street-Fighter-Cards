package SFCAssetsTextures
{
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.display.Bitmap;
	
	/**
	 * ...
	 * @author Catfish Studio
	 */
	public class Main extends Sprite 
	{
		[Embed(source = '../../assets/menu_background.png')]
		public var MenuBackgroundImage:Class;
		public var menuBackgroundBitmap:Bitmap = new MenuBackgroundImage();
		
		[Embed(source = '../../assets/logo.png')]
		public var LogoImage:Class;
		public var logoBitmap:Bitmap = new LogoImage();
		
		[Embed(source = '../../assets/button_up.png')]
		public var ButtonUpImage:Class;
		public var buttonUpBitmap:Bitmap = new ButtonUpImage();
		
		[Embed(source = '../../assets/button_down.png')]
		public var ButtonDownImage:Class;
		public var buttonDownBitmap:Bitmap = new ButtonDownImage();
		
		public function Main() 
		{
			if (stage) init();
			else addEventListener(Event.ADDED_TO_STAGE, init);
		}
		
		private function init(e:Event = null):void 
		{
			removeEventListener(Event.ADDED_TO_STAGE, init);
			// entry point
		}
		
	}
	
}
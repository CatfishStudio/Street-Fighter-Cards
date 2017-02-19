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
		
		[Embed(source = '../../assets/menu_border.png')]
		public var MenuBorderImage:Class;
		public var menuBorderBitmap:Bitmap = new MenuBorderImage();
		
		[Embed(source = '../../assets/logo.png')]
		public var LogoImage:Class;
		public var logoBitmap:Bitmap = new LogoImage();
		
		[Embed(source = '../../assets/buttons.png')]
		public var ButtonsImage:Class;
		public var buttonsBitmap:Bitmap = new ButtonsImage();
		
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
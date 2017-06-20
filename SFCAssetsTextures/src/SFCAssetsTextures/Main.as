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
		[Embed(source = '../../assets/background_menu.png')]
		public var MenuBackgroundImage:Class;
		public var menuBackgroundBitmap:Bitmap = new MenuBackgroundImage();
		
		[Embed(source = '../../assets/background_fighters.png')]
		public var FightersBackgroundImage:Class;
		public var fightersBackgroundBitmap:Bitmap = new FightersBackgroundImage();
		
		[Embed(source = '../../assets/logo.png')]
		public var LogoImage:Class;
		public var logoBitmap:Bitmap = new LogoImage();
		
		[Embed(source = '../../assets/border.png')]
		public var BorderImage:Class;
		public var borderBitmap:Bitmap = new BorderImage();
		
		[Embed(source = '../../assets/button_style_1_up.png')]
		public var ButtonStyle1UpImage:Class;
		public var buttonStyle1UpBitmap:Bitmap = new ButtonStyle1UpImage();
		
		[Embed(source = '../../assets/button_style_1_down.png')]
		public var ButtonStyle1DownImage:Class;
		public var buttonStyle1DownBitmap:Bitmap = new ButtonStyle1DownImage();
		
		[Embed(source = '../../assets/button_style_2_up.png')]
		public var ButtonStyle2UpImage:Class;
		public var buttonStyle2UpBitmap:Bitmap = new ButtonStyle2UpImage();
		
		[Embed(source = '../../assets/button_style_2_down.png')]
		public var ButtonStyle2DownImage:Class;
		public var buttonStyle2DownBitmap:Bitmap = new ButtonStyle2DownImage();
		
		[Embed(source = '../../assets/button_arrow_left.png')]
		public var ButtonArrowLeftImage:Class;
		public var buttonArrowLeftBitmap:Bitmap = new ButtonArrowLeftImage();
		
		[Embed(source = '../../assets/button_arrow_right.png')]
		public var ButtonArrowRightImage:Class;
		public var buttonArrowRightBitmap:Bitmap = new ButtonArrowRightImage();
		
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
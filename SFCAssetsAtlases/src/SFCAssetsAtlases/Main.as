package SFCAssetsAtlases
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
		[Embed(source = '../../assets/big_ryu.png')]
		public var BigRyuAtlas:Class;
		[Embed(source = '../../assets/big_ryu.xml', mimeType='application/octet-stream')]
		public var BigRyuAtlasXML:Class;
		
		[Embed(source = '../../assets/big_ken.png')]
		public var BigKenAtlas:Class;
		[Embed(source = '../../assets/big_ken.xml', mimeType='application/octet-stream')]
		public var BigKenAtlasXML:Class;
		
		
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
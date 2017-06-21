package SFCGame.utilits 
{
	import flash.net.URLRequest;
	import flash.net.navigateToURL;
	/**
	 * ...
	 * @author Catfish Studio
	 */
	public class Utilits 
	{
		
		public static function randomValue(min:int, max:int):int
		{
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}
		
		public static function consoleLog(message:*):void
		{
			//var url:String = "http://localhost/game/swh/console.php?console=" + String(message);
			var url:String = "http://localhost:8080/console.html?console=" + String(message);
			navigateToURL(new URLRequest(url));
		}
		
	}
}
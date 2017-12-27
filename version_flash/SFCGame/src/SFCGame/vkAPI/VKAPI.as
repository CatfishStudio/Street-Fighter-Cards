package SFCGame.vkAPI 
{
	import vk.APIConnection;
	/**
	 * ...
	 * @author Catfish Studio
	 */
	public class VKAPI 
	{	
		public static var vkConnection:APIConnection;
		
		public static function initVKAPI(flashVars: Object):void
		{
			VKAPI.vkConnection = new APIConnection(flashVars);
		}
		
	}

}
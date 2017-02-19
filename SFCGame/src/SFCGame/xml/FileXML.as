package SFCGame.xml 
{
	import flash.utils.ByteArray;
	/**
	 * ...
	 * @author Catfish Studio
	 */
	public class FileXML 
	{
		
		public static function getFileXML(classFileXML:Class):XML
		{
			var byteArray:ByteArray = new classFileXML();
			return new XML(byteArray.readUTFBytes(byteArray.length));
		}
		
	}

}
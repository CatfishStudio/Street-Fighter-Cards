package SFCGame.data 
{
	import flash.display.Bitmap;
	import flash.display.BitmapData;
	import flash.geom.Point;
	import flash.geom.Rectangle; 
	
	import SFCGame.xml.FileXML;
	import SFCGame.utilits.Utilits;
	/**
	 * ...
	 * @author Catfish Studio
	 */
	public class AtlasAnimation 
	{
		public var atlasAnimationsBitmap:Vector.<Bitmap>;

		public function AtlasAnimation(atlasImage:Class, atlasXML:Class) 
		{
			var bitmap:Bitmap = new atlasImage();
			var fullSizeWidth:int = bitmap.width;
			var fullSizeHeight:int = bitmap.height;
			var backSizeWidth:int = 0;				// xml
			var backSizeHeight:int = 0; 			// xml
			var transparent:Boolean = true;
			var fillColor:uint = 0x000000;
			var rectX1:int = 0;						// xml
			var rectY1:int = 0;						// xml
			var rectX2:int = 0;						// xml
			var rectY2:int = 0;						// xml
			var ptX:int = 0;
			var ptY:int = 0;
			
			var frameX:int = 0;
			var frameY:int = 0;
			var frameName:String;
			var frameBitmap:Bitmap;
			
			atlasAnimationsBitmap = new Vector.<Bitmap>();
			
			var persFileXML:XML = FileXML.getFileXML(atlasXML);
			var count:int = persFileXML.SubTexture.length();
			for (var i:int = 0; i < count; i++)
			{
				frameName = persFileXML.SubTexture[i].attribute("name");
				frameX = int(persFileXML.SubTexture[i].attribute("frameX")) * -1;
				frameY = int(persFileXML.SubTexture[i].attribute("frameY")) * -1;
				
				backSizeWidth = int(persFileXML.SubTexture[i].attribute("width"));
				backSizeHeight = int(persFileXML.SubTexture[i].attribute("height"));
				rectX1 = persFileXML.SubTexture[i].attribute("x");
				rectY1 = persFileXML.SubTexture[i].attribute("y");
				rectX2 = persFileXML.SubTexture[i].attribute("x") + backSizeWidth;
				rectY2 = persFileXML.SubTexture[i].attribute("y") + backSizeHeight;
				
				frameBitmap = getAtlasBitmap(bitmap, fullSizeWidth, fullSizeHeight, backSizeWidth, backSizeHeight, transparent, fillColor, rectX1, rectY1, rectX2, rectY2, ptX, ptY);
				frameBitmap.x = frameX;
				frameBitmap.y = frameY;
				frameBitmap.name = frameName;
				atlasAnimationsBitmap.push(frameBitmap);
			}
		}
		
		private function getAtlasBitmap(_bitmap:Bitmap, _fullSizeWidth:int, _fullSizeHeight:int, _backSizeWidth:int,  _backSizeHeight:int,  _transparent:Boolean, _fillColor:uint, _rectX1:int, _rectY1:int, _rectX2:int, _rectY2:int, _ptX:int, _ptY:int):Bitmap
		{
			// полная картинка
			var imageBD:BitmapData = new BitmapData(_fullSizeWidth, _fullSizeHeight, _transparent, _fillColor);
			// размер выбраной картинки
			var canvasBD:BitmapData = new BitmapData(_backSizeWidth, _backSizeHeight, _transparent, _fillColor);
			//исходный размер
			var rect:Rectangle = new Rectangle(_rectX1, _rectY1, _rectX2, _rectY2);
			// начальная точка
			var pt:Point = new Point(_ptX, _ptY);  
			var bitmap:Bitmap;			
			imageBD = _bitmap.bitmapData;
			canvasBD.copyPixels(imageBD, rect, pt);
			bitmap = new Bitmap(canvasBD);
			return bitmap;
		}
		
		public function clearAtlas():void
		{	
			for (var i:int = 0; i < atlasAnimationsBitmap.length; i++){
				atlasAnimationsBitmap[i].bitmapData.dispose();
				atlasAnimationsBitmap[i] = null;
				atlasAnimationsBitmap.splice(i, 1);
			}
			atlasAnimationsBitmap = null;
		}
		
	}

}
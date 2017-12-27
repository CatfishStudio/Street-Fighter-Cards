package SFCGame.data 
{
	/**
	 * ...
	 * @author Catfish Studio
	 * 
	 * КАК ИСПОЛЬЗОВАВАТЬ:
	 * 		var bitmap:Bitmap;
	 * 		bitmap = new Bitmap((Atlas.atlasTexturesBitmapData['background.jpg'] as BitmapData));
	 * 		addChild(bitmap);
	 */
	
	import flash.display.Bitmap;
	import flash.display.BitmapData;
	import flash.geom.Point;
	import flash.geom.Rectangle; 
	
	import SFCGame.xml.FileXML;
	import SFCGame.utilits.Utilits;
	 
	public class Atlas 
	{
		public static const TYPE_TEXTURES:int = 1;
		public static const TYPE_ANIMATION:int = 2;
		
		public static var atlasTexturesBitmapData:Array;
		public static var atlasAnimationsBitmapData:Array;
		
		public static function getAtlasBitmapData(_bitmap:Bitmap, _fullSizeWidth:int, _fullSizeHeight:int, _backSizeWidth:int,  _backSizeHeight:int,  _transparent:Boolean, _fillColor:uint, _rectX1:int, _rectY1:int, _rectX2:int, _rectY2:int, _ptX:int, _ptY:int):BitmapData
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
			//bitmap = new Bitmap(canvasBD);
			return canvasBD;
		}

		public static function loadAtlasBitmapData(atlasImage:Class, atlasXML:Class, type:int):void
		{
			/*
			 * Как использовать эту функцию
			 * Atlas.loadAtlasBitmapData(Assets.assetsAtlasesContent.MenuAtlas, Assets.assetsAtlasesContent.MenuAtlasXML);
			 * addChild(Atlas.atlasesTextureBitmap['menu_background.jpg']);
			 * */
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
			
			if (type == Atlas.TYPE_TEXTURES) Atlas.atlasTexturesBitmapData = new Array();
			else if (type == Atlas.TYPE_ANIMATION) Atlas.atlasAnimationsBitmapData = new Array();
			
			var persFileXML:XML = FileXML.getFileXML(atlasXML);
			var count:int = persFileXML.SubTexture.length();
			for (var i:int = 0; i < count; i++)
			{
				backSizeWidth = int(persFileXML.SubTexture[i].attribute("width"));
				backSizeHeight = int(persFileXML.SubTexture[i].attribute("height"));
				rectX1 = persFileXML.SubTexture[i].attribute("x");
				rectY1 = persFileXML.SubTexture[i].attribute("y");
				rectX2 = persFileXML.SubTexture[i].attribute("x") + backSizeWidth;
				rectY2 = persFileXML.SubTexture[i].attribute("y") + backSizeHeight;
				if (type == Atlas.TYPE_TEXTURES) Atlas.atlasTexturesBitmapData[persFileXML.SubTexture[i].attribute("name")] = Atlas.getAtlasBitmapData(bitmap, fullSizeWidth, fullSizeHeight, backSizeWidth, backSizeHeight, transparent, fillColor, rectX1, rectY1, rectX2, rectY2, ptX, ptY);
				else if (type == Atlas.TYPE_ANIMATION) Atlas.atlasAnimationsBitmapData[persFileXML.SubTexture[i].attribute("name")] = Atlas.getAtlasBitmapData(bitmap, fullSizeWidth, fullSizeHeight, backSizeWidth, backSizeHeight, transparent, fillColor, rectX1, rectY1, rectX2, rectY2, ptX, ptY);
			}			
		}
		
		public static function clearAtlases(type:int):void
		{
			if(type == Atlas.TYPE_TEXTURES){
				for each(var atbd:BitmapData in Atlas.atlasTexturesBitmapData){
					atbd.dispose();
					atbd = null;
				}
				Atlas.atlasTexturesBitmapData = [];
				Atlas.atlasTexturesBitmapData = null;
			} else if(type == Atlas.TYPE_ANIMATION){			
				for each(var aabd:BitmapData in Atlas.atlasAnimationsBitmapData){
					aabd.dispose();
					aabd = null;
				}
				Atlas.atlasAnimationsBitmapData = [];
				Atlas.atlasAnimationsBitmapData = null;
			}
		}
		
	}

}
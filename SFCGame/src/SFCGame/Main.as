package SFCGame
{
	import flash.display.Bitmap;
	import flash.display.DisplayObject;
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.events.IOErrorEvent;
	import flash.events.ProgressEvent;
	import flash.system.Security;
	import flash.system.ApplicationDomain;
	import flash.system.SecurityDomain;
	import flash.display.Loader;
	import flash.net.URLRequest;
	import flash.system.LoaderContext;
	import flash.display.StageAlign;
	import flash.display.StageScaleMode;
	import flash.display3D.Context3DRenderMode;
	import flash.geom.Rectangle;
	
	import com.vk.MainVKBanner;
	import com.vk.MainVKBannerEvent;
	import com.vk.vo.BannersPanelVO;
	import vk.APIConnection;
	
	import SFCGame.vkAPI.VKAPI;
	import SFCGame.Game;
	import SFCGame.data.Assets;
	
	/**
	 * ...
	 * @author Catfish Studio
	 */
	
	[SWF(width="950", height="730", frameRate="60", backgroundColor="#ffffff")]
	public class Main extends Sprite 
	{
		private var request:URLRequest;
		private var loader:Loader;
		private var loaderContext:LoaderContext;	
		
		private var preloader:Loader;
		private var preloaderContent:*;
		
		private var processStartGame:int = 0;
		
		private var game:Game;
		
		public function Main() 
		{
			if (stage) init();
			else addEventListener(Event.ADDED_TO_STAGE, init);
		}
		
		private function init(e:Event = null):void 
		{
			removeEventListener(Event.ADDED_TO_STAGE, init);
			
			Security.allowDomain("*");
            Security.allowInsecureDomain("*");
						
			loader = new Loader();
			loaderContext = new LoaderContext(false, ApplicationDomain.currentDomain, SecurityDomain.currentDomain);
			//request = new URLRequest("http://app.vk.com/c420925/u99302165/9d1534179d8941.swf"); 
			request = new URLRequest("http://localhost/game/sfc/SFCPreloader.swf");
			loader.contentLoaderInfo.addEventListener(Event.COMPLETE, onComplete);
			loader.contentLoaderInfo.addEventListener(ProgressEvent.PROGRESS, onProgress);
			loader.contentLoaderInfo.addEventListener(IOErrorEvent.IO_ERROR, onError);
			loader.load(request, loaderContext);
		}
		
		private function onProgress(e:ProgressEvent):void 
		{
			if (processStartGame == 1){
				preloaderContent.setValue(Math.round((e.bytesLoaded / e.bytesTotal) * 1));
			}
			if (processStartGame == 2){
				preloaderContent.setValue(Math.round((e.bytesLoaded / e.bytesTotal) * 25));
			}
			if (processStartGame == 3){
				preloaderContent.setValue(Math.round((e.bytesLoaded / e.bytesTotal) * 65));
			}
			if (processStartGame == 4){
				preloaderContent.setValue(Math.round((e.bytesLoaded / e.bytesTotal) * 100));
			}
		}
		
		private function onError(e:IOErrorEvent):void 
		{
			trace("Error!!! " + e.toString() );
		}
		
		private function onComplete(e:Event):void
		{
			trace("Load complete!");
			loader.contentLoaderInfo.removeEventListener(Event.COMPLETE, onComplete);
			loader.contentLoaderInfo.removeEventListener(IOErrorEvent.IO_ERROR, onError);
			loader.contentLoaderInfo.removeEventListener(ProgressEvent.PROGRESS, onProgress);
			
			if (processStartGame == 0){ // SWHPreloader - complete
				processStartGame = 1;
				preloader = loader;
				preloader.x = 0;
				preloader.y = 0;
				addChild(preloader);
				loader = null;
				
				preloaderContent = preloader.content;
				preloaderContent.setValue(5);
				
				loadAssetsData();
			}else if (processStartGame == 1) { // SWHAssetsData - complete
				processStartGame = 2;
				preloaderContent.setValue(10);				
				Assets.assetsDataContent = loader.content;
				loadAssetsAtlases();
				
			}else if (processStartGame == 2){ // SWHAssetsAtlases - complete
				processStartGame = 3;
				preloaderContent.setValue(50);				
				Assets.assetsAtlasesContent = loader.content;
				loadAssetsTextures()
				
				}else if (processStartGame == 3){ // SWHAssetsTextures - complete
				processStartGame = 4;
				preloaderContent.setValue(75);				
				Assets.assetsTexturesContent = loader.content;
				loadAssetsSounds()
				
			}else if (processStartGame == 4) { // SWHAssetsSounds - complete
				preloaderContent.setValue(100);
				Assets.assetsSoundsContent = loader.content;
				
				removeChild(preloader);
				preloader = null;
				preloaderContent = null;
				
				loadGame();
			}
		}
		
		private function loadAssetsData():void{
			loader = new Loader();
			loaderContext = new LoaderContext(false, ApplicationDomain.currentDomain, SecurityDomain.currentDomain);
			//request = new URLRequest("http://app.vk.com/c420925/u99302165/94eb80320ac27b.swf");
			request = new URLRequest("http://localhost/game/sfc/SFCAssetsData.swf");
			loader.contentLoaderInfo.addEventListener(Event.COMPLETE, onComplete);
			loader.contentLoaderInfo.addEventListener(ProgressEvent.PROGRESS, onProgress);
			loader.contentLoaderInfo.addEventListener(IOErrorEvent.IO_ERROR, onError);
			loader.load(request, loaderContext);
		}
		
		private function loadAssetsAtlases():void{
			loader = new Loader();
			loaderContext = new LoaderContext(false, ApplicationDomain.currentDomain, SecurityDomain.currentDomain);
			//request = new URLRequest("http://app.vk.com/c420925/u99302165/94eb80320ac27b.swf");
			request = new URLRequest("http://localhost/game/sfc/SFCAssetsAtlases.swf");
			loader.contentLoaderInfo.addEventListener(Event.COMPLETE, onComplete);
			loader.contentLoaderInfo.addEventListener(ProgressEvent.PROGRESS, onProgress);
			loader.contentLoaderInfo.addEventListener(IOErrorEvent.IO_ERROR, onError);
			loader.load(request, loaderContext);
		}
		
		private function loadAssetsTextures():void{
			loader = new Loader();
			loaderContext = new LoaderContext(false, ApplicationDomain.currentDomain, SecurityDomain.currentDomain);
			//request = new URLRequest("http://app.vk.com/c420925/u99302165/94eb80320ac27b.swf");
			request = new URLRequest("http://localhost/game/sfc/SFCAssetsTextures.swf");
			loader.contentLoaderInfo.addEventListener(Event.COMPLETE, onComplete);
			loader.contentLoaderInfo.addEventListener(ProgressEvent.PROGRESS, onProgress);
			loader.contentLoaderInfo.addEventListener(IOErrorEvent.IO_ERROR, onError);
			loader.load(request, loaderContext);
		}
		
		private function loadAssetsSounds():void{
			loader = new Loader();
			loaderContext = new LoaderContext(false, ApplicationDomain.currentDomain, SecurityDomain.currentDomain);
			//request = new URLRequest("http://app.vk.com/c420925/u99302165/94eb80320ac27b.swf");
			request = new URLRequest("http://localhost/game/sfc/SFCAssetsSounds.swf");
			loader.contentLoaderInfo.addEventListener(Event.COMPLETE, onComplete);
			loader.contentLoaderInfo.addEventListener(ProgressEvent.PROGRESS, onProgress);
			loader.contentLoaderInfo.addEventListener(IOErrorEvent.IO_ERROR, onError);
			loader.load(request, loaderContext);
		}
		
		private function loadGame():void
		{
			//vkInit();
			//loadBanner();
			startGame();
		}
		
		/* Иникиализация ВКонтакте ---------------------------------------------------------------- */
		private function vkInit():void
		{
			var flashVars: Object = stage.loaderInfo.parameters as Object;
			VKAPI.initVKAPI(flashVars);
		}
		/* ---------------------------------------------------------------------------------------- */
		
		/* Загрузка рекламного банера ------------------------------------------------------------- */
		private function loadBanner():void
		{
			var loaderBanner: Loader = new Loader();
			var contextBanner: LoaderContext = new LoaderContext(false, ApplicationDomain.currentDomain);
			contextBanner.securityDomain = SecurityDomain.currentDomain;
			loaderBanner.load(new URLRequest('//api.vk.com/swf/vk_ads.swf'), contextBanner);
			loaderBanner.contentLoaderInfo.addEventListener(Event.COMPLETE, onBannerComplete);
		}
		
		private function onBannerComplete(e:Event):void 
		{
			var ad_unit_id: String = "75957"; // укажите тут свой id
			var block: MainVKBanner = new MainVKBanner(ad_unit_id); // создание баннера и присвоение ему id
			block.x = 860;
			block.y = 0;
			addChild(block); // добавление баннера на сцену
			
			var params: BannersPanelVO = new BannersPanelVO(); // создание класса параметров баннера
			// изменение стандартных параметров:
			params.demo = '1'; // 1 - показывает тестовые баннеры
			
			// вертикальный (AD_TYPE_VERTICAL) или горизонтальный (AD_TYPE_HORIZONTAL) блок баннеров
			params.ad_type = BannersPanelVO.AD_TYPE_VERTICAL; 
			// Вертикальный (AD_UNIT_TYPE_VERTICAL) или горизонтальный (AD_UNIT_TYPE_HORIZONTAL) баннер внутри блока баннеров
			params.ad_unit_type = BannersPanelVO.AD_UNIT_TYPE_VERTICAL;
			params.title_color = '#3C5D80'; // цвет заголовка 
			params.desc_color = '#010206'; // цвет описания
			params.domain_color = '#70777D'; // цвет ссылки
			params.bg_color = '#FFFFFF'; // цвет фона
			params.bg_alpha = 0.8; // прозрачность фона (0 - прозрачно, 1 - непрозрачно)
			
			// размер шрифта. FONT_SMALL, FONT_MEDIUM или FONT_BIG
			params.font_size = BannersPanelVO.FONT_MEDIUM;
			params.lines_color = '#E3E3E3'; // цвет разделителей
			params.link_color = '#666666'; // цвет надписи "Реклама ВКонтакте"
			params.ads_count = 3; // количество выдаваемых баннеров
			params.ad_width = 150; // максимальная ширина блока
			block.initBanner(this.loaderInfo.parameters, params); // инициализация баннера
			
			
			block.addEventListener(MainVKBannerEvent.LOAD_COMPLETE, this.banner_onLoad);
			block.addEventListener(MainVKBannerEvent.LOAD_IS_EMPTY, this.banner_onAdsEmpty);
			block.addEventListener(MainVKBannerEvent.LOAD_ERROR, this.banner_onError);
		}
		
		private function banner_onLoad(e: Event) : void 
		{
			// прячете альтернативную рекламу, в случае, если она показана
			trace('Main.banner_onLoad :');
		}
		
		private function banner_onAdsEmpty(e: Event) : void 
		{
			// показываете альтернативную рекламу
			trace('Main.banner_onAdsEmpty :');
		}
		
		private function banner_onError(e: Event) : void 
		{
			var event: MainVKBannerEvent = e as MainVKBannerEvent;
			trace('Main.banner_onError :', event.errorMessage, event.errorCode);
		}
		/* ---------------------------------------------------------------------------------------- */
		
		/*-- ЗАПУСК ИГРЫ -------------------------------------------------------------------------- */
		private function startGame():void
		{
			game = new Game();
			addChild(game);
		}
		/* ---------------------------------------------------------------------------------------- */
		
		
	}
	
}
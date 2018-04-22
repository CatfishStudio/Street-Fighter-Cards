class SocialVK {
    public static vkInvite():void {
        //VK.callMethod("showInviteBox");
    }

    public static vkWallPost():void {
        if(GameData.Data.progressIndex > 0){
            let postPers:GameData.IPersonage = GameData.Data.personages[GameData.Data.tournamentListIds[GameData.Data.progressIndex-1]];
            //VK.api("wall.post", {message: 'Я одержал победу в схватке с ' + postPers.name + ' в игре Street Fighter Cards.\nДрузья присоединяйтесь к игре https://vk.com/app5883565', attachments: 'photo-62618339_456239021'}); 
        }
        
    }

    public static vkWallPostWin():void {
        //VK.api("wall.post", {message: 'Примите поздравления! Вы победили всех соперников в игре Street Fighter Cards.\nДрузья присоединяйтесь к игре https://vk.com/app5883565', attachments: 'photo-62618339_456239022'}); 
    }
}
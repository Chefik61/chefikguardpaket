────────────────────────────────────────────────────────────────────────────────────────────────────

config.json Kısmını Nasıl Doldururum ? ;

{
  "TOKEN": "TOKEN", // Discord Developer Portaldan Aldığınız Tokeni Giriceksiniz
  "botSes": "ID",   // Botun Giriceği Ses Kanalının ID sini Giriceksiniz
  "status": "STATUS", // Botun Durumunda Ne Yazıcağını Giriceksiniz 
  "sahip": "ID", // Bot Sahibinin, Yani Kendi ID nizi Giriceksiniz.
  "prefix": "PREFIX", // Botun Ön Ekini ( . , ! , - vb.) Giriceksiniz.
  "guildID": "ID", //Sunucunuzun ID sini Giriceksiniz
  "booster": "ID", //Sunucunuzun Booster Rolünün ID sini Giriceksiniz
  "jail": "ID", //Sunucunuzun JAIL Rolünün ID sini Giriceksiniz.
  
  "Log": {
    "ChannelLog": "ID", //Kanal İle İlgili Logların Atılacağı Kanalın ID sini Giriceksiniz
    "RoleLog": "ID", //Rol İle İlgili Logların Atılacağı Kanalın ID sini Giriceksiniz
    "GuildUpdateLog": "ID", //Sunucu İle İlgili Logların Atılacağı Kanalın ID sini Giriceksiniz
    "BotAddLog": "ID", //Bot Ekleme İle İlgili Logların Atılacağı Kanalın ID sini Giriceksiniz 
    "KickLog": "ID", //Kick İle İlgili Logların Atılacağı Kanalın ID sini Giriceksiniz
    "BanLog": "ID" //Ban İle İlgili Logların Atılacağı Kanalın ID sini Giriceksiniz
  }
}

────────────────────────────────────────────────────────────────────────────────────────────────────

whitelist.json , güvenli.json ' u Nasıl Kullanırım ? ;

WhiteListte ki Kişiler Guard Botunun Korumasından Etkilenmeyen Dokunulmaz Kişilerdir.

Bir Kullanıcıyı WhiteList'e Eklemek İsterseniz whitelist.json ' a gelip

"ID" İle Belirttiğim Yere Güvenli Kişinin ID sini Giriceksiniz

Daha Fazla Kişi Girmek İsterseniz

Örn : {"güvenli": ["ID","ID","ID"]} ' Ye Bir Kullanıcı Daha Eklemek İstersek

{"güvenli": ["ID","ID","ID","ID"]} Şeklinde ,"ID" Koyabilirsiniz...

────────────────────────────────────────────────────────────────────────────────────────────────────

Botun Koruyacağı Şeyler ;

1 | Sunucu Güncelleme

2 | Bot Ekleme 

3 | Sağ Tık Kick

4 | Sağ Tık Ban

5 | Rol Oluşturma

6 | Rol Silme

7 | Kanal Oluşturma

8 | Kanal Silme

────────────────────────────────────────────────────────────────────────────────────────────────────

Anlattığım Her Şeyi Doğru Yaptığınızdan Emin Olun

moduleinstaller.bat ile modulleri teker teker kurmanıza gerek kalmaz.

İstediğiniz Gibi Kullanabilirsiniz.

Bir Hata Oluşursa;

Discord : chefik.#1467

İyi Kodlamalar...

────────────────────────────────────────────────────────────────────────────────────────────────────
const { Discord, Client, MessageEmbed } = require("discord.js");
const config = require('./config.json')
const whitelist = require('./safed.json')
const client = new Client({
  ignoreDirect: true,
  ignoreRoles: true,
  ignoreEveryone: true
});
require('events').EventEmitter.defaultMaxListeners = Infinity; 


client.on("ready", async () => {
   client.user.setPresence({ activity: { name: config.status }, status: "online" });
  let botVoice = client.channels.cache.get(config.botSes);
  if (botVoice) botVoice.join().catch(err => console.error("Ses Kanalına Bağlanırken Bir Hata Oluştu."));
});

client.login(config.TOKEN).catch(err => console.log('Tokene Bağlanırken Bir Hata Oluştu.'));
client.once('ready', () => {
  console.log('Bot Aktifleştirildi')
})

client.on("message", async message => {
  if (message.author.bot || !message.guild || !message.content.toLowerCase().startsWith(config.prefix)) return;
  if (message.author.id !== config.sahip && message.author.id !== message.guild.owner.id) return;
  let args = message.content.split(' ').slice(1);
  let command = message.content.split(' ')[0].slice(config.prefix.length);
  let embed = new MessageEmbed().setColor("0xFFFFFF").setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true, })).setTimestamp();

  
  if(command === "güvenli") {
        let safemember = whitelist.güvenli || [];

        message.channel.send(embed.addField("White List", safemember.length > 0 ? safemember.map(g => (message.guild.roles.cache.has(g.slice(1)) || message.guild.members.cache.has(g.slice(1))) ? (message.guild.roles.cache.get(g.slice(1)) || message.guild.members.cache.get(g.slice(1))) : g).join('\n') : "White List iniz Boş"));

  }

  //-------------------------- GÜVENLİ LİSTE EKLEME SİLME --------------------------\\
if (command === "güvenli") {
  let hedef;
  let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find(r => r.name === args.join(" "));
  let uye = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
  if (rol) hedef = rol;
  if (uye) hedef = uye;
  let guvenliler = whitelist.güvenli || [];
  if (!hedef) return message.channel.send(new MessageEmbed()
  .setColor("RANDOM")
  .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true, }))
  .setDescription(`Güvenli Listeye Bir Kullanıcı Eklemek/Çıkarmak İçin Bir Rol/Kullanıcı Etiketleyiniz`)
  .addField("Güvenli Liste", guvenliler.length > 0 ? guvenliler.map(g => (message.guild.roles.cache.has(g.slice(1)) || message.guild.members.cache.has(g.slice(1))) ? (message.guild.roles.cache.get(g.slice(1)) || message.guild.members.cache.get(g.slice(1))) : g).join('\n') : "Güvenli Listede Kimse Yok"))
  .setFooter("ChefikXD")
  if (guvenliler.some(g => g.includes(hedef.id))) {
    guvenliler = guvenliler.filter(g => !g.includes(hedef.id));
    ayarlar.whitelist = guvenliler;
    fs.writeFile("./whitelist.json", JSON.stringify(ayarlar), (err) => {
      if (err) console.log(err);
    });
    const güvenlikaldir = new MessageEmbed()
  .setColor("RANDOM")
  .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true, }))
  .setDescription(`${hedef}, ${message.author} Tarafından Güvenli Listeden Kaldırıldı!`)    
  .setFooter("ChefikXD")
    message.channel.send(güvenlikaldir);
  } else {
    whitelist.güvenli.push(`y${hedef.id}`);
    fs.writeFile("./whitelist.json", JSON.stringify(ayarlar), (err) => {
      if (err) console.log(err);
    });
    const güvenliekle = new MessageEmbed()
  .setColor("RANDOM")
  .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true, }))
  .setDescription(`${hedef}, ${message.author} Tarafından Güvenli Listeye Eklendi`)    
  .setFooter("ChefikXD")
    message.channel.send(güvenliekle);
  };
};
//-------------------------- GÜVENLİ LİSTE EKLEME SİLME --------------------------\\

  if(command === "ytkapat") {
    let guildID = config.guildID;
    let sunucu = client.guilds.cache.get(guildID);
    if (!sunucu) return;
    sunucu.roles.cache.filter(r => r.editable && (r.permissions.has("ADMINISTRATOR") || r.permissions.has("MANAGE_GUILD") || r.permissions.has("MANAGE_ROLES") || r.permissions.has("MANAGE_WEBHOOKS"))).forEach(async r => {
      await r.setPermissions(0);
    });
    message.channel.send(new MessageEmbed().setColor("0xFFFFFF").setTitle('Permleri Sıfırladım').setDescription(`Roller Kapalı`).setTimestamp()).catch(); 
  };
})


function güvenli(strg) {
  let member = client.guilds.cache.get(config.guildID).members.cache.get(strg);
  let guvenliler = whitelist.güvenli || [];
  if (!member || member.id === client.user.id || member.id === config.sahip || member.id === member.guild.owner.id || guvenliler.some(g => member.id === g.slice(1) || member.roles.cache.has(g.slice(1)))) return true
  else return false;
};

const yetkiPermleri = ["ADMINISTRATOR", "MANAGE_ROLES", "MANAGE_CHANNELS", "MANAGE_GUILD", "BAN_MEMBERS", "KICK_MEMBERS", "MANAGE_NICKNAMES", "MANAGE_EMOJIS", "MANAGE_WEBHOOKS"];
function punish(strg, hammer) {
  let member = client.guilds.cache.get(config.guildID).members.cache.get(strg);
  if (!member) return;
  if (hammer == "jail") return member.roles.cache.has(config.booster) ? member.roles.set([config.booster, config.jail]) : member.roles.set([config.jail]).catch(err => console.log('Kullanıcıyı Sunucudan Yasaklayamadım'));
  if (hammer == "ban") return member.ban({ reason: " Yasaklandı." }).catch(err => console.log('Bir Hata Meydana Geldi'));
};


client.on('guildUpdate', async (oldGuild, newGuild) => {
  let chefik = await newGuild.fetchAuditLogs({type: 'GUILD_UPDATE'}).then(audit => audit.entries.first());
  if (!chefik || !chefik.executor || güvenli(chefik.executor.id)) return ;
  punish(chefik.executor.id, "ban");
  if (newGuild.name !== oldGuild.name) newGuild.setName(oldGuild.name);
  if (newGuild.iconURL({dynamic: true, size: 2048}) !== oldGuild.iconURL({dynamic: true, size: 2048})) newGuild.setIcon(oldGuild.iconURL({dynamic: true, size: 2048}));
  client.channels.cache.get(config.Log.GuildUpdateLog).send(new MessageEmbed().setTitle('**Bir Üye Sunucuyu Güncelledi**').setColor("0xFFFFFF").setTimestamp().setDescription(`${chefik.executor} (\`${chefik.executor.id}\`) İsimli Kullanıcı Sunucuyu Güncelledi. \n Ayarlar Sıfırlandı , ${chefik.executor} Sunucudan Banlandı .`))
})

client.on('guildMemberAdd', async member => {
  let chefik = await member.guild.fetchAuditLogs({type: 'BOT_ADD'}).then(audit => audit.entries.first());
  if (!member.user.bot || !chefik || !chefik.executor || güvenli(chefik.executor.id)) return;
  punish(chefik.executor.id, "ban");
  punish(member.id, "ban");
  client.channels.cache.get(config.Log.BotAddLog).send(new MessageEmbed().setTitle('**Bir Kullanıcı Sunucuya Bot Ekledi**').setColor("RED").setTimestamp().setDescription(`${chefik.executor} (\`${chefik.executor.id}\`) İsimli Kullanıcı Tarafından bot eklendi. \n ${chefik.executor} İsimli Kullanıcıyı , ${member} Adlı Botu banladım.`).addField('Sunucuya Eklenen BOT', member))
})

client.on("guildMemberRemove", async member => {
  let chefik = await member.guild.fetchAuditLogs({type: 'MEMBER_KICK'}).then(audit => audit.entries.first());
  if ( !chefik || !chefik.executor || güvenli(chefik.executor.id)) return;
  punish(chefik.executor.id, "ban")
  client.channels.cache.get(config.Log.KickLog).send(new MessageEmbed().setTitle('**Bir Kullanıcı Kick Komutunu Kullandı**').setColor("RED").setTimestamp().setDescription(`${chefik.executor} (\`${chefik.executor.id}\`) İsimli Kullanıcı Kick Komudunu Kullandı.`).addField('Sunucudan Kicklenen Kullanıcı', member))
})

client.on('guildBanAdd', async (guild, user) => {
  let chefik = await guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'}).then(audit => audit.entries.first());
  if (!chefik || !chefik.executor || güvenli(chefik.executor.id)) return;
  punish(chefik.executor.id, "ban");
  guild.members.unban(user.id, "Bir Kullanıcı Sağ Tık İle Ban Attığından Yasağı Kaldırdım.").catch(err => console.log('Kişinin banını açamadım. Satır 116'))
  client.channels.cache.get(config.Log.BanLog).send(new MessageEmbed().setTitle('**Bir Kullanıcı Ban Komutunu Kullandı**').setColor("RED").setTimestamp().setDescription(`${chefik.executor} (\`${chefik.executor.id}\`) İsimli Kullanıcı Ban Komudunu Kullandı. \n ${chefik.executor} İsimli Kullanıcıyı Banladım , \`${user}\` Adlı Kullanıcının Banını Açtım.`).addField('Sunucudan Banlanan Kullanıcı', user))

})

client.on('roleCreate', async role => {
  let chefik = await role.guild.fetchAuditLogs({type: 'ROLE_CREATE'}).then(audit => audit.entries.first());
  if (!chefik || !chefik.executor || güvenli(chefik.executor.id)) return;
  role.delete({reason: "Silindi."})
  punish(chefik.executor.id, "jail")
  client.channels.cache.get(config.Log.RoleLog).send(new MessageEmbed().setTitle('**Bir Kullanıcı Rol Oluşturdu**').setColor("RED").setTimestamp().setDescription(`${chefik.executor} (\`${chefik.executor.id}\`) İsimli Kullanıcı Sunucuda Rol Oluşturdu.  \n ${chefik.executor} İsimli Kullanıcıyı  Jaile Attım , açılan rolü sildim.`))
})

client.on('roleDelete', async role => {
  let chefik = await role.guild.fetchAuditLogs({type: 'ROLE_CREATE'}).then(audit => audit.entries.first());
  if (!chefik || !chefik.executor || güvenli(chefik.executor.id)) return;
  role.Create({reason: "Silindi."})
  punish(chefik.executor.id, "jail")
  client.channels.cache.get(config.Log.RoleLog).send(new MessageEmbed().setTitle('**Bir Kullanıcı Rol Sildi**').setColor("RED").setTimestamp().setDescription(`${chefik.executor} (\`${chefik.executor.id}\`) İsimli Kullanıcı Sunucuda Rol Sildi.  \n ${chefik.executor} İsimli Kullanıcıyı  Jaile Attım , Silinen Rolü Açtım`))
})

client.on('channelCreate', async channel => {
  let chefik = await channel.guild.fetchAuditLogs({type: 'CHANNEL_CREATE'}).then(audit => audit.entries.first());
  if (!chefik || !chefik.executor || güvenli(chefik.executor.id)) return;
  channel.delete({reason: 'Silindi.'})
  punish(chefik.executor.id, "jail")
  client.channels.cache.get(config.Log.ChannelLog).send(new MessageEmbed().setTitle('**Bir Kullanıcı Kanal Oluşturuldu**').setColor("RED").setTimestamp().setDescription(`${chefik.executor} (\`${chefik.executor.id}\`) İsimli Kullanıcı Sunucuda  Kanal oluşturuldu \n ${chefik.executor} İsimli Kullanıcıyı Jaile Attım , Oluşturulan Kanal Silindi.`))
})

client.on("channelDelete", async channel => {
  let chefik = await channel.guild.fetchAuditLogs({type: 'CHANNEL_DELETE'}).then(audit => audit.entries.first());
  if (!chefik || !chefik.executor || güvenli(chefik.executor.id)) return;
  punish(chefik.executor.id, "ban");
  await channel.clone({ reason: "Oluşturuldu." }).then(async kanal => {
    if (channel.parentID != null) await kanal.setParent(channel.parentID);
    await kanal.setPosition(channel.position);
    if (channel.type == "category") await channel.guild.channels.cache.filter(k => k.parentID == channel.id).forEach(x => x.setParent(kanal.id));
  });
  client.channels.cache.get(config.Log.ChannelLog).send(new MessageEmbed().setTitle('**Bir Kullanıcı Sunucuda Kanal Sildi**').setColor("RED").setTimestamp().setDescription(`${chefik.executor} (\`${chefik.executor.id}\`) İsimli Kullanıcı Sunucuda  kanal sildi. \n ${chefik.executor} İsimli Kullanıcıyı  banladım , Kanal Yeniden Oluşturuldu. \n Kanal Sıfırlandığından Mesajlar Silinmiştir.`).addField('Sunucuda Silinen Kanal', channel))

});





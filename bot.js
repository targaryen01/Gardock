const Discord = require('discord.js');
const client = new Discord.Client();

  
  client.on('message',rebel =>   {
 var prefix = "#";
    if(rebel.author.bot) return;
  
    if(rebel.content.startsWith(prefix + "طلب")) {
          let args = rebel.content.split(' ').slice(1).join(' ');
      if(!args) return rebel.channel.send("** الرجآء كتآبة طلبك **");
   rebel.delete(5000);
  
  rebel.channel.send(`محتوى الطلب   
  \n\`${args}\`
  
 ** لو تريد آكمآل طلبك آضغط على علامة صح **
 ** لو تريد آيقآف الطلب و عدم الآكمال آضغط على آلغآء **
      `).then(msg => {
     msg.react('❌')
     .then(() => msg.react('✅')).then((collected) => {
    msg.delete(15000);
     
     
          let rebel1Filter = (reaction, user) => reaction.emoji.name === '✅' && user.id === rebel.author.id;
      let rebel2Filter = (reaction, user) => reaction.emoji.name === '❌' && user.id === rebel.author.id;
  
      let yes = msg.createReactionCollector(rebel1Filter,{maxMatches : 1,time : 15000,});
      let no = msg.createReactionCollector(rebel2Filter, {maxMatches : 1,time : 15000,});
  
      yes.on("collect", r => {
  rebel.guild.channels.get("477956643594960896").send(`
  ** طلب جديد ! **
  ------------,------------
  **${args}**
  ------------,------------
  ** الطلب من طرف ** : ${rebel.author}`).then((dd) =>{
  dd.react("✅")
  dd.react("❌")
  })
          })
         
   no.on("collect", r => {
          msg.delete();
          rebel.channel.send(`** تم آلغآء طلبك **`).then(m => m.delete(5000));
})})})}});

client.login(process.env.BOT_TOKEN);

const Discord = require("discord.js");
const data = require(__dirname+"/data.json");
const request = require('request');
const fs = require('fs');

async function toEmbed(KingEmbed, message){

	if(KingEmbed === "help"){
		return help
	}

	let attachment;
	let attachments = message.attachments.filter(a=>{return (
		a.filename.endsWith(".jpg") ||
		a.filename.endsWith(".jpeg") ||
		a.filename.endsWith(".png") ||
		a.filename.endsWith(".gif")
	)})
	if(attachments.size>0){
		let a = attachments.first()
		await request(a.url).pipe(fs.createWriteStream(__dirname+"/temp/"+a.filename))
		attachment = __dirname+"/"+a.filename
	}

	let content = KingEmbed.slice(0);
	
	let condition = (txt,t1,t2) => txt.includes(t1)&&txt.includes(t2)&&txt.indexOf(t1)<txt.indexOf(t2);
	let rogner = (txt,t1,t2) => txt.slice(txt.indexOf(t1)+t1.length,txt.indexOf(t2));
	let replaceOne = (t1,t2,fn) =>{
		if(condition(content,t1,t2)){
			let item = rogner(content,t1,t2);
			if(typeof fn === "function") {content = fn(t1,t2,item)}
			else{content = content.replace(t1+item+t2,"")}
			return item
		}	return null
	}
	let replaceAll = (t1,t2,fn) => {
		let items = [];
		while(condition(content,t1,t2)){
			items.push(replaceOne(t1,t2,fn));
		}	return items;
	}
	let args = (txt) => {
		if(condition(txt,'{','}')){
			let tmp = rogner(txt,'{','}');
			return [
				txt.replace(`{${tmp}}`,""),
				tmp
			];
		}
		return [txt]	
	};

	let date = new Date()
	for(hex in data.colors){
		let reg = new RegExp(data.colors[hex],"g")
		content = content.replace(reg,hex)
	}
	content = content
		.replace(/{guild}/g,		`${message.guild.name}{${message.guild.iconURL}}`)
        .replace(/{user}/g,			`${message.author.username}{${message.author.avatarURL}}`)
        .replace(/{guild name}/g,		message.guild.name)
        .replace(/{guild image}/g,		message.guild.iconURL)
        .replace(/{user name}/g,		message.author.username)
        .replace(/{user image}/g,		message.author.avatarURL)
        .replace(/{date}/g,		`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`)
        .replace(/{hour}/g,		`${date.getHours()}:${date.getMinutes()}H`)

	replaceAll('e[',']e',function(t1,t2,item){
		return content.replace(t1+item+t2,
			`${message.client.emojis.find(e=>e.name.includes(item))||"`[NaE]`"}`
		);
	});
	replaceAll('u[',']u',function(t1,t2,item){
		let emoji = message.client.emojis.find(e=>e.name.includes(item))
		return content.replace(t1+item+t2,
			emoji?emoji.url:"`[NaE]`"
		);
	});
	let title = replaceOne('t[',']t')
	let image = replaceOne('i[',']i')
	let thumb = replaceOne('l[',']l')
	let footer = replaceOne('b[',']b')
	let author = replaceOne('a[',']a')
	let color = replaceOne('c[',']c')
	let fields = replaceAll('f[',']f')
	let embed = new Discord.RichEmbed()
	if(content.includes("{time}")) {
    	content = content.replace("{time}","")
    	embed.setTimestamp()
    }
	content = content.trim()
	if(title) embed.setTitle(title);
    if(author) embed.setAuthor(args(author)[0],args(author)[1]);
	if(footer) embed.setFooter(args(footer)[0],args(footer)[1]);
	if(image) embed.setImage(image);
	if(color){
		for(hex in data.colors){
			let newRegex = data.colors[hex].replace(/({|})/g,"")
			let reg = new RegExp(newRegex,"g")
			color = color.replace(reg,hex)
		}
		try{
			embed.setColor(color)
		}catch(err){
			embed.setColor(Number(color)||"DEFAULT")
		}
	};
	if(thumb) embed.setThumbnail(thumb);
	if(content) embed.setDescription(content);
	if(attachment) embed.attachFile(attachment);
	if(fields.length>25) fields=fields.slice(0,24);
	fields.forEach(function(field){
		if(!field.trim()) return embed.addBlankField(true);
		if(field.trim()==="📌") return embed.addBlankField(false);
		let a = args(field)
		let inline = false
		if(a[0].includes("📌")){
			a[0] = a[0].replace("📌","")
			inline = true
		}
		if(a[1].includes("📌")){
			a[1] = a[1].replace("📌","")
			inline = true
		}
		if(a[1].length>1020)return;
		embed.addField(a[0],a[1],inline)
	})
	return embed
}

function byEmbed(RichEmbed){
	let KingEmbed = []
	if(RichEmbed.title){
		KingEmbed.push(`t[${RichEmbed.title}]t`)
	}
	if(RichEmbed.description){
		KingEmbed.push(RichEmbed.description)
	}
	if(RichEmbed.color){
		KingEmbed.push(`c[${RichEmbed.color}]c`)
	}
	RichEmbed.fields.forEach(field=>{
		KingEmbed.push(`f[${field.name}{\n${field.value}\n}]f`)
	})
	if(RichEmbed.timestamp){
		KingEmbed.push("{time}")
	}
	if(RichEmbed.thumbnail){
		KingEmbed.push(`l[${RichEmbed.thumbnail}]l`)
	}
	if(RichEmbed.image){
		KingEmbed.push(`i[${RichEmbed.image}]i`)
	}
	if(RichEmbed.author){
		KingEmbed.push(`a[${RichEmbed.author.name}{\n${RichEmbed.author.iconURL}\n}]a`)
	}
	if(RichEmbed.footer){
		KingEmbed.push(`b[${RichEmbed.footer.text}{\n${RichEmbed.footer.iconURL}\n}]b`)
	}
	return KingEmbed.join(" ")
}

module.exports = {
	toEmbed : toEmbed,
	byEmbed : byEmbed
}

let help = new Discord.RichEmbed()
	.setAuthor("KingEmbed Help","https://jeu.video/wp-content/uploads/2018/03/discord-icon-7.png")
	.setDescription("KingEmbed vous sert à créer entièrement un RichEmbed de façon textuelle. Pour cela il vous suffit de connaitre les balises spécifiques. En voici une liste.")
	.addField("LES BALISES",`
Les balises servent à compléter l'embed.
Les x[**arg**]x reçoivent un argument textuel.
Les {key} doivent être écrits comme tels.
Les x[**arg**{**arg**}]x reçoivent un argument **plus** un argument falcutatif.`,false)
	.addField("Rich-Balises",`
t[**title**]t *set title*
i[**url**]i *set image*
l[**url**]l *set thumbnail*
c[**color**]c *set color*
{time} *set timestamp*
b[**text**{**url**}]b *set footer*
a[**name**{**url**}]a *set author*
f[]f *add inline blank field*
f[📌]f *add blank field*
f[**name**{**value**}]f *add inline field*
f[📌**name**{**value**}]f *add field*`,true)
	.addField("Content-Balises",`
e[**emojiName**]e *emoji*
u[**emojiName**]u *emoji url*
{guild} *guild name{guild image}*
{guild name} *guild name*
{guild image} *guild image*
{user} *user name{user image}*
{user name} *user name*
{user image} *user image*
{hour} *HH:MM*
{date} *DD-MM-YYYY*
{**colorName**} *hex color*`,true)
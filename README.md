# KingEmbed - Convert text to RichEmbed

Pour utiliser cette fonction, vous devez importer la fonction avec un require. ce paquet est avant-tout créé pour les commandes `embed` de vos bots discord.js. 

```js
const {toEmbed,byEmbed} = require("kingembed")
```
Vous pouvez ensuite utilier KingEmbed de cette façon ↓  
```js
// Récupérer un embed à partir de texte ↓
let embed = toEmbed(texte)

// Récupérer l'embed d'aide de la fonction ↓
let embed = toEmbed("help")

// Récupérer un embed stocké dans un .txt ↓
let fs = require('fs')
let file = fs.readFileSync('./embed.txt',{
	encoding:"utf8"
})
let embed = toEmbed(file)

// Pour utiliser les balises de remplacement ↓
let embed = toEmbed(texte,message)
```
La methode `byEmbed(embed)` sert à convertir un RichEmbed en string au format KingEmbed. Pratique pour récupérer le code d'un embed déjà envoyé.

## Créez un embed a partir de balises

Les balises servent à compléter l'embed.  
Les x[**arg**]x reçoivent un argument textuel  
Les {key} doivent être écrits comme tels  
Les x[**arg**{**arg**}]x reçoivent **deux** arguments  

### Les RichBalises

- t[**titre**]t *setTitle*
- i[**url**]i *setImage*
- l[**url**]l *setThumbnail*
- c[**hexColor**]c *setColor*
- {time} *setTimestamp*
- b[**text**{**url**}]b *setFooter*
- a[**name**{**url**}]a *setAuthor*
- f[**name**{**value**}]f *addField*

### Les balises de remplacement

- e[**emojiName**]e *emoji*
- u[**emojiName**]u *emoji.url*
- {guild name}
- {guild image}
- {user name}
- {user image}
- {hour} *HH:MM*
- {date} *DD-MM-YYYY*
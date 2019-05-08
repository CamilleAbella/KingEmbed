# KingEmbed - Convert text to RichEmbed

Pour utiliser cette fonction, vous devez importer la fonction avec un require. ce paquet est avant-tout créé pour les commandes `embed` de vos bots discord.js. 

## Install KingEmbed

`npm i kingembed`

## Use KingEmbed

### Require KingEmbed

```js
const {toEmbed,byEmbed} = require("kingembed")
```

### Convert string (KingEmbed) to embed (RichEmbed)

```js
let RichEmbed = await toEmbed(KingEmbed,discordMessage)
```

### Convert embed (RichEmbed) to string (KingEmbed)

```js
let KingEmbed = byEmbed(RichEmbed)
```

### Get help-menu of KingEmbed

```js
let embed = await toEmbed("help")
```

La methode `byEmbed(embed)` sert à convertir un RichEmbed en string au format KingEmbed. Pratique pour récupérer le code d'un embed déjà envoyé.

## Créez un embed a partir de balises

Les balises servent à compléter l'embed.  
Les x[**arg**]x reçoivent un argument textuel.  
Les {key} doivent être écrits comme tels.  
Les x[**arg**{**arg**}]x reçoivent un argument **plus** un argument  falcutatif.

### Rich-Balises

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
f[📌**name**{**value**}]f *add field*  

### Content-Balises

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
{**colorName**} *hex color*
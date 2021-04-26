const fs = require('fs')

var enArray = JSON.parse(fs.readFileSync('en.json', 'utf8'))
var slArray = JSON.parse(fs.readFileSync('sl.json', 'utf8'))

var translations = {
	en: {},
	sl: {},
}

for(var i = 0; i < enArray.length; i++) {
	translations.en[enArray[i]] = enArray[i]
	translations.sl[enArray[i]] = slArray[i]
}

fs.writeFileSync('translations.json', JSON.stringify(translations))
const fs = require('fs')
function getTranslationsFromFile(filename) {
	var file = fs.readFileSync(filename, 'utf8')
	var elements = [ ... new Set(file.match(/(?<=\<translate\>).*(?=\<\/translate\>)/g)) ]
	var scripts = [ ... new Set(file.match(/(?<=\$gettext\(').*(?='\))/g)) ]
	return [ ... new Set(elements.concat(scripts))]
}

var all = []
all = all.concat(getTranslationsFromFile('../App.vue'))
filenames = fs.readdirSync('../components')
filenames.forEach(filename => {
	all = [ ... new Set(all.concat(getTranslationsFromFile('../components/' + filename))) ]
})

// console.log(JSON.stringify(all))

fs.writeFileSync('en.json', JSON.stringify(all))
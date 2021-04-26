const fs = require('fs')
function getTranslationsFromFile(filename) {
	var file = fs.readFileSync(filename, 'utf8')
	var elements = file.match(/(?<=\<translate\>).*(?=\<\/translate\>)/g) || []
	var scripts = file.match(/(?<=\$gettext\(').*(?='\))/g) || []
	return elements.concat(scripts)
}

var all = []
all = all.concat(getTranslationsFromFile('../App.vue'))
filenames = fs.readdirSync('../components')
filenames.forEach(filename => {
	all = all.concat(getTranslationsFromFile('../components/' + filename))
})

// console.log(JSON.stringify(all))

fs.writeFileSync('en.json', JSON.stringify(all))
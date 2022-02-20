const fs = require('fs');

const codes = {
	countries: {}
};

let file = fs.readFileSync('admin1CodesASCII.txt');
file.toString().split('\n').forEach((line) => {
	let s = line.split('\t');
	let ccp = s[0].split('.');

	if (codes.countries[ccp[0]] == undefined) {
		codes.countries[ccp[0]] = {};
	}

	codes.countries[ccp[0]][ccp[1]] = s[1];
});

fs.writeFileSync('admin1CodesASCII.json', JSON.stringify(codes));
// random image
const randomSrc = background[Math.floor(Math.random() * background.length)];
const img = document.querySelector('#img');
document.querySelector('#background').style.backgroundImage = 'url(' + randomSrc + ')';
img.src = randomSrc;

// getAverageRGB from http://stackoverflow.com/questions/2541481/get-average-color-of-image-via-javascript
function getAverageRGB(imgEl) {
	const blockSize = 1;
	const defaultRGB = {r: 0, g: 0, b: 0};
	const canvas = document.createElement('canvas');
	const context = canvas.getContext && canvas.getContext('2d');
	let data, width, height;
	let i = -4;
	let length;
	let rgb = {r: 0, g: 0, b: 0};
	let count = 0;

	if (!context) {
		return defaultRGB;
	}

	height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
	width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

	context.drawImage(imgEl, 0, 0);

	try {
		data = context.getImageData(0, 0, width, height);
	} catch (err) {
		return defaultRGB;
	}

	length = data.data.length;

	while ((i += blockSize * 4) < length) {
		++count;
		rgb.r += data.data[i];
		rgb.g += data.data[i + 1];
		rgb.b += data.data[i + 2];
	}

	rgb.r = ~~(rgb.r / count);
	rgb.g = ~~(rgb.g / count);
	rgb.b = ~~(rgb.b / count);

	return rgb;
}

img.onload = function () {
	var rgb = getAverageRGB(this);
	var rgbString = 'rgba(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ', 0.7)';
	document.querySelector('#clock').style.backgroundColor = rgbString;
	document.querySelector('#links').style.backgroundColor = rgbString;
	document.querySelector('#search').style.backgroundColor = rgbString;
	document.querySelector('#background').style.display = "block";
	document.querySelector('#right-side').style.display = "flex";
};

// links list
const items = 5;
for (let i = 0; i < links.length / items; i++) {
	const linksList = document.createElement('div');
	linksList.classList.toggle('links-list');
	document.querySelector('#links').appendChild(linksList);
}
const linksLists = document.querySelectorAll('.links-list');
for (let i = 0; i < links.length; i++) {
	const linksListItem = document.createElement('a');
	linksListItem.classList.toggle('links-list-item');
	linksListItem.href = links[i].href;
	linksListItem.innerHTML = links[i].label;
	linksLists[Math.floor(i / items)].appendChild(linksListItem);
}

// updateClock by tayumpee
function updateClock() {
	const days = ['DOMINGO', 'LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES', 'SÁBADO'];
	const months = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'];
	const date = new Date();
	const dateString =
    (days[date.getDay()]) + ' ' +
    ('0' + date.getDate()).slice(-2) + ' DE ' +
    (months[date.getMonth()]) + ' DE ' +
    date.getFullYear() + ' ' +
    ('0' + date.getHours()).slice(-2) + ':' +
    ('0' + date.getMinutes()).slice(-2) + ':' +
    ('0' + date.getSeconds()).slice(-2);
	document.querySelector('#time').innerHTML = dateString;
	setTimeout(updateClock, 1000);
}
updateClock();

// dynamic search
var isChrome = Boolean(window.chrome) && Boolean(window.chrome.webstore); // i actually use navbar when chromium
if (!isChrome) {
	document.querySelector('#form').onsubmit = function () {
		const search = document.querySelector('#search');
		let query = search.value;
		if (query.charAt(0) !== '-' || query.charAt(2) !== ' ') {
			this.setAttribute('action', 'https://www.google.com.mx/search?q=search');
			return true;
		}
		const command = query.charAt(1);
		query = query.substring(3, query.length);
		if (command === 'c') {
			window.location.assign('https://' + query + '.com/');
			return false;
		}
		if (command === 'u') {
			window.location.assign('https://' + query);
			return false;
		}
		if (command === 'h') {
			window.location.assign('http://' + query);
			return false;
		}
		if (command === '4') {
			window.location.assign('https://boards.4chan.org/' + query);
			return false;
		}
		if (command === '3') {
			query += ' site:http://www.w3schools.com/';
			this.setAttribute('action', 'https://www.google.com.mx/search?q=search');
			search.value = query;
			return true;
		}
		if (command === 'g') {
			this.setAttribute('action', 'https://www.google.com.mx/search?q=search');
			search.value = query;
			return true;
		}
		alert('command not found');
		return false;
	};
} else {
	document.querySelector('#form').style.display = 'none';
	document.querySelector('#links').style.height = '275px';
}

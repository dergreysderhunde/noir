// random image
document.querySelector('#background').style.backgroundImage = "url(" + background[Math.floor(Math.random() * background.length)] + ")";

// links list
const items = 5
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
var isChrome = !!window.chrome && !!window.chrome.webstore; // i actually use navbar when chromium
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
}
else {
	document.querySelector('#form').style.display = 'none';
	document.querySelector('#links').style.height = '275px';
}

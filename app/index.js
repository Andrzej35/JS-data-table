import dataToDisplay from './js/data';
import { curry, splitData, compose, mapper } from './js/lib';
import { createHtml, createAttr, appendElement, createTrailingZeroes, createDateFormat } from './js/html-builds';

// table search function 
window.searchTable = function(e) {
	
		tbody.innerHTML = '';
		pg.innerHTML ='';
	
		dataToDisplay.filter(function(x) {
			
			if((x.name.toUpperCase().indexOf(e.target.value.toUpperCase())) > -1) {
				tbody.innerHTML += tbodyTmpl(x);
			}
	
		});
	};
	

// sorting columns 
	window.sortTheColumn = function sortTheColumn(n) {

		let rows, isSwitching, i, x, y, isSwitched, directions, switchCount = 0;
		isSwitching = true;

		directions = "asc"; 

		while (isSwitching) {
		  
		  isSwitching = false;
		  rows = tbody.getElementsByTagName("TR");
		  
		  for (i = 0; i < (rows.length - 1); i++) {
			
			isSwitched = false;
			
			x = rows[i].getElementsByTagName("TD")[n];
			y = rows[i + 1].getElementsByTagName("TD")[n];
			 
			if (directions == "asc") {
			  if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
				
				isSwitched= true;
				break;
			  }
			} else if (directions == "desc") {
			  if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
				
				isSwitched= true;
				break;
			  }
			}
		  }
		  if (isSwitched) {
			
			rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
			isSwitching = true;
			
			switchCount ++; 
		  } else {
			
			if (switchCount == 0 && directions == "asc") {
			  directions = "desc";
			  isSwitching = true;
			}
		  }
		}
	}; 

	

const container = document.getElementById('app');

const template = (x, i) => `<th onClick="sortTheColumn(${i})">${x}</th>`;
const tbodyTmpl = (x) => `<tr><td id="${headersForTable()[0]}-column-${x.id}">${x.name}</td><td id="${headersForTable()[1]}-column-${x.id}">${createDateFormat(x.date).date}</td><td  id="${headersForTable()[2]}-column-${x.id}">${createDateFormat(x.date).hours}:${createDateFormat(x.date).minutes}${createDateFormat(x.date).ampm}</td><td id="${headersForTable()[3]}-column-${x.id}">${x.uploads}</td><td  id="${headersForTable()[4]}-column-${x.id}">${x.downloads}</td></tr>`;

// limit data
const limit = () => { return [25, 50, 100]};

// table headers
const headersForTable = () => { return ['Name', 'Date', 'Time', 'Uploads', 'Downloads'] };

let pager = limit()[0];

const data = curry(splitData)(dataToDisplay);
console.log(data(pager));

// ***********************
const uldiv = createHtml('div');
const ulspan = createHtml('div');
const ul = createHtml('ul');
createAttr(ulspan, 'class', ' limit ');
appendElement(ulspan, uldiv);
appendElement(ul, uldiv);

ulspan.innerHTML = limit()[0] + ' <span class="arrow-down">▼</span>';
const s = ulspan.getElementsByTagName('span');

createAttr(ul, 'class', ' hidelist ');
const toggleClass = () => {
	if(ul.classList.contains('activelist')) {
		ul.classList.remove('activelist');
		s.innerHTML = '▼';
	} else {
		ul.className += ' activelist ';
		s.innerHTML = '▲';
	}
};

ulspan.addEventListener('click', toggleClass);

// display table
window.displayPage = (e) => {
	tbody.innerHTML = '';
	pg.innerHTML ='';
	pager = e.target.value;
	ulspan.innerHTML = e.target.value + ' <span class="arrow-down">▼</span>';
	ul.classList.remove('activelist');
	tbodyTemplate(data, e.target.value, 0);
	appendElement(tbody, tbl);
	pagination(data(e.target.value));
	b[0].className += ' active ';
};

const drop = limit().map((x, i) => ul.innerHTML += `<li value="${x}" onClick="displayPage(event)">${x}</li>`);

const tbl = createHtml('table');
const dt = createAttr(tbl, 'class', 'table');
const thead = createHtml('thead');
const tr = createHtml('tr');
const pg = createHtml('div');
const pgnt = createAttr(pg, 'id', 'pagination'); 
const headerTemplate = () => {
  tr.innerHTML = mapper(template,headersForTable());
}
const tbody = createHtml('tbody');

const tbodyTemplate = (d, lim, n=0) => {
  tbody.innerHTML += mapper(tbodyTmpl, d(lim)[n]);
};

headerTemplate();
tbodyTemplate(data, pager);
const b = pg.getElementsByTagName('button');

window.renderPage = (e) => {
	tbody.innerHTML = '';
	pg.innerHTML ='';
	tbodyTemplate(data, pager, e.target.value);
	appendElement(tbody, tbl);
	pagination(data(pager));
	b[e.target.value].className = 'btn btn-primary btn-sm active ';
};

// pagination
const pagination = (ar) => {
	return ar.forEach((x, i) => {
		pg.innerHTML += `<button class="btn btn-primary btn-sm" value="${i}" onclick="renderPage(event)">${i + 1}</button>`;
	});
};

const search = createHtml('input');
createAttr(search, 'type', 'text');
createAttr(search, 'id', 'search');
createAttr(search, 'class', 'pull-right');
createAttr(search, 'placeholder', 'Search...');
createAttr(search, 'onkeyup', 'searchTable(event)');

appendElement(search, container);

appendElement(uldiv, container);
appendElement(tr, thead);
appendElement(thead, tbl);
appendElement(tbody, tbl);
appendElement(tbl, container);
appendElement(pg, container);
pagination(data(pager));

b[0].className += ' active ';



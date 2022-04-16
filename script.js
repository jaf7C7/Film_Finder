/* Global variables */

const movieList = document.getElementById('movie-list');
const searchBar = document.getElementById('search-bar');
const checkboxes = document.querySelectorAll('.checkbox input');
const filters = document.querySelectorAll('fieldset p:not(.search)');
const toggleFilterButton = document.getElementById('toggle-filter-btn');

/* Helper functions */

const filterItems = (object, type, value) => {
	console.log('filterItems(', object, `${type}, ${value})`); // debug
	if (type === 'year') {
		return object.filter(e => +e.year.slice(-4) >= value);
	} else if (type === 'type') {
		return object.filter(e => e.type == value);
	} else { // type === 'title'
		return object.filter(e => e.title.toLowerCase().includes(value));
	}
};

const clearList = () => {
	console.log('clearList'); // debug
	Array.from(movieList.children).forEach(e => movieList.removeChild(e));
};

const refreshList = () => {
	console.log('refreshList'); // debug
	let results = movies;
	for (const checkbox of checkboxes) {
		if (checkbox.checked) {
			results = filterItems(results, checkbox.name, checkbox.value);
		}
	}
	results = filterItems(results, 'title', searchBar.value);
	clearList();
	populateList(results);
}

const populateList = items => {
	console.log(`populateList(${items})`); // debug
	for (const item of items) {
		const id = item.imdbID;
		const title = item.title;
		const poster = item.poster;

		const li = document.createElement('li');
		li.setAttribute('id', id);
		li.setAttribute('style', `--content:"${title}";`);

		const a = document.createElement('a');
		a.setAttribute('href', `https://imdb.com/title/${id}`);

		const img = document.createElement('img');
		img.setAttribute('src', poster);
		img.setAttribute('alt', title);

		a.appendChild(img);
		li.appendChild(a);
		movieList.appendChild(li);
	}
}

const resetFilters = () => {
	console.log('resetFilters'); // debug
	movieResults = movies;
	refreshList();
};

/* Search bar */

searchBar.addEventListener('keydown', refreshList);

/* Toggle filter button */

toggleFilterButton.addEventListener('click', () => {
	filters.forEach(e => e.classList.toggle('hidden'));
});

/* Checkboxes */

checkboxes.forEach(e => e.addEventListener('change', refreshList));

/* Reset filter button */

document.getElementById('reset-btn').addEventListener('click', resetFilters);

/* Filters initially hidden */

filters.forEach(e => e.classList.add('hidden'));


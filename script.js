const movieList = document.getElementById('movie-list');
const searchBar = document.getElementById('search-bar');
const checkboxes = document.querySelectorAll('.checkbox input');
const filters = document.querySelectorAll('fieldset p:not(.search)');
const toggleFilterButton = document.getElementById('toggle-filter-btn');
const resetButton = document.getElementById('reset-btn');

const filterItems = (object, type, value) => {
	if (type === 'year') {
		return object.filter(e => +e.year.slice(-4) >= value);
	} else if (type === 'type') {
		return object.filter(e => e.type == value);
	} else { // type === 'title'
		return object.filter(e => e.title.toLowerCase().includes(value));
	}
};

const clearList = () => {
	Array.from(movieList.children).forEach(e => movieList.removeChild(e));
};

const refreshList = () => {
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
	movieResults = movies;
	refreshList();
};

searchBar.addEventListener('keydown', refreshList);

toggleFilterButton.addEventListener('click', () => {
	filters.forEach(e => e.classList.toggle('hidden'));
});

checkboxes.forEach(e => e.addEventListener('change', refreshList));

resetButton.addEventListener('click', resetFilters);

filters.forEach(e => e.classList.add('hidden'));

refreshList();

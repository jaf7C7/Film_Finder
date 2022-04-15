document.querySelectorAll('fieldset p:not(.search-bar)').forEach(e => {
	e.classList.add('hidden');
});

const movieList = document.getElementById('movie-list');
for (const movie of movies) {
	const id = movie.imdbID;
	const poster = movie.poster;
	const title = movie.title;
	
	const li = document.createElement('li');
	li.setAttribute('id', id);
	li.style.setProperty('--content', `"${title}"`);

	const a = document.createElement('a');
	a.setAttribute('href', `https://imdb.com/title/${id}`);

	const img = document.createElement('img');
	img.setAttribute('src', poster);
	img.setAttribute('alt', title);

	a.appendChild(img);
	li.appendChild(a);
	movieList.appendChild(li);
}

document.getElementById('toggle-filter-btn').addEventListener('click', () => {
	document.querySelectorAll('fieldset p:not(.search-bar)').forEach(e => {
		e.classList.toggle('hidden');
	});
});

const filterMovies = (filterBy, filterTerm) => {
	for (let movie of movieList.children) movie.classList.remove('hidden');
	
	let nonMatching;
	if (filterBy === 'year') {
		nonMatching = movies.filter(e => +e.year < 2014);
	} else if (filterBy === 'title') {
		nonMatching = movies.filter(e => {
			return !e.title.toLowerCase().includes(filterTerm);
		});
	}

	for (let movie of nonMatching) {
		document.getElementById(movie.imdbID).classList.add('hidden');
	}
};

[ 'recent', 'avenger', 'x-men', 'princess', 'batman' ].forEach(id => {
	let callback = () => { filterMovies('title', id); };
	if (id === 'recent') callback = () => { filterMovies('year', 2014); };
	document.getElementById(id).addEventListener('click', callback);
});

const searchBar = document.getElementById('search');
searchBar.addEventListener('keydown', () => {
	filterMovies('title', searchBar.value);
});

document.getElementById('reset-btn').addEventListener('click', () => {
	for (let movie of movieList.children) movie.classList.remove('hidden');
});

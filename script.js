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

let getPostsList = async () => {
    const response = await fetch(`https://yts.lt/api/v2/list_movies.json?limit=50`);
    const json = await response.json();
    return json;
}

let Navbar = {
    render: async () => {
        let view = `
                <nav class="navbar navbar-light bg-dark">
                <div class="container">
                    <a
                    class="navbar-brand"
                    href="#"_blank"
                    ><img
                        width="100"
                        height="100"
                        src="https://cdn3.iconfinder.com/data/icons/cloud-computing-3-3/49/131-512.png"
                        alt=""
                    /> 
                </a>
                    <form class="form-inline search-form" method="POST">
                    <input
                        class="form-control search-input w-100"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                    />
                    <div class="dropdown-menu p-2 w-100" data-search-results>

                    </div>
                    </form>
                </div>
            </nav>
        `
        return view
    },
    after_render: async () => {
        let posts = await getPostsList();
        const movies = posts.data.movies;
        let dropdownMenu = document.querySelector('.dropdown-menu');
        const movieInfo = movies.map(movie => ({ "id": movie.id, "title": movie.title, "year": movie.year }));

        document.querySelector('.search-input').addEventListener('keyup', function (e) {
            let searchInput = e.target.value.toLowerCase();
            let resultTitles = [];

            for (let titleYears of movieInfo) {
                if (titleYears.title.toLowerCase().indexOf(searchInput) != -1 && searchInput.length > 0) {
                    resultTitles.push(titleYears);
                    dropdownMenu.innerHTML = resultTitles.map(item => `<a href="#/movie/${item.id}" class="btn btn-primary btn-block my-1">${item.title} ${item.year}</a>`).join('');
                    dropdownMenu.classList.add('d-block');
                }
            }

            if (resultTitles.length < 1) {
                dropdownMenu.classList.remove('d-block');
                dropdownMenu.innerHTML = resultTitles.map(item => `<a href="#/movie/${item.id}}" class="btn btn-primary btn-block my-1">${item.title} ${item.year}</a>`).join('');
            }
        })

    }

}

export default Navbar;
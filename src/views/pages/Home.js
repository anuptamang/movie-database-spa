// --------------------------------
//  Define Data Sources
// --------------------------------

let getPostsList = async () => {
    const response = await fetch(`https://yts.lt/api/v2/list_movies.json?limit=50`);
    const json = await response.json();
    return json;
}

let Home = {
    render: async () => {
        let posts = await getPostsList();
        const movies = posts.data.movies;
        const latestMovies = movies.filter(movie => movie.year > 2017).slice(0, 4);
        const moviesByRating = movies.filter(movie => movie.rating > 7).sort((a, b) => b.rating - a.rating);
        let view = `
            <section
                class="section latest-movies"
                style="background-image: url('https://img.yts.lt/assets/images/movies/the_lego_movie_2_the_second_part_2019/background.jpg')"
            >
                <div class="container py-5">
                    <div class="intro mb-4 pb-3 text-center text-white">
                         <h1 class="text-white">
                             Latest Movies
                        </h1>
                    </div>
                        <div class="row" data-by-latest>
                            ${ latestMovies.map(movie => `<div class="col-md-3 mb-4">
                                <a href="#/movie/${movie.id}" class="card mb-2 product-card" data-show-detail data-id="${movie.id}">
                                    <img
                                    class="img-responsive"
                                    src="${movie.medium_cover_image}"
                                    alt="${movie.title_long}"
                                    >
                                    <div class="overlay-info">
                                    <div class="wrap">
                                        <div class="h5 rating mb-2">
                                        <i class="fas fa-star d-block mb-1 text-success"></i>
                                        ${movie.rating}/10
                                        </div>
                                        <div class="h4 genre mb-4">
                                        ${movie.genres.map(item => item + ' ').join('')}
                                        </div>
                                        <span class="btn btn-info">View Details</span>
                                    </div>
                                    </div>
                                </a>
                                <h5 class="text-white">
                                    <a href="#" class="text-reset">${movie.title}</a>
                                </h5>
                                <p class="text-info">${movie.year}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </section>
            <section class="section bg-dark py-2">
                <div class="container py-5">
                <h1 class="text-white text-center mb-4 pb-3">
                Highest Rated Movies
                    </h1>
                    <div class="row" data-by-rating>
                         ${ moviesByRating.map(movie => `<div class="col-md-3 mb-4">
                                <a href="#/movie/${movie.id}" class="card mb-2 product-card" data-show-detail data-id="${movie.id}">
                                    <img
                                    class="img-responsive"
                                    src="${movie.medium_cover_image}"
                                    alt="${movie.title_long}"
                                    >
                                    <div class="overlay-info">
                                    <div class="wrap">
                                        <div class="h5 rating mb-2">
                                        <i class="fas fa-star d-block mb-1 text-success"></i>
                                        ${movie.rating}/10
                                        </div>
                                        <div class="h4 genre mb-4">
                                        ${movie.genres.map(item => item + ' ').join('')}
                                        </div>
                                        <span class="btn btn-info">View Details</span>
                                    </div>
                                    </div>
                                </a>
                                <h5 class="text-white">
                                    <a href="#" class="text-reset">${movie.title}</a>
                                </h5>
                                <p class="text-info">${movie.year}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </section>
        `
        return view
    }
    , after_render: async () => {
        console.log(document.querySelectorAll('.product-card'))
    }

}

export default Home;
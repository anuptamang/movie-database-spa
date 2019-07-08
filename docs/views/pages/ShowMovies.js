import Utils from '../../services/Utils.js'

const getMovies = async (id) => {
    const response = await fetch(`https://yts.lt/api/v2/movie_details.json?movie_id=${id}&with_images=true&with_cast=true`)
    const json = await response.json();
    return json
}

const ShowMovies = {

    render: async () => {
        const request = Utils.parseRequestURL()
        const posts = await getMovies(request.id);
        const movie = posts.data.movie;
        console.log(movie);


        return `
        <section
            class="section latest-movies"
            style="background-image: url('https://img.yts.lt/assets/images/movies/the_lego_movie_2_the_second_part_2019/background.jpg')">
            <div class="container py-5">
                <div data-details>
                    <div class="row">
                <div class="col-md-3 mb-4">
                    <a href="#" class="card mb-2 product-card" data-id="${movie.id}">
                        <img
                        class="img-responsive"
                        src="${movie.medium_cover_image}"
                        alt="${movie.title_long}"
                        />
                    </a>
                </div>
                <div class="col-md-9 px-4 text-white">
                    <h1 class="text-white mb-3">${movie.title}</h1>
                    <h4 class="text-white">${movie.year}</h4>
                    <h6 class="text-white">${movie.genres.map(item => item)}</h6>
                    <p class="text-white">Language: ${movie.language}</p>
                    <div class="h5 rating mb-4 d-flex align-items-center">
                        <i class="fas fa-star d-block mb-1 text-success mr-2"></i>
                        ${movie.rating}/10
                    </div>
                    <h4 class="text-white">Movie Cast:</h4>
                    <h6 class="list-unstyled mb-4">
                        ${movie.cast.map(cast => cast.name)}
                    </h6>
                    <h4 class="text-white">Movie Plot:</h4>
                    <p>${movie.description_full}</p>
                </div>
             </div>
            </div>
            </div>
      </section>
        `
    }
    , after_render: async () => {
    }
}

export default ShowMovies;
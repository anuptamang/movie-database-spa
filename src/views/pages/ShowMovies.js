import Utils from '../../services/Utils.js'

let getMovies = async (id) => {
    const response = await fetch(`https://yts.lt/api/v2/movie_details.json?movie_id=${id}&with_images=true&with_cast=true`)
    const json = await response.json();
    return json
}

let ShowMovies = {

    render: async () => {
        let request = Utils.parseRequestURL()
        let posts = await getMovies(request.id);
        const movie = posts.data.movie;

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
                <div class="col-md-9 px-4">
                    <h1 class="text-white mb-3">${movie.title}</h1>
                    <h4 class="text-white">${movie.year}</h4>
                    <h4 class="text-white">${movie.genres.map(item => item + ' ').join('')}</h4>
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
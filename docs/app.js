import './styles/main.scss';
import "isomorphic-fetch";

import Utils from './services/Utils.js'

import Header from './views/components/Header.js'
import Footer from './views/components/Footer.js'

import Home from './views/pages/Home.js'
import Error404 from './views/pages/Error404.js'
import ShowMovies from './views/pages/ShowMovies.js'

// List of supported routes. Any url other than these routes will throw a 404 error
const routes = {
    '/': Home
    , '/movie/:id': ShowMovies
};

// The router code. Takes a URL, checks against the list of supported routes and then renders the corresponding content page.
const router = async () => {
    console.log('loaded 50%!')
    setTimeout(() => {
        document.querySelector('.page-progress').style.width = '50%';
    }, 300);
    // Lazy load view element:
    const header = null || document.getElementById('header');
    const content = null || document.getElementById('main');
    const footer = null || document.getElementById('footer');

    // Render the Header and footer of the page
    header.innerHTML = await Header.render();
    await Header.after_render();
    footer.innerHTML = await Footer.render();
    await Footer.after_render();

    document.querySelector('.page-progress').style.width = '70%';
    console.log('loaded 70%!')

    // Get the parsed URl from the addressbar
    const request = Utils.parseRequestURL()

    // Parse the URL and if it has an id part, change it with the string ":id"
    const parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '')

    // Get the page from our hash of supported routes.
    // If the parsed URL is not in our list of supported routes, select the 404 page instead
    const page = routes[parsedURL] ? routes[parsedURL] : Error404
    content.innerHTML = await page.render();
    await page.after_render();

    document.querySelector('.page-progress').style.width = '100%';

    setTimeout(() => {
        document.querySelector('.page-progress').style.width = '0';
    }, 300);

    console.log('loaded 100%!')
}

// Listen on hash change:
window.addEventListener('hashchange', router);

// Listen on page load:
window.addEventListener('DOMContentLoaded', router);
let pageCounter = 1;
let perPage = 15;
let abv = 0;

function findByAbv(abvOption) {
    pageCounter = 1;
    abv = abvOption;
    const beersContainer = document.getElementById('beersContainer');
    beersContainer.innerHTML = "";
    loadBeers();
}

function loadNextPageOnScrollBottom() {
    const scrollAtBottom = window.innerHeight + window.pageYOffset + 20 >= document.body.scrollHeight;
    if (scrollAtBottom) {
        pageCounter++;
        loadBeers();
    }
}

function createAbvParameter(option) {
    switch (option) {
        case 1:
            return `&abv_lt=4`
        case 2:
            return `&abv_lt=6&abv_gt=4`
        case 3:
            return `&abv_gt=6`
        default:
            return false
    }
}

function createEndpoint(abv) {
    return abv
        ? `https://api.punkapi.com/v2/beers?page=${pageCounter}&per_page=${perPage}${abv}`
        : `https://api.punkapi.com/v2/beers?page=${pageCounter}&per_page=${perPage}`
}

function loadBeers() {
    fetch(createEndpoint(createAbvParameter(abv)))
        .then(response => response.json())
        .then((data => {
            if (data.length === 0) {

            } else {
                appendData(data);
            }
        }))
}

function loadOnStart() {
    loadBeers();
    window.addEventListener('scroll', loadNextPageOnScrollBottom);
}

function appendData(beers) {
    beers.forEach(beer => {
        const beerContainer = createBeerContainer();
        createNameContainer(beer, beerContainer);
        createImgContainer(beer, beerContainer);
        createTagContainer(beer, beerContainer);
        const beersContainer = document.getElementById('beersContainer');
        beersContainer.appendChild(beerContainer);
    })
}

function createBeerContainer() {
    const beerContainer = document.createElement('div');
    beerContainer.classList.add('beerContainer', 'container', 'col-12', 'col-sm-6', 'col-md-4', 'col-lg-3');
    return beerContainer;
}

function createNameContainer(beer, beerContainer) {
    const nameContainer = document.createElement('div');
    const beerName = document.createElement('span');
    nameContainer.classList.add('nameContainer', 'container');
    beerName.classList.add('beerName');
    beerName.innerText = beer.name;
    nameContainer.appendChild(beerName);
    beerContainer.appendChild(nameContainer);
}

function createImgContainer(beer, beerContainer) {
    const imgContainer = document.createElement('div');
    imgContainer.classList.add('imgContainer', 'container');

    imgContainer.style.backgroundImage = beer.image_url === null
        ? `url("beer.png")`
        : `url(${beer.image_url})`;

    beerContainer.appendChild(imgContainer);
}

function createTagContainer(beer, beerContainer) {
    const tagContainer = document.createElement('div');
    const beerTag = document.createElement('span');
    tagContainer.classList.add('tagContainer', 'container');
    beerTag.classList.add('beerTag');
    beerTag.innerText = beer.tagline;
    tagContainer.appendChild(beerTag);
    beerContainer.appendChild(tagContainer);
}

if (typeof module === "object") {
    module.exports = {
        createAbvParameter
    };
}
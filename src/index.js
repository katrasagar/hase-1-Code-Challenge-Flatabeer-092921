const baseApi = "http://localhost:3000/beers";

// Function to get and load all beers
function getAndLoadAllBeers() {
    fetch(baseApi)
        .then(resp => resp.json())
        .then(beers => {
            document.getElementById('beer-list').innerHTML = beers
                .map(beer => `<li onClick="getAndLoadBeerDetails(${beer.id})">${beer.name}</li>`)
                .join('');
        });
}

// Function to get and load beer details
function getAndLoadBeerDetails(beerId) {
    if (!beerId) {
        console.error("Beer ID is undefined");
        return;
    }

    fetch(`${baseApi}/${beerId}`)
        .then(resp => resp.json())
        .then(beer => {
            console.log(beer);
            document.getElementById('beer-name').innerHTML = beer.name;
            document.getElementById('beer-image').src = beer.image_url;
            document.getElementById('beer-description').innerHTML = beer.description;
            document.getElementById('review-list').innerHTML = (beer.reviews || []).map(review => `<li>${review}</li>`).join('');
        })
        .catch(error => console.error('Error fetching beer details:', error));
}

document.addEventListener("DOMContentLoaded", () => {
    getAndLoadAllBeers();

    document.getElementById('description-form').addEventListener('submit', (evt) => {
        evt.preventDefault();
        const form = evt.target;
        document.getElementById('beer-description').innerHTML = form.description.value;
        form.reset();
    });

    document.getElementById('review-form').addEventListener('submit', evt => {
        evt.preventDefault();
        const form = evt.target;
        document.getElementById('review-list').innerHTML += `<li>${form.review.value}</li>`;
        form.reset();
    });
});

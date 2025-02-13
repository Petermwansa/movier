// for the api 
const form = document.querySelector('form');
const container = document.querySelector('.movies');


// add an event listener to the form 
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let inputField = form.querySelector('input');  // Get input field
    let query = inputField.value;
    
    console.log(query);
    imdbApi(query);
    document.getElementById('search__term').innerHTML = `Here are the top 8 movies from your search: "<span>${query}</span>"`;
    document.getElementById('search__divider').style.visibility = "visible";
    inputField.value = ''; // Clear input field after submission
})

// the function to fetch movies from the imdb api 

async function imdbApi (query) {
    // Clear previous results and hide the divider before fetching new ones
    document.querySelector('.movie__cards').innerHTML = '';
    document.getElementById('search__divider').style.visibility = "hidden";

    const req = await fetch(`https://imdb8.p.rapidapi.com/auto-complete?q=${query}`, {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'ae08b734b1mshe5397f19b6e251bp1a3155jsn708aa479c204',
            'x-rapidapi-host': 'imdb8.p.rapidapi.com'
        }

    }).then(response => response.json())
    .then(data => {
        const list = data.d;
    
        list.map((item) => {
            const name = item.l;
            const poster = item.i.imageUrl;
            const movie = `<article class="movie__card"><img src="${poster}" /><h3 class="movie__title">${name}</h3></article>`;
    
            document.querySelector('.movie__cards').innerHTML += movie;
            document.querySelector('movie__popular');
        })
    })
    .catch(err => {
        console.log(err);
    });


}



// get all the genres of the movies 
async function getGenres() {
    const url = 'https://imdb236.p.rapidapi.com/imdb/genres';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'ae08b734b1mshe5397f19b6e251bp1a3155jsn708aa479c204',
            'x-rapidapi-host': 'imdb236.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json(); // Parse JSON response
        console.log(result[0]); // Check API response format

        const genreList = document.getElementById("genre__list");
        // Assuming result.genres is an array
        if (result) {
            result.forEach(data => {
                const li = document.createElement("li"); // Create list item
                li.classList.add("cat__list"); // Add CSS class
                
                const a = document.createElement("a"); // Create anchor tag
                a.textContent = data; // Assuming 'data' contains the genre name
                a.href = `#${data.toLowerCase().replace(/\s+/g, "-")}`; // Example URL (can be modified)
                a.classList.add("list__list"); // Add a class for styling
                li.appendChild(a); // Append anchor to list item
                genreList.appendChild(li); // Append list item to the <ul>

                
            });
        }
    } catch (error) {
        console.error("Error fetching genres:", error);
    }
}
getGenres();


// get the popular movies 

async function getPopularMovies () {
    const url = 'https://imdb236.p.rapidapi.com/imdb/most-popular-movies';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'ae08b734b1mshe5397f19b6e251bp1a3155jsn708aa479c204',
            'x-rapidapi-host': 'imdb236.p.rapidapi.com'
        }
    };
    try {
        const response = await fetch(url, options);
        const result = await response.json(); // Parse JSON response
        console.log("Popular format", result[20]); // here we use this line for testing to check API response format


        result.map((item) => {

            const title = item.primaryTitle;
            const rating = item.averageRating;
            const link = item.url;
            const imgUrl = item.primaryImage;
            const popularMovie = `<article class="movie__card__popular"><img src="${imgUrl}" /><h3 class="movie__title">${title}</h3><p class="movie__rating">${rating}/10</p><a class="link" href="${link}" target="_blank">View On IMDb</a></article>`;
    
            document.querySelector('.movie__cards__popular').innerHTML += popularMovie;
        })
    } catch (error) {
        console.error("Error fetching popular movies:", error);
    }
}
getPopularMovies();










// We are searching for the upcoming movies in the us 
async function upcomingUs () {

    const url = 'https://imdb236.p.rapidapi.com/imdb/upcoming-releases?countryCode=US&type=MOVIE';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '54d0199807mshf097fff7cbda247p16dae9jsn60e32b6596ca',
            'x-rapidapi-host': 'imdb236.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();

        const movies = result["1"].titles;

        movies.map((item) => {

            const title = item.primaryTitle;
            const date = item.releaseDate;
            const link = item.url;
            const imgUrl = item.primaryImage;
            const upcomingMovie = `<article class="movie__card__upcoming"><img src="${imgUrl}" /><h3 class="movie__title">${title}</h3><p class="movie__date">${date}/10</p><a class="link" href="${link}" target="_blank">View On IMDb</a></article>`;
    
            document.querySelector('.movie__cards__upcoming').innerHTML += upcomingMovie;
        })

    } catch (error) {
        console.error(error);
    }


}
upcomingUs();



// for the theme toggling 
const toggle = document.getElementById('toggleTheme');
const body = document.querySelector('body');
const headings = document.querySelectorAll('h1, h2, h3, p');
const navigation = document.getElementById('navigation');
const nav_item = document.getElementById('nav_item');

toggle.addEventListener('click', function() {
    this.classList.toggle('fa-moon');
    if (toggleTheme.classList.contains('fa-moon')) {
        body.style.background = 'white';
        toggle.style.color = "#040000";
        // navigation.style.background = "#040000";
        headings.forEach(e => e.style.color="black");
    } else {
        body.style.background = 'black';
        toggle.style.color = "white";
        headings.forEach(e => e.style.color="white");
        toggle.style.color = "white";
    }
})




// the code below is for the form validation 

const formText = document.getElementById('form');
const name = document.getElementById('name');
const email = document.getElementById('email');
const textMessage = document.getElementById("message");
const noText = document.getElementById("noText");


formText.addEventListener('submit', e => {
    e.preventDefault();
    validateInputs();
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};



// here we are checking the email format using this reqular expression  
const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


// This function will be called when the form will be submitted to validate the inputs on the client side 
const validateInputs = () => {
    const nameValue = name.value.trim();
    const emailValue = email.value.trim();
    const messageValue = textMessage.value.trim();

    // we validate the entered name
    if(nameValue === '') {
        setError(name, 'Name is required');
    } else {
        setSuccess(name);
    }

    // we validate the entered email
    if(emailValue === '') {
        setError(email, 'Email is required');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address');
    } else {
        setSuccess(email);
    }

    // we validate the entered entered message
    if (messageValue === '') {
        noText.style.display = "block";
        textMessage.style.border = "2px solid red";
    } else {
        noText.style.display = "none"; 
        textMessage.style.border = "2px solid green";
    }
};


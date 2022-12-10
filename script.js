const quote__text = document.getElementById('quote');
const quote__author = document.getElementById('author');
const quoteContainer = document.getElementById('quote__container');
const twitterButton = document.getElementById('twitter');
const newQuoteButton = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// function loading
function loading() {
    loader.hidden = false;
}
// complete loading function
function complete() {
    if (!loading.hidden) {
        loader.hidden = true;

    }
}
// http://api.forismatic.com/api/1.0/

async function getQuote() {
    complete()

    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    // const urlApi = 'https://jsonplaceholder.typicode.com/posts';
    const urlApi ='http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    
    try {
        const response = await fetch(proxyUrl + urlApi);
        const data = await response.json();
        quote__text.innerText = data.quoteText;
        // if the author doesn't exist then replace author with "Unkown"
        if (data.quoteAuthor === '') {
            quote__author.innerText = "Unkown Author"
        } else {
            quote__author.innerText = data.quoteAuthor;
        }
        // add classses to css when  quote is long and reduce when quote is less

        if (data.quoteText.length > 120) {

            quoteContainer.classList.add("quote__long")
        } else {
            quoteContainer.classList.remove("quote__long")

        }
        
        console.log(data);

        complete()
    } catch (error) {
        getQuote();
        console.log(error);
    }
}

// tweeter function
function tweetQuote() {
    const quote = quote__text.innerText;
    const author = quote__author.innerText;
    const tweetQuoteText = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(tweetQuoteText, '_blank');
}

// eventlistener function
twitterButton.addEventListener('click', tweetQuote)
newQuoteButton.addEventListener('click', getQuote)




// on load
// getQuote();
loading()
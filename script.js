const quoteContainer = document.getElementById("quote_container");
const quotes = document.getElementById('quotes');
const author = document.getElementById("author");
const newQuote_button = document.getElementById("New-quote");
const twitter_button = document.getElementById("twitter-button");
const loader = document.getElementById("loader");

let errorCount = 0;

// loading spinner shown
function loading_start(){
    quoteContainer.hidden = true;
    loader.hidden = false;
}

// loading spinner removed
function loading_complete(){
    if(!loader.hidden){
        quoteContainer.hidden = false;
        loader.hidden = true;}
}

// tweeting quotes

function tweet(){
    const tweet_quote = quotes.textContent;
    const tweet_author = author.textContent;
    const tweetUrL = `https://twitter.com/intent/tweet?text=${tweet_quote} - ${tweet_author}`;
    window.open(tweetUrL, "_blank");
}

// Get Quotes API

async function getQuote(){
    loading_start();
    const proxyUrl = "https://lit-caverns-09771.herokuapp.com/";
    const quotesUrl = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
    try {
        const response = await fetch(proxyUrl+quotesUrl);
        const data = await response.json();
        // If author from api is blank set author as anonymous
        if(data.quoteAuthor === ''){
            author.textContent = "Anonymous"
        }else{
            author.textContent = data.quoteAuthor;
        }
        // Reduce font size for long quote
        if(data.quoteText.length > 50){
            quotes.classList.add('long_quote');
        }else{
            quotes.classList.remove('long_quote');
        }
        quotes.textContent = data.quoteText;
        loading_complete();
        // clearing error count
        errorCount = 10;
    }
    catch(error){
        if(errorCount < 5){
            getQuote();
            errorCount++;
        }
        console.log(error);
    }
}

getQuote();

// event listen for new quote button
newQuote_button.addEventListener("click",getQuote);

// event listen for tweet button
twitter_button.addEventListener("click",tweet);

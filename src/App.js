import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import Loading from './components/Loading';
import axios from 'axios';

function App() {

  // const apiQuotes = {};

  const [isLoading, setIsLoading] = useState(false);
  const [apiQuotes, setApiQuotes] = useState([]);
  const [quote, setQuote] = useState({text: "Everything is nothing, with a twist.", author: "Kurt Vonnegut"});


  const getQuotes = async () => {
      setIsLoading(true);
      const apiURL = "https://type.fit/api/quotes";
    
      const response = await axios.get(apiURL);
      setApiQuotes(response.data);
      setIsLoading(false);
  }

useEffect( () => {
  getQuotes();
  // newQuote();
}, []);

function newQuote() {
    setIsLoading(true);
    //  Pick a random quote from apiQuotes array
    setQuote(apiQuotes[Math.floor(Math.random() * apiQuotes.length)]);
    
    //Check if author feild is null, if it is replace it with "Unknown"
    if(!quote.author) {
        quote.author = "Unknown";
    }
    
    setIsLoading(false);
    
}

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote.text} - ${quote.author}`;

    window.open(twitterUrl, "_blank");
}

  return (<>
      {isLoading && <Loading />}
      <div className="quote-container" id="quote-container">
        {/* <!-- Quote --> */}
        <div className={`${quote.text.length > 120 ? 'long-quote' : 'quote-text'}`}>
            <i className="fas fa-quote-left"></i>
            <span id="quote">{quote.text}</span>
        </div>
        {/* <!-- Author --> */}
        <div className="quote-author">
            <span id="author">{quote.author}</span>
        </div>
        {/* <!-- Buttons --> */}
        <div className="button-container">
            <button className="twitter-button" id="twitter" title="Tweet This!" onClick={tweetQuote}>
                <i className="fab fa-twitter"></i>
            </button>
            <button id="new-quote" onClick={newQuote}>New Quote</button>
        </div>
    </div>
    {/* <!-- Loader --> */}
    {/* <div className="loader" id="loader"></div> */}
    
    </>

  );
}

export default App;

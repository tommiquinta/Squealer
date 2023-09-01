import { useEffect, useState } from "react";
import axios from "axios";

export default function searchComponent({toSearch}) {
    
  const API_KEY = "AIzaSyBgns1017_doBrHZ4sqqttoQrHHa0RMjAw";
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await searchGoogle(toSearch);
        setSearchResults(data);
        setLoading(false);
      } catch (error) {
        console.error('Errore nella ricerca:', error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

    async function searchGoogle(query) {
      const response = await axios.get('https://www.googleapis.com/customsearch/v1', {
        params: {
          q: query,
          key: API_KEY,
          cx: '938ddd3d055554371',
        },
      });
      
      var dataArray = response.data.items;
      console.log(dataArray);
      return dataArray;
    }
    
    return(
      <div className="flex-col gap-2">
        {loading ? (
        <p>Caricamento...</p>
      ) : (
        <ul>
          {searchResults.map((news, index) => (
          <li className="my-4" key={index}>{news.snippet}</li>
        ))}
        </ul>
      )}
      </div>
    );
  
}



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
      console.log(response.data);
      return response.data;
    }
    
    return(
      <div className="flex-col gap-2">
        {loading ? (
        <p>Caricamento...</p>
      ) : (
        <ul>
          {searchResults.items.map((item, index) => (
            <li key={index}>{item.title}</li>
          ))}
        </ul>
      )}
      </div>
    );
  
}



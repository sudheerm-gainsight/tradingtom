import { useEffect, useState } from "react";

function News() {
  // Local state to store the news articles
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Local state for the search query
  const [search, setSearch] = useState("");

  // State for popup modal
  const [selectedNews, setSelectedNews] = useState(null);

  // Fetch news from an external free API when the component mounts
  useEffect(() => {
    // Using jsonplaceholder as a free mock API to simulate news articles
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=10")
      .then(response => response.json())
      .then(data => {
        // Map the API data into our expected structure
        const formattedNews = data.map(item => ({
          id: item.id,
          title: item.title,
          description: item.body,
          date: new Date().toISOString().split("T")[0] // Fake current date
        }));
        setNews(formattedNews);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching news:", error);
        setLoading(false);
      });
  }, []);

  // Compute the filtered news dynamically before rendering
  // The list updates instantly without needing a search button
  const filteredNews = news.filter(n => 
    n.title.toLowerCase().includes(search.toLowerCase()) || 
    n.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Market Updates & News</h2>
      <p className="text-muted">Stay up to date with the latest news fetched from an external API.</p>

      {/* Automatic Search Filter */}
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search news by title or content..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: '100%', maxWidth: '500px' }}
        />
      </div>

      {loading ? (
        <p>Loading news from external API...</p>
      ) : (
        /* Render the list of news articles dynamically */
        filteredNews.length > 0 ? (
          filteredNews.map(n => (
            <div className="card" key={n.id} style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ margin: 0, color: 'var(--primary)', textTransform: 'capitalize' }}>{n.title}</h4>
                <small className="text-muted">{n.date}</small>
              </div>
              <p style={{ marginTop: '10px', flex: 1 }}>{n.description}</p>
              
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '15px' }}>
                <button 
                  className="see-news-btn"
                  onClick={() => setSelectedNews(n)}
                  style={{ padding: '8px 16px', background: 'var(--primary)', color: 'black', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                  see news
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No recent news available matching your search.</p>
        )
      )}

      {/* Popup Modal for Selected News */}
      {selectedNews && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
        }}>
          <div className="card" style={{ maxWidth: '600px', width: '90%', position: 'relative', margin: '20px' }}>
            <button 
              onClick={() => setSelectedNews(null)}
              style={{ position: 'absolute', top: '15px', right: '15px', background: 'transparent', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--text-main)' }}
            >
              &times;
            </button>
            <h3 style={{ color: 'var(--primary)', textTransform: 'capitalize', marginTop: '10px', paddingRight: '20px' }}>
              {selectedNews.title}
            </h3>
            <small className="text-muted">{selectedNews.date}</small>
            <p style={{ marginTop: '20px', lineHeight: '1.6', fontSize: '1.1rem' }}>
              {selectedNews.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default News;
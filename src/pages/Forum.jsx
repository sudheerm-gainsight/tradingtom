import { useState } from "react";

function Forum() {
  // State to hold all forum posts
  const [posts, setPosts] = useState([]);
  
  // State for the text in the new post input field
  const [text, setText] = useState("");

  // Function to create a new top-level post
  const addPost = () => {
    // Ignore empty posts
    if (!text.trim()) return;

    const newPost = {
      id: Date.now(), // Generate a simple unique ID
      text,
      replies: [] // Initialize with no replies
    };
    
    // Add the new post to the existing array of posts
    setPosts([...posts, newPost]);
    
    // Clear the textarea after posting
    setText("");
  };

  // Function to add a reply to an existing post
  const addReply = (id, replyText) => {
    if (!replyText.trim()) return;

    // Map through posts to find the right one, and append the reply
    const updated = posts.map(p => {
      if (p.id === id) {
        return { ...p, replies: [...p.replies, replyText] };
      }
      return p;
    });
    
    setPosts(updated);
  };

  return (
    <div>
      <h2>Community Forum</h2>
      <p className="text-muted">Discuss trading strategies with the community.</p>

      {/* Input area for creating a new post */}
      <div className="card">
        <textarea 
          placeholder="Ask a question or share a strategy..." 
          value={text} 
          onChange={e => setText(e.target.value)} 
        />
        <button onClick={addPost}>Post Discussion</button>
      </div>

      {/* Render all posts */}
      {posts.map(p => (
        <div className="card" key={p.id} style={{ borderLeft: '4px solid var(--primary)' }}>
          <p style={{ fontSize: '1.1rem', marginBottom: '15px' }}>{p.text}</p>

          {/* Render replies to this specific post */}
          {p.replies.map((r, i) => (
            <div key={i} style={{ marginLeft: '20px', padding: '10px', background: 'var(--bg-main)', borderRadius: '4px', marginBottom: '5px' }}>
              <span className="text-muted" style={{ marginRight: '10px' }}>↳</span>
              {r}
            </div>
          ))}

          {/* Input field to add a new reply */}
          <input
            type="text"
            placeholder="Write a reply and press Enter..."
            style={{ marginTop: '15px' }}
            onKeyDown={(e) => {
              // Listen for the "Enter" key press to submit the reply
              if (e.key === "Enter") {
                addReply(p.id, e.target.value);
                e.target.value = ""; // Clear input after replying
              }
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default Forum;
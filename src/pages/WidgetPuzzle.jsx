import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function WidgetPuzzle() {
  const { user } = useAuth();

  // 1. Define the puzzle pieces (Trading Widgets)
  const initialPieces = [
    { id: "w1", name: "Price Chart", icon: "📊" },
    { id: "w2", name: "Order Book", icon: "📑" },
    { id: "w3", name: "Market News", icon: "📰" },
    { id: "w4", name: "Trade History", icon: "🕒" },
    { id: "w5", name: "Watchlist", icon: "👀" },
    { id: "w6", name: "Portfolio", icon: "💼" },
  ];

  // 2. State to track pieces in the Left Pool and Right Board
  const [pool, setPool] = useState(initialPieces);
  const [board, setBoard] = useState([]);

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" />;
  }

  // --- DRAG AND DROP HANDLERS ---

  // Called when user starts dragging a piece
  const onDragStart = (e, pieceId) => {
    e.dataTransfer.setData("pieceId", pieceId);
  };

  // Necessary to allow dropping
  const onDragOver = (e) => {
    e.preventDefault();
  };

  // Called when piece is dropped on the right side
  const onDropToBoard = (e) => {
    const id = e.dataTransfer.getData("pieceId");
    const piece = pool.find((p) => p.id === id);

    if (piece) {
      setBoard([...board, piece]); // Add to board
      setPool(pool.filter((p) => p.id !== id)); // Remove from pool
    }
  };

  // Called when piece is dragged back to the left side
  const onDropToPool = (e) => {
    const id = e.dataTransfer.getData("pieceId");
    const piece = board.find((p) => p.id === id);

    if (piece) {
      setPool([...pool, piece]); // Add back to pool
      setBoard(board.filter((p) => p.id !== id)); // Remove from board
    }
  };

  return (
    <div className="puzzle-container">
      <h2>Widget Puzzle</h2>
      <p className="text-muted">Drag the trading widgets from the left to build your custom dashboard on the right!</p>

      <div className="puzzle-layout">
        
        {/* LEFT SIDE: THE PIECES POOL */}
        <div 
          className="puzzle-column pool" 
          onDragOver={onDragOver} 
          onDrop={onDropToPool}
        >
          <h3>Available Widgets</h3>
          <div className="pieces-grid">
            {pool.map((p) => (
              <div
                key={p.id}
                className="puzzle-piece"
                draggable
                onDragStart={(e) => onDragStart(e, p.id)}
              >
                <span className="piece-icon">{p.icon}</span>
                <span className="piece-name">{p.name}</span>
              </div>
            ))}
            {pool.length === 0 && <p className="text-muted">All widgets placed!</p>}
          </div>
        </div>

        {/* RIGHT SIDE: THE DROP ZONE (BOARD) */}
        <div 
          className="puzzle-column board" 
          onDragOver={onDragOver} 
          onDrop={onDropToBoard}
        >
          <h3>Your Dashboard</h3>
          <div className="board-dropzone">
            {board.map((p) => (
              <div
                key={p.id}
                className="puzzle-piece placed"
                draggable
                onDragStart={(e) => onDragStart(e, p.id)}
              >
                <span className="piece-icon">{p.icon}</span>
                <span className="piece-name">{p.name}</span>
              </div>
            ))}
            {board.length === 0 && (
              <div className="drop-placeholder">
                Drop widgets here to start building...
              </div>
            )}
          </div>
        </div>

      </div>

      {board.length === initialPieces.length && (
        <div className="puzzle-success">
          🎉 Congratulations! Your trading dashboard is complete.
        </div>
      )}
    </div>
  );
}

export default WidgetPuzzle;

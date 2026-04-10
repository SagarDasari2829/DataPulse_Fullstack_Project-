function SearchBar({ value, onChange, socketStatus, socketError }) {
  return (
    <div className="search-card">
      <label className="search-label" htmlFor="search-posts">
        Search posts in real time
      </label>
      <div className="search-row">
        <input
          id="search-posts"
          className="search-input"
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Type a post title..."
          autoComplete="off"
        />
        <span className={`status-pill status-${socketStatus}`}>
          {socketStatus === "connected" ? "Live" : socketStatus}
        </span>
      </div>
      <p className="search-help">
        Search updates through WebSocket as you type.
      </p>
      {socketError ? <p className="search-warning">{socketError}</p> : null}
    </div>
  );
}

export default SearchBar;

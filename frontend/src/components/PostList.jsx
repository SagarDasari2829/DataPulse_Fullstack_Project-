const inferPostCategory = (post) => {
  if (post.category?.trim()) {
    return post.category;
  }

  return "Post";
};

function PostList({ posts, loading, error, searchQuery }) {
  if (loading) {
    return (
      <div className="state-card">
        <div className="spinner" />
        <p>Loading posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="state-card error-state">
        <p>{error}</p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="state-card">
        <p>{searchQuery.trim() ? "No results found." : "No posts available yet."}</p>
      </div>
    );
  }

  return (
    <div className="post-grid">
      {posts.map((post) => (
        <article className="post-card" key={post._id || post.id}>
          <p className="post-tag">{inferPostCategory(post)}</p>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </article>
      ))}
    </div>
  );
}

export default PostList;

import { useEffect, useState } from "react";
import AppHeader from "../components/AppHeader";
import PostList from "../components/PostList";
import SearchBar from "../components/SearchBar";
import { useAuth } from "../context/AuthContext";
import { fetchPosts, getApiErrorMessage } from "../services/api";
import { connectSocket, disconnectSocket, sendSearchQuery, subscribeToSocket } from "../services/socket";

function Home() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [socketError, setSocketError] = useState("");
  const [socketStatus, setSocketStatus] = useState("connecting");

  useEffect(() => {
    let active = true;

    const loadPosts = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetchPosts();

        if (!active) {
          return;
        }

        setPosts(response);
        setFilteredPosts(response);
      } catch (requestError) {
        if (!active) {
          return;
        }

        setError(getApiErrorMessage(requestError));
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadPosts();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const unsubscribe = subscribeToSocket((message) => {
      if (message.type === "searchResults" && Array.isArray(message.data)) {
        setFilteredPosts(message.data);
        setSocketError("");
      }

      if (message.type === "error") {
        setSocketError(message.message || "Live search is temporarily unavailable.");
      }
    });

    connectSocket({
      onOpen: () => {
        setSocketStatus("connected");
        setSocketError("");
      },
      onClose: () => setSocketStatus("disconnected"),
      onError: () => {
        setSocketStatus("error");
        setSocketError("Live search connection dropped. Reconnecting...");
      },
    });

    return () => {
      unsubscribe();
      disconnectSocket();
    };
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredPosts(posts);
      setSocketError("");
      return;
    }

    const timer = window.setTimeout(() => {
      const sent = sendSearchQuery(searchQuery);

      if (!sent) {
        setFilteredPosts(
          posts.filter((post) =>
            post.title.toLowerCase().includes(searchQuery.trim().toLowerCase())
          )
        );
        setSocketError("Live search is reconnecting. Showing local fallback results.");
      }
    }, 250);

    return () => window.clearTimeout(timer);
  }, [posts, searchQuery]);

  return (
    <main className="page-shell">
      <AppHeader />

      <section className="hero-card">
        <div>
          <p className="eyebrow">DataPulse</p>
          <h1>Track posts with fast search and live updates.</h1>
          <p className="hero-copy">
            Browse posts from the API, filter them instantly through a WebSocket-powered search experience, and keep access limited to signed-in users.
          </p>
        </div>
        <div className="hero-stat">
          <span>{filteredPosts.length}</span>
          <p>{user?.role || "user"} access</p>
        </div>
      </section>

      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        socketStatus={socketStatus}
        socketError={socketError}
      />

      <PostList
        posts={filteredPosts}
        loading={loading}
        error={error}
        searchQuery={searchQuery}
      />
    </main>
  );
}

export default Home;

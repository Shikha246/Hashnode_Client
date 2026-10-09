import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';
import PostList from '../components/post/PostList';
import LoadingSpinner from '../components/layout/LoadingSpinner';
import ErrorMessage from '../components/layout/ErrorMessage';

const TagPage = () => {
  const { slug } = useParams();
  const [tag, setTag] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTagPosts = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await api.get(`/tags/${slug}/posts`);
        setTag(res.data.tag);
        setPosts(res.data.posts);
      } catch (err) {
        setError(
          err.response?.status === 404
            ? 'This tag does not exist.'
            : 'Failed to load posts for this tag.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTagPosts();
  }, [slug]);

  if (loading) return <LoadingSpinner />;

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '2rem 1rem' }}>
      <Link to="/tags" style={{ fontSize: '0.85rem', color: '#777' }}>
        ← All tags
      </Link>

      <ErrorMessage message={error} />

      {tag && (
        <h1 style={{ margin: '0.5rem 0 1.5rem' }}>
          Posts tagged <span style={{ color: '#4338ca' }}>#{tag.name}</span>
        </h1>
      )}

      {!error && <PostList posts={posts} />}
    </div>
  );
};

export default TagPage;
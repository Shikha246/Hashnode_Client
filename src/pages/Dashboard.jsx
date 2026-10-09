import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import LoadingSpinner from '../components/layout/LoadingSpinner';
import ErrorMessage from '../components/layout/ErrorMessage';

const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();

  const fetchMyPosts = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.get('/posts/mine');
      setPosts(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load your posts.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyPosts();
  }, []);

  const handleDelete = async (postId) => {
    const confirmed = window.confirm('Are you sure you want to delete this post? This cannot be undone.');
    if (!confirmed) return;

    setDeletingId(postId);
    try {
      await api.delete(`/posts/${postId}`);
      setPosts((prev) => prev.filter((p) => p._id !== postId));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete post.');
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1>My Dashboard</h1>
        <button onClick={() => navigate('/editor/new')} style={newPostBtn}>
          + New Post
        </button>
      </div>

      <ErrorMessage message={error} />

      {posts.length === 0 ? (
        <p style={{ color: '#777' }}>You haven't written anything yet. Click "New Post" to get started.</p>
      ) : (
        <div className="dashboard-table-wrapper">
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '2px solid #eee' }}>
              <th style={thStyle}>Title</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Last Updated</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post._id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={tdStyle}>
                  {post.status === 'published' ? (
                    <Link to={`/post/${post.slug}`}>{post.title}</Link>
                  ) : (
                    post.title
                  )}
                </td>
                <td style={tdStyle}>
                  <span style={post.status === 'published' ? publishedBadge : draftBadge}>
                    {post.status}
                  </span>
                </td>
                <td style={tdStyle}>{formatDate(post.updatedAt)}</td>
                <td style={{ ...tdStyle, display: 'flex', gap: '0.75rem' }}>
                  <Link to={`/editor/${post._id}`}>Edit</Link>
                  <button
                    onClick={() => handleDelete(post._id)}
                    disabled={deletingId === post._id}
                    style={deleteBtnStyle}
                  >
                    {deletingId === post._id ? 'Deleting...' : 'Delete'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
    </div>
  );
};

const thStyle = { padding: '0.6rem 0.5rem', fontSize: '0.85rem', color: '#555' };
const tdStyle = { padding: '0.6rem 0.5rem', verticalAlign: 'middle' };

const newPostBtn = {
  padding: '0.5rem 1rem',
  backgroundColor: '#1a1a1a',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
};

const deleteBtnStyle = {
  background: 'none',
  border: 'none',
  color: '#c81e1e',
  padding: 0,
};

const badgeBase = {
  fontSize: '0.75rem',
  padding: '0.15rem 0.5rem',
  borderRadius: '999px',
};

const publishedBadge = { ...badgeBase, backgroundColor: '#e3fcec', color: '#1a7f37' };
const draftBadge = { ...badgeBase, backgroundColor: '#fff3cd', color: '#8a6500' };

export default Dashboard;
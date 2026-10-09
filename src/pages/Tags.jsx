import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import LoadingSpinner from '../components/layout/LoadingSpinner';
import ErrorMessage from '../components/layout/ErrorMessage';

const Tags = () => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await api.get('/tags');
        setTags(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load tags.');
      } finally {
        setLoading(false);
      }
    };

    fetchTags();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '2rem 1rem' }}>
      <h1 style={{ marginBottom: '1.5rem' }}>Browse by Tag</h1>

      <ErrorMessage message={error} />

      {tags.length === 0 ? (
        <p style={{ color: '#777' }}>No tags yet.</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          {tags.map((tag) => (
            <Link key={tag._id} to={`/tag/${tag.slug}`} style={cardStyle}>
              <span style={{ fontWeight: 600 }}>{tag.name}</span>
              <span style={{ color: '#777', fontSize: '0.85rem' }}>
                {tag.postCount} {tag.postCount === 1 ? 'post' : 'posts'}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const cardStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.2rem',
  padding: '0.75rem 1.25rem',
  backgroundColor: '#fff',
  border: '1px solid #eee',
  borderRadius: '10px',
  minWidth: '140px',
};

export default Tags;
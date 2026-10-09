import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../hooks/useAuth';
import PostList from '../components/post/PostList';
import LoadingSpinner from '../components/layout/LoadingSpinner';
import ErrorMessage from '../components/layout/ErrorMessage';

const Profile = () => {
  const { id } = useParams();
  const { user: loggedInUser } = useAuth();

  const [profileUser, setProfileUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await api.get(`/users/${id}`);
        setProfileUser(res.data.user);
        setPosts(res.data.posts);
      } catch (err) {
        setError(
          err.response?.status === 404
            ? 'This user could not be found.'
            : 'Failed to load profile.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div style={{ maxWidth: '700px', margin: '2rem auto' }}><ErrorMessage message={error} /></div>;
  if (!profileUser) return null;

  const isOwnProfile = loggedInUser && loggedInUser._id === profileUser._id;

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '2rem 1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.5rem' }}>
        <img
          src={profileUser.avatarUrl || 'https://i.pravatar.cc/80'}
          alt={profileUser.name}
          style={{ width: 80, height: 80, borderRadius: '50%' }}
        />
        <div>
          <h1 style={{ marginBottom: '0.25rem' }}>{profileUser.name}</h1>
          {profileUser.bio && <p style={{ color: '#555' }}>{profileUser.bio}</p>}
          {isOwnProfile && (
            <Link to="/settings" style={{ fontSize: '0.85rem', color: '#4338ca' }}>
              Edit profile
            </Link>
          )}
        </div>
      </div>

      <h2 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: '#555' }}>
        Published posts ({posts.length})
      </h2>

      <PostList posts={posts} />
    </div>
  );
};

export default Profile;
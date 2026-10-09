import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';
import MarkdownPreview from '../components/editor/MarkdownPreview';
import TagPill from '../components/post/TagPill';
import LoadingSpinner from '../components/layout/LoadingSpinner';
import ErrorMessage from '../components/layout/ErrorMessage';
import { getReadingTime } from '../utils/readingTime';
const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

const PostDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await api.get(`/posts/${slug}`);
        setPost(res.data);
      } catch (err) {
        setError(
          err.response?.status === 404
            ? 'This post could not be found.'
            : 'Failed to load post.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div style={{ maxWidth: '700px', margin: '2rem auto' }}><ErrorMessage message={error} /></div>;
  if (!post) return null;

  return (
    <article style={{ maxWidth: '700px', margin: '0 auto', padding: '2rem 1rem' }}>
      {post.coverImage && (
        <img
          src={post.coverImage}
          alt={post.title}
          style={{ width: '100%', borderRadius: '10px', marginBottom: '1.5rem' }}
        />
      )}

      <h1 style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{post.title}</h1>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
        <Link to={`/profile/${post.author._id}`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <img
            src={post.author.avatarUrl || 'https://i.pravatar.cc/32'}
            alt={post.author.name}
            style={{ width: 32, height: 32, borderRadius: '50%' }}
          />
          <span style={{ fontWeight: 600 }}>{post.author.name}</span>
        </Link>
        <span style={{ color: '#777' }}>· {formatDate(post.createdAt)} · {getReadingTime(post.content)} min read</span>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        {post.tags?.map((tag) => (
          <TagPill key={tag._id} tag={tag} />
        ))}
      </div>

      <MarkdownPreview content={post.content} />
    </article>
  );
};

export default PostDetail;
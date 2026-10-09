import { Link } from 'react-router-dom';
import TagPill from './TagPill';
import { getReadingTime } from '../../utils/readingTime';

const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

const PostCard = ({ post }) => {
  return (
    <div style={cardStyle}>
      {post.coverImage && (
        <Link to={`/post/${post.slug}`}>
          <img src={post.coverImage} alt={post.title} style={coverStyle} />
        </Link>
      )}

      <div style={{ padding: '1rem' }}>
        <div style={{ marginBottom: '0.5rem' }}>
          {post.tags?.map((tag) => (
            <TagPill key={tag._id} tag={tag} />
          ))}
        </div>

        <Link to={`/post/${post.slug}`}>
          <h2 style={{ fontSize: '1.3rem', marginBottom: '0.4rem' }}>{post.title}</h2>
        </Link>

        {post.excerpt && (
          <p style={{ color: '#555', marginBottom: '0.75rem' }}>{post.excerpt}</p>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#777' }}>
          <Link to={`/profile/${post.author._id}`} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <img
              src={post.author.avatarUrl || 'https://i.pravatar.cc/24'}
              alt={post.author.name}
              style={{ width: 20, height: 20, borderRadius: '50%' }}
            />
            {post.author.name}
          </Link>
          <span>·</span>
          <span>{formatDate(post.createdAt)}</span>
          <span>·</span>
          <span>{getReadingTime(post.excerpt || '')} min read</span>
        </div>
      </div>
    </div>
  );
};

const cardStyle = {
  backgroundColor: '#fff',
  border: '1px solid #eee',
  borderRadius: '10px',
  overflow: 'hidden',
  marginBottom: '1.25rem',
};

const coverStyle = {
  width: '100%',
  height: '200px',
  objectFit: 'cover',
  display: 'block',
};

export default PostCard;
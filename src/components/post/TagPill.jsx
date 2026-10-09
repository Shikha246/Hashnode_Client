import { Link } from 'react-router-dom';

const TagPill = ({ tag }) => {
  return (
    <Link to={`/tag/${tag.slug}`} style={pillStyle}>
      {tag.name}
    </Link>
  );
};

const pillStyle = {
  display: 'inline-block',
  backgroundColor: '#eef2ff',
  color: '#4338ca',
  fontSize: '0.75rem',
  padding: '0.2rem 0.6rem',
  borderRadius: '999px',
  marginRight: '0.4rem',
};

export default TagPill;
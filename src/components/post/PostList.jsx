import PostCard from './PostCard';

const PostList = ({ posts }) => {
  if (posts.length === 0) {
    return <p style={{ color: '#777', padding: '2rem 0' }}>No posts yet.</p>;
  }

  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
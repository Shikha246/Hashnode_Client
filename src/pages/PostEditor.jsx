import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import MarkdownEditor from '../components/editor/MarkdownEditor';
import TagInput from '../components/editor/TagInput';
import LoadingSpinner from '../components/layout/LoadingSpinner';
import ErrorMessage from '../components/layout/ErrorMessage';

const PostEditor = () => {
  const { id } = useParams(); // present only when editing
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [tags, setTags] = useState([]);

  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // In edit mode, load the existing post's data
  useEffect(() => {
    if (!isEditMode) return;

    const loadPost = async () => {
      try {
        // Pull from "my posts" since it may be a draft (the public /:slug route won't return drafts)
        const res = await api.get('/posts/mine');
        const post = res.data.find((p) => p._id === id);

        if (!post) {
          setError('Post not found or you do not have permission to edit it.');
          return;
        }

        setTitle(post.title);
        setContent(post.content);
        setCoverImage(post.coverImage || '');
        setTags(post.tags.map((t) => t.name));
      } catch (err) {
        setError('Failed to load post.');
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [id, isEditMode]);

  const savePost = async (status) => {
    if (!title.trim() || !content.trim()) {
      setError('Title and content are required.');
      return;
    }

    setSaving(true);
    setError('');

    const payload = { title, content, coverImage, tags, status };

    try {
      if (isEditMode) {
        const res = await api.put(`/posts/${id}`, payload);
        navigate(res.data.status === 'published' ? `/post/${res.data.slug}` : '/dashboard');
      } else {
        const res = await api.post('/posts', payload);
        navigate(res.data.status === 'published' ? `/post/${res.data.slug}` : '/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save post.');
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem 1rem' }}>
      <h1 style={{ marginBottom: '1rem' }}>{isEditMode ? 'Edit Post' : 'New Post'}</h1>

      <ErrorMessage message={error} />

      <input
        type="text"
        placeholder="Post title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={titleInputStyle}
      />

      <input
        type="text"
        placeholder="Cover image URL (optional)"
        value={coverImage}
        onChange={(e) => setCoverImage(e.target.value)}
        style={fieldInputStyle}
      />

      <div style={{ marginBottom: '1rem' }}>
        <TagInput value={tags} onChange={setTags} />
      </div>

      <MarkdownEditor value={content} onChange={setContent} />

      <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
        <button onClick={() => savePost('draft')} disabled={saving} style={draftBtnStyle}>
          {saving ? 'Saving...' : 'Save as Draft'}
        </button>
        <button onClick={() => savePost('published')} disabled={saving} style={publishBtnStyle}>
          {saving ? 'Publishing...' : 'Publish'}
        </button>
      </div>
    </div>
  );
};

const titleInputStyle = {
  width: '100%',
  padding: '0.75rem',
  fontSize: '1.4rem',
  border: '1px solid #ccc',
  borderRadius: '8px',
  marginBottom: '0.75rem',
};

const fieldInputStyle = {
  width: '100%',
  padding: '0.5rem',
  border: '1px solid #ccc',
  borderRadius: '6px',
  marginBottom: '0.75rem',
};

const draftBtnStyle = {
  padding: '0.6rem 1.2rem',
  backgroundColor: '#fff',
  border: '1px solid #ccc',
  borderRadius: '6px',
};

const publishBtnStyle = {
  padding: '0.6rem 1.2rem',
  backgroundColor: '#1a1a1a',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
};

export default PostEditor;
import { useState } from 'react';

// value: array of tag name strings, e.g. ["javascript", "mongodb"]
const TagInput = ({ value, onChange }) => {
  const [input, setInput] = useState('');

  const addTag = () => {
    const clean = input.trim().toLowerCase();
    if (clean && !value.includes(clean)) {
      onChange([...value, clean]);
    }
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    }
  };

  const removeTag = (tagToRemove) => {
    onChange(value.filter((t) => t !== tagToRemove));
  };

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.5rem' }}>
        {value.map((tag) => (
          <span key={tag} style={pillStyle}>
            {tag}
            <button type="button" onClick={() => removeTag(tag)} style={removeBtnStyle}>
              ×
            </button>
          </span>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={addTag}
        placeholder="Type a tag and press Enter (e.g. javascript)"
        style={inputStyle}
      />
    </div>
  );
};

const pillStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.3rem',
  backgroundColor: '#eef2ff',
  color: '#4338ca',
  fontSize: '0.8rem',
  padding: '0.2rem 0.3rem 0.2rem 0.6rem',
  borderRadius: '999px',
};

const removeBtnStyle = {
  background: 'none',
  border: 'none',
  color: '#4338ca',
  cursor: 'pointer',
  fontSize: '1rem',
  lineHeight: 1,
};

const inputStyle = {
  width: '100%',
  padding: '0.5rem',
  border: '1px solid #ccc',
  borderRadius: '6px',
};

export default TagInput;
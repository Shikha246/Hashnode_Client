import MarkdownPreview from './MarkdownPreview';

const MarkdownEditor = ({ value, onChange }) => {
  return (
    <div className="editor-grid">
      <div style={paneStyle}>
        <p style={labelStyle}>Write (Markdown)</p>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Write your post in Markdown... e.g. # Heading, **bold**, ```js code```"
          style={textareaStyle}
        />
      </div>
      <div style={paneStyle}>
        <p style={labelStyle}>Preview</p>
        <div style={previewBoxStyle}>
          {value ? <MarkdownPreview content={value} /> : <p style={{ color: '#aaa' }}>Nothing to preview yet.</p>}
        </div>
      </div>
    </div>
  );
};

const containerStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '1rem',
};

const paneStyle = { display: 'flex', flexDirection: 'column' };

const labelStyle = { fontSize: '0.8rem', color: '#777', marginBottom: '0.4rem' };

const textareaStyle = {
  flex: 1,
  minHeight: '400px',
  padding: '0.75rem',
  border: '1px solid #ccc',
  borderRadius: '8px',
  fontFamily: 'Menlo, Consolas, monospace',
  fontSize: '0.9rem',
  resize: 'vertical',
};

const previewBoxStyle = {
  flex: 1,
  minHeight: '400px',
  padding: '0.75rem',
  border: '1px solid #eee',
  borderRadius: '8px',
  overflowY: 'auto',
  backgroundColor: '#fafafa',
};

export default MarkdownEditor;
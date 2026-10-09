import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const MarkdownPreview = ({ content }) => {
  return (
    <div className="markdown-body" style={proseStyle}>
      <ReactMarkdown
        components={{
          // Custom renderer for code blocks — gives us syntax highlighting
          code({ inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');

            if (!inline && match) {
              return (
                <SyntaxHighlighter
                  style={oneDark}
                  language={match[1]}
                  PreTag="div"
                  customStyle={{ borderRadius: '8px', fontSize: '0.9rem' }}
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              );
            }

            // Inline code like `this`
            return (
              <code
                style={{
                  backgroundColor: '#f1f1f1',
                  padding: '0.15rem 0.4rem',
                  borderRadius: '4px',
                  fontSize: '0.9em',
                }}
                {...props}
              >
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

const proseStyle = {
  lineHeight: 1.7,
  fontSize: '1.05rem',
};

export default MarkdownPreview;
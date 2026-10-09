const ErrorMessage = ({ message }) => {
  if (!message) return null;

  return (
    <p
      style={{
        padding: '0.75rem 1rem',
        backgroundColor: '#fde8e8',
        color: '#c81e1e',
        borderRadius: '6px',
        marginBottom: '1rem',
      }}
    >
      {message}
    </p>
  );
};

export default ErrorMessage;
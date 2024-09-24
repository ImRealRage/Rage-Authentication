
const LoadingSpinner = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#1a1a1d',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Animated Cat Playing */}
      <svg
        width="150"
        height="150"
        viewBox="0 0 150 150"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Cat Body */}
        <circle cx="75" cy="75" r="50" fill="#61dafb" />
        {/* Cat Ears */}
        <polygon points="45,50 65,20 85,50" fill="#61dafb" />
        <polygon points="65,50 85,20 105,50" fill="#61dafb" />
        {/* Cat Eyes */}
        <circle cx="60" cy="70" r="5" fill="#1a1a1d" />
        <circle cx="90" cy="70" r="5" fill="#1a1a1d" />
        {/* Cat Nose */}
        <polygon points="75,80 70,85 80,85" fill="#1a1a1d" />
        {/* Cat Mouth */}
        <path
          d="M70 85 Q75 95 80 85"
          stroke="#1a1a1d"
          strokeWidth="2"
          fill="none"
        />
        {/* Cat Whiskers */}
        <path
          d="M55 80 L40 75"
          stroke="#1a1a1d"
          strokeWidth="2"
        />
        <path
          d="M55 85 L40 85"
          stroke="#1a1a1d"
          strokeWidth="2"
        />
        <path
          d="M55 90 L40 95"
          stroke="#1a1a1d"
          strokeWidth="2"
        />
        <path
          d="M95 80 L110 75"
          stroke="#1a1a1d"
          strokeWidth="2"
        />
        <path
          d="M95 85 L110 85"
          stroke="#1a1a1d"
          strokeWidth="2"
        />
        <path
          d="M95 90 L110 95"
          stroke="#1a1a1d"
          strokeWidth="2"
        />
        {/* Cat Tail */}
        <path
          d="M125 100 Q140 80 125 60"
          stroke="#61dafb"
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
          style={{
            transformOrigin: '125px 100px',
            animation: 'tail-wag 1s infinite',
          }}
        />
        {/* CSS Animation */}
        <style>{`
          @keyframes tail-wag {
            0% { transform: rotate(0deg); }
            50% { transform: rotate(20deg); }
            100% { transform: rotate(0deg); }
          }
        `}</style>
      </svg>
    </div>
  );
};

export default LoadingSpinner;

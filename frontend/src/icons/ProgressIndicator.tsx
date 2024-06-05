type ProgressIndicatorProps = {
  textCount: number;
  className: string;
};

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ textCount, className }) => {
    const circumference = 62.8319; // Circumference of the circle
    const offset = Math.max(0, circumference - (textCount / 500) * circumference);

  return (
    <div className="progress-indicator">
     <svg width="25" height="25" viewBox="0 0 25 25">
        <circle className="progress-background" cx="12.5" cy="12.5" r="10" />
        <circle
          className={`${className} progress-bar`}
          cx="12.5"
          cy="12.5"
          r="10"
          style={{ strokeDasharray: circumference, strokeDashoffset: offset }}
        />
      </svg>
    </div>
  );
};

export default ProgressIndicator;

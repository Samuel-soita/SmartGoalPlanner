function ProgressBar({ current, target }) {
  const percentage = target > 0 ? Math.min((current / target) * 100, 100) : 0;

  // Determine color based on percentage
const getColor = () => {
    if (percentage >= 100) return "#4caf50";      // green
    if (percentage >= 50) return "#ff9800";       // orange
    return "#f44336";                             // red
};

const progressBarStyles = {
    width: "100%",
    height: "20px",
    backgroundColor: "#e0e0e0",
    borderRadius: "10px",
    overflow: "hidden",
    margin: "10px 0",
};

const progressFillStyles = {
    height: "100%",
    width: `${percentage}%`,
    backgroundColor: getColor(),
    transition: "width 0.4s ease",
    color: "white",
    textAlign: "center",
    fontSize: "12px",
    lineHeight: "20px",
};

return (
    <div
    className="progress-bar"
    role="progressbar"
    aria-valuenow={Math.round(percentage)}
    aria-valuemin="0"
    aria-valuemax="100"
    style={progressBarStyles}
    >
    <div className="progress-fill" style={progressFillStyles}>
        {percentage.toFixed(2)}%
    </div>
    </div>
);
}

export default ProgressBar;

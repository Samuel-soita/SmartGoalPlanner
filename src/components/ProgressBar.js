function ProgressBar({current, target}){
    const percentage = target > 0 ? Math.min((current / target) * 100, 100) : 0;

    return (
    
    <div className="progress-bar"
        role="progressbar"
        aria-valuenow={Math.round(percentage)}
        aria-valuemin="0"
        aria-valuemax="100"
        >
        <div className="progress-fill" 
        style={{ width: `${percentage}%` }}
        
        >
        {percentage.toFixed(2)}%
            
        </div>
    </div>
    );

}
export default ProgressBar;
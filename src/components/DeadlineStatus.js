function DeadlineStatus({ deadline }) {
    const today= new Date();
    const deadlinedate = new Date(deadline);
    const daysLeft = Math.ceil((deadlinedate - today) / (1000 * 60 * 60 * 24));

  //if deadline has passed 
    if (daysLeft < 0) {
        return <span className="deadline-status overdue">Overdue</span>;
    } else if (daysLeft === 0) {
        return <span className="deadline-status today">Due Today</span>;
    } else {
        return <span className="deadline-status upcoming">{daysLeft} days left</span>;
    }
}
export default DeadlineStatus;
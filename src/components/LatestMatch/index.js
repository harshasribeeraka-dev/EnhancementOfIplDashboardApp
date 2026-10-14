import './index.css'

const LatestMatch = props => {
  const {latestMatchDetails} = props
  const {
    umpires,
    result,
    manOfTheMatch,
    date,
    venue,
    competingTeam,
    competingTeamLogo,
    firstInnings,
    secondInnings,
    matchStatus,
  } = latestMatchDetails

  return (
    <div className="latest-match-container">
      <h3 className="latest-match-heading">Latest Matches</h3>
      <div className="latest-match-details">
        <div className="match-info">
          <p className="match-detail">{competingTeam}</p>
          <p className="match-detail">{date}</p>
          <p className="match-detail">{venue}</p>
          <p className="match-detail">{result}</p>
        </div>
        <img
          src={competingTeamLogo}
          alt={`latest match ${competingTeam}`}
          className="competing-team-logo"
        />
        <div className="match-info">
          <p className="match-detail">First Innings: {firstInnings}</p>
          <p className="match-detail">Second Innings: {secondInnings}</p>
          <p className="match-detail">Man Of The Match: {manOfTheMatch}</p>
          <p className="match-detail">Umpires: {umpires}</p>
          <p className={`match-status ${matchStatus.toLowerCase()}`}>
            {matchStatus}
          </p>
        </div>
      </div>
    </div>
  )
}

export default LatestMatch

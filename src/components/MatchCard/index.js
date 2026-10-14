import './index.css'

const MatchCard = props => {
  const {match} = props
  const {competingTeam, competingTeamLogo, result, matchStatus} = match

  return (
    <li className="match-card">
      <img
        src={competingTeamLogo}
        alt={`competing team ${competingTeam}`}
        className="competing-team-logo"
      />
      <p className="match-result">{result}</p>
      <p className={`match-status ${matchStatus.toLowerCase()}`}>
        {matchStatus}
      </p>
    </li>
  )
}

export default MatchCard

import './index.css'

const TeamCard = props => {
  const {team, onClickTeam} = props
  const {id, name, teamImageUrl} = team

  const onClick = () => {
    onClickTeam(id)
  }

  return (
    <li className="team-card" onClick={onClick}>
      <img src={teamImageUrl} alt={name} className="team-logo" />
      <p className="team-name">{name}</p>
    </li>
  )
}

export default TeamCard

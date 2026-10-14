import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import './index.css'

const teamsApiUrl = 'https://apis.ccbp.in/ipl'

const Home = () => {
  const [teams, setTeams] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchTeams = async () => {
      setIsLoading(true)
      const response = await fetch(teamsApiUrl)
      const data = await response.json()
      const formattedTeams = data.teams.map(team => ({
        id: team.id,
        name: team.name,
        teamImageUrl: team.team_image_url,
      }))
      setTeams(formattedTeams)
      setIsLoading(false)
    }
    fetchTeams()
  }, [])

  return (
    <div className="home-container">
      <h1 className="home-heading">IPL Dashboard</h1>
      <img
        src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
        alt="ipl logo"
        className="ipl-logo"
      />
      {isLoading ? (
        <div data-testid="loader" className="loader-container">
          <Loader type="Oval" color="#ffffff" height={50} width={50} />
        </div>
      ) : (
        <ul className="teams-list">
          {teams.map(team => (
            <li key={team.id} className="team-card">
              <Link to={`/team-matches/${team.id}`} className="team-link">
                <img
                  src={team.teamImageUrl}
                  alt={team.name}
                  className="team-logo"
                />
                <p className="team-name">{team.name}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Home

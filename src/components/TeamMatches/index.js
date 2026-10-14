import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'
import './index.css'

const teamMatchesApiUrl = 'https://apis.ccbp.in/ipl/'

const teamColors = {
  RCB: 'rcb',
  KKR: 'kkr',
  KXP: 'kxp',
  CSK: 'csk',
  RR: 'rr',
  MI: 'mi',
  SRH: 'srh',
  DC: 'dc',
}

const TeamMatches = () => {
  const {id} = useParams()
  const [teamMatchesData, setTeamMatchesData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchTeamMatches = async () => {
      setIsLoading(true)
      const response = await fetch(`${teamMatchesApiUrl}${id}`)
      const data = await response.json()

      const formattedLatestMatch = {
        umpires: data.latest_match_details.umpires,
        result: data.latest_match_details.result,
        manOfTheMatch: data.latest_match_details.man_of_the_match,
        id: data.latest_match_details.id,
        date: data.latest_match_details.date,
        venue: data.latest_match_details.venue,
        competingTeam: data.latest_match_details.competing_team,
        competingTeamLogo: data.latest_match_details.competing_team_logo,
        firstInnings: data.latest_match_details.first_innings,
        secondInnings: data.latest_match_details.second_innings,
        matchStatus: data.latest_match_details.match_status,
      }

      const formattedRecentMatches = data.recent_matches.map(match => ({
        umpires: match.umpires,
        result: match.result,
        manOfTheMatch: match.man_of_the_match,
        id: match.id,
        date: match.date,
        venue: match.venue,
        competingTeam: match.competing_team,
        competingTeamLogo: match.competing_team_logo,
        firstInnings: match.first_innings,
        secondInnings: match.second_innings,
        matchStatus: match.match_status,
      }))

      setTeamMatchesData({
        teamBannerUrl: data.team_banner_url,
        latestMatchDetails: formattedLatestMatch,
        recentMatches: formattedRecentMatches,
      })
      setIsLoading(false)
    }
    fetchTeamMatches()
  }, [id])

  if (isLoading) {
    return (
      <div data-testid="loader" className="loader-container">
        <Loader type="Oval" color="#ffffff" height={50} width={50} />
      </div>
    )
  }

  const {teamBannerUrl, latestMatchDetails, recentMatches} = teamMatchesData

  return (
    <div className={`team-matches-container ${teamColors[id] || ''}`}>
      <img src={teamBannerUrl} alt="team banner" className="team-banner" />
      <LatestMatch latestMatchDetails={latestMatchDetails} />
      {/* Render umpire, first innings, second innings, man of the match as paragraphs */}
      <p>{latestMatchDetails.umpires}</p>
      <p>{latestMatchDetails.firstInnings}</p>
      <p>{latestMatchDetails.secondInnings}</p>
      <p>{latestMatchDetails.manOfTheMatch}</p>

      <ul className="recent-matches-list">
        {recentMatches.map(match => (
          <li key={match.id}>
            <p>{match.competingTeam}</p>
            <MatchCard match={match} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TeamMatches

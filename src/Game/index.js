import {Component} from 'react'
import TabItem from '../TabItem'
import GameItem from '../GameItem'
import './index.css'

class Game extends Component {
  constructor(props) {
    super(props)
    const {tabsList, imagesList} = this.props
    this.state = {
      activeTabId: tabsList[0].tabId,
      score: 0,
      timer: 60,
      activeImgUrl: imagesList[0].imageUrl,
      gameOver: false,
    }
  }

  componentDidMount() {
    this.timerId = setInterval(this.changeTime, 1000)
  }

  changeTime = () => {
    const {timer} = this.state
    if (timer === 0) {
      this.setState({gameOver: true})
      clearInterval(this.timerId)
    } else {
      this.setState({timer: timer - 1})
    }
  }

  updateTabId = id => {
    this.setState({activeTabId: id})
  }

  checkImg = imageUrl => {
    const {activeImgUrl, score} = this.state
    const {imagesList} = this.props
    if (activeImgUrl === imageUrl) {
      const shuffledImages = [...imagesList].sort(() => Math.random() - 0.5)
      const newImgUrl = shuffledImages[0].imageUrl
      this.setState({
        score: score + 1,
        activeImgUrl: newImgUrl,
      })
    } else {
      this.setState({gameOver: true})
      clearInterval(this.timerId)
    }
  }

  resetGame = () => {
    const {tabsList, imagesList} = this.props
    this.setState({
      gameOver: false,
      activeTabId: tabsList[0].tabId,
      score: 0,
      timer: 60,
      activeImgUrl: imagesList[0].imageUrl,
    })
    this.timerId = setInterval(this.changeTime, 1000)
  }

  render() {
    const {tabsList, imagesList} = this.props
    const {activeTabId, score, timer, gameOver, activeImgUrl} = this.state
    const filteredImages = imagesList.filter(
      each => each.category === activeTabId,
    )

    return (
      <div className="main-cont">
        <ul className="header">
          <li>
            <img
              src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
              alt="website logo"
              className="logo-img"
            />
          </li>
          <li className="inner-head">
            <p className="score-txt">
              Score: <span>{score}</span>
            </p>
            <img
              className="timer-img"
              src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
              alt="timer"
            />
            <p>{timer} sec</p>
          </li>
        </ul>

        {!gameOver ? (
          <div className="lower-cont">
            <img className="active-img" src={activeImgUrl} alt="match" />

            <ul>
              {tabsList.map(each => (
                <TabItem
                  clickedTab={this.updateTabId}
                  key={each.tabId}
                  details={each}
                  isActive={each.tabId === activeTabId}
                />
              ))}
            </ul>

            <ul>
              {filteredImages.map(each => (
                <GameItem
                  key={each.id}
                  details={each}
                  clickedImg={this.checkImg}
                />
              ))}
            </ul>
          </div>
        ) : (
          <div className="game-over">
            <img
              className="trophy-img"
              src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png"
              alt="trophy"
            />
            <br />
            <br />
            <p className="score-txt">YOUR SCORE</p>
            <p className="score-txt big-font">{score}</p>
            <br />
            <button
              className="play-again-btn"
              type="button"
              onClick={this.resetGame}
            >
              <img
                className="reset-img"
                src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
                alt="reset"
              />
              PLAY AGAIN
            </button>
          </div>
        )}
      </div>
    )
  }
}

export default Game

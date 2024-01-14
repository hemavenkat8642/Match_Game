import './index.css'

const GameItem = props => {
  const {details, clickedImg} = props
  const {imageUrl, thumbnailUrl} = details

  const onClc = () => {
    clickedImg(imageUrl)
  }

  return (
    <li>
      <button type="button" className="thumb-btn" onClick={onClc}>
        <img className="thumb-img" src={thumbnailUrl} alt="thumbnail" />
      </button>
    </li>
  )
}

export default GameItem

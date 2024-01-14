import './index.css'

const TabItem = props => {
  const {details, clickedTab, isActive} = props
  const {tabId, displayText} = details

  const onClc = () => {
    clickedTab(tabId)
  }

  return (
    <li>
      <button
        type="button"
        onClick={onClc}
        className={isActive ? 'tab-btn act' : 'tab-btn'}
      >
        {displayText}
      </button>
    </li>
  )
}

export default TabItem

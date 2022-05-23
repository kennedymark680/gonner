import GonnerInverted from '../resources/gonnerInv.png'

const HomeBanner = (props) => {
  return (
    <div className="home-banner" onClick={() => props.clickLearn()}>
      <div className='banner-text'>Guess who will be a ...</div>
      <img src={GonnerInverted} alt="gonnerLogo" className="gonner-logo-home" />
      <div className='learn-to-play'>Learn to Play</div>
    </div>
  )
}

export default HomeBanner
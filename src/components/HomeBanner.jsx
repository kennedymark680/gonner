import GonnerLogoTran from '../resources/gonnerTran.png'
import GonnerInverted from '../resources/gonnerInv.png'

const HomeBanner = () => {
  return (
    <div className="home-banner">
      <div className='banner-text'>Guess who will be a ...</div>
      <img src={GonnerInverted} alt="gonnerLogo" className="gonner-logo-home" />
      <div className='learn-to-play'>Learn to Play</div>
    </div>
  )
}

export default HomeBanner
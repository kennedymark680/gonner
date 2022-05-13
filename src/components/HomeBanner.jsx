import GonnerLogoTran from '../resources/gonnerTran.png'
import GonnerInverted from '../resources/gonnerInv.png'

const HomeBanner = () => {
  return (
    <div className="home-banner">
      <div className='banner-text'>Guess who will be a ...</div>
      <img src={GonnerInverted} alt="gonnerLogo" className="gonner-logo-home" />
      <button className='learn-to-play'>Learn to Play</button>
    </div>
  )
}

export default HomeBanner
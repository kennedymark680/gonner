import GonnerLogoTran from '../resources/gonnerTran.png'

const HomeBanner = () => {
  return (
    <div className="home-banner">
      <div className='banner-text'>Who do you think will be a </div>
      <img src={GonnerLogoTran} alt="gonnerLogo" className="gonner-logo-home" />
      <button className='learn-to-play'>Learn to Play</button>
    </div>
  )
}

export default HomeBanner
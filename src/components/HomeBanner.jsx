import GonnerLogo from '../resources/gonner.png'

const HomeBanner = () => {
  return (
    <div className="home-banner">
      <h4>Welcome to</h4>
      <img src={GonnerLogo} alt="gonnerLogo" className="gonner-logo-home" />
    </div>
  )
}

export default HomeBanner
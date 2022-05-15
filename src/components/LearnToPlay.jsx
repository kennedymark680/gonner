import Cast from "./Cast"
import CastImage from '../resources/Screen Shot 2022-05-13 at 2.23.15 PM.png'
import AddCast from '../resources/AddCast.png'
import PickYourOrder from '../resources/PickYouOrder.png'
import EarnPoints from '../resources/EarnPoints.png'

const LearnToPlay = () => {
  return (
    <div className="learn-to-play-section">
      <h4>FIRST:   Select a movie to watch. Start the movie and pause once introduced to what you feel is the majority of the cast. Then create a list of all the cast members.</h4>
      <img src={AddCast} alt='example cast' className="example-pix"/>
      <h4> SECOND:    For every player, create a list. Each player will guess when or if the cast are gonners.</h4>
      <img src={PickYourOrder} alt='example cast' className="example-pix"/>
      <h4> THIRD:    Play the movie! Mark the cast as they die.</h4>
      <img src={EarnPoints} alt='example cast' className="example-pix"/>
      <h4> EXACT MATCH = 3 points</h4>
      <h4> ONE OFF = 1 points</h4>
      <h4> GUESS LIVES + LIVES = 3 points</h4>
    </div>
  )
}

export default LearnToPlay
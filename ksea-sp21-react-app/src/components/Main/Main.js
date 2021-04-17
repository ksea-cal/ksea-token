import './Main.css';
import MainImg from './../../img/main.png';
import { Stack } from "@chakra-ui/react"
import {Link} from 'react-router-dom';

export default function Main() {
  return(
    <div id="main">
      <Stack spacing={5}>
        <h1>We build KSEA's economy</h1>
        <h3>Participate in KSEA events and earn prizes!</h3>
        <Link to="/about-us">
          <button type="button" className="abtus-btn">
            About Us
          </button>
        </Link>
      </Stack>
      <img src={MainImg} alt="main img"/>
    </div>
  )
}
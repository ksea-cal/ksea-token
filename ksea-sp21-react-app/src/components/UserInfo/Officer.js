import './Officer.css'
import kseaToken from '../ethereum/KSEA_Token'
import kseAirdrop from '../ethereum/KSEAirdrop'
import { useEffect, useState } from 'react'

export default function Officer({onboardState}) {
  useEffect(() => {
    async function fetchData() {

      let t = await kseaToken()
      setToken(t);

      let a = await kseAirdrop()
      setAirdrop(a);
    }
    fetchData();
    // console.log("kseaToken: " + token.options.address);
    // console.log("kseAirdrop: " + airdrop.options.address)
  })

  const [airdrop, setAirdrop] = useState(null);
  const [token, setToken] = useState(null);

  return(
    <div>
      {!onboardState.address ?
        <h2>Please Connect Your Wallet</h2>
        :
        <div>
          <div id='officer'>
            <button>Register Board Member</button>
            <button>Deregister Board Member</button>
            <button>List of Board Members</button>
            <select>
              <option>--Choose Event--</option>
              <option>GM: 2 Dobbies</option>
              <option>Focus Group:3</option>
              <option>KSEA Chat: 1</option>
              <option>Lead Focus Group: 4</option>
            </select>
            <button>Distribute Ether</button>
            <button>Create Checkin Event</button>
            <button>Create Auction</button>
          </div>
        </div>
      }
    </div>
  )
}
import './Officer.css'

export default function Officer({user}) {
  return(
    <div>
      {user === undefined ?
        <h2>Please connect yout wallet</h2>
        :
        <div>
        {user.id < 5 ?
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
          :
          <h2>{user.name} is not an officer</h2>
        }
        </div>
      }
    </div>
  )
}
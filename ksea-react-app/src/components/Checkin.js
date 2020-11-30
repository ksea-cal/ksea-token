import React from 'react';
import './Checkin.css'

function Checkin(props) {
    //TODO: onclick event handle 
    return (
        <div className="checkin">
            <div class="centerbox">
                <center>
                <div class="secretword">What's the secret word?</div>
                <form>    
                    <input type="text" name="psw" size= "20" placeholder="Pasword of Today"></input>
                    <p></p>
                    <button type="submit" value="SUBMIT">SUBMIT</button>
                </form>
                </center>
            </div>
        </div>
    );
}
import React from 'react';
import './Profile.css'

//TODO: DB에서 토큰, 포인트, 이름, 배경/프사 끌어오기

function Profile(){
    return(
        <div className="profile">
            <div class="profileBox">
                <li class="about">
                    <article>
                        <div class="about-backimage"></div>
                        <div class="about-profileimage"></div>
                    </article>
                    <article class="about-text">
                        <h1>Name</h1>
                        <p>Current point</p>
                        <p>Dobby</p>
                    </article>
                </li>
            </div>
        </div>
    );
}

export default Profile;
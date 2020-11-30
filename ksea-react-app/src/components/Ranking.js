import React from 'react';
import './Ranking.css'

//TODO: DB 에서 포인트랭킹 매기기 데려오기

function Ranking() {
    return (
        <div className="ranking">
            <div class="rankingbox">
                <article class="topthree">
                    <article class="relativebox">
                    <article class="firstplace">
                        <div class="firstperson"></div>
                        <div class="firstcontent">
                            <p style="line-height:0.1">Name</p>
                            <p>Point</p>
                        </div>
                    </article>
                    <article class="secondplace">
                        <div class="secondperson"></div>
                        <div class="secondcontent">
                            <p style="line-height:0.1">Name</p>
                            <p>Point</p>
                        </div>
                    </article>
                    <article class="thirdplace">
                        <div class="thirdperson"></div>
                        <div class="thirdcontent">
                            <p style="line-height:0.1">Name</p>
                            <p>Point</p>
                        </div>
                    </article>
                    </article>
                </article>
                <div class="wholerankbox">
                    <table class="ranktable">
                        <thead>
                            <tr>
                                <th class="title" scope="cols">#</th>
                                <th class="title" scope="cols">Name</th>
                                <th class="title" scope="cols">Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            <td class="content">1</td>
                            <td class="content">Chris</td>
                            <td class="content">45</td>
                        </tbody>
                        <tbody>
                            <td class="content">2</td>
                            <td class="content">Brian</td>
                            <td class="content">43</td>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

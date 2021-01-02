import React from 'react';
import './ProductDetail.css'

function ProductDetail() {
    return (
        <div className="productdetail">
            <div class="auctionboxFrame">
		        <section class="topbox">
    		        <section class="productimage"></section>
        		    <article class="generalbox">
        	            <section class="clockframe"></section>
        		        <section class="pregeneral">
        		            <section class="generalspcfic1">
        		                <p>ENTRY FEE</p>
        		                <div style={{fontSize: "100px"}}>3</div>
        		            </section>
        		            <div class="generalspcfic2">
                                <form id="wrapper">
                                    <input type="number" name="bidamount"></input>
                                    <button style={{width:"40%"}}>Bid</button>
                                    <p></p>
                                    <button>Withdraw</button>
                                </form>
        		            </div>
                        </section>
        		    </article>
    	        </section>
		        <section class="bottombox">
                    <section class="bidranking">
                        <p style={{fontSize:"25px"}}>TOP BID</p>
                        56
                        <p style={{fontSize:"25px"}}>Name</p>
                    </section>
    		    </section>
	    	</div>
        </div>

    );
}

export default ProductDetail;
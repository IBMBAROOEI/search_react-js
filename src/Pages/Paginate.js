import React from 'react';
const  Paginate = ({ postprepage,totalpost, paginate})  => {
    const pagenumber=[];

    for (let i = 1; i <= Math.ceil(totalpost / postprepage);i++){
        pagenumber.push(i)
    }


    return (

        <nav>
            <ul className="pagination">
                {pagenumber.map( num => (
                    <li key={num} className="page-item">
                        <a onClick={() =>  paginate(num)}className="page-link" href="!#">
                            {num}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>



    )

}








export default Paginate;

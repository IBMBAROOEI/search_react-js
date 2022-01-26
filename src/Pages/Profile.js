
import ReactPaginate from "react-paginate";
import React, {useState, useEffect}from 'react';
import axios from 'axios';
import './P.css';


function    Profile()  {

    const [User, setUser] = useState([]);

    const [keyname, setkeyname] = useState('');
    const [keyfamily, setfamily] = useState('');
    const [keyage,setage] = useState('');
    const [keywork, setwork] = useState('');





    const [pageNumber, setPageNumber] = useState(0);

    const usersPerPage =3;
    const pagesVisited = pageNumber * usersPerPage;

    const displayUsers = User
        .slice(pagesVisited, pagesVisited + usersPerPage)



    const pageCount = Math.ceil(User.length / usersPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };


    const handelsetkeyname= (event) => {
        const data = event.target.value;
        setkeyname(data)
    }
    const handelsetfamily= (event) => {
        const data = event.target.value;
        setfamily(data)
    }


    //search fage
    const handelsetage= (event) => {

        const data = event.target.value;
        setage(data)
    }

    const handelsetwork= (event) => {
        const data=event.target.value;
        setwork(data)


    };

    const search =() =>{
        axios.get(`http://karanza.ir:8080/search/?name=${keyname}&age=${keyage}&work=${keywork}&family=${keyfamily}&`,
            {
                headers: {
                    'Content-Type' : "text/html",
                    'charset':"utf-8"
                },

            }

        ).then(response =>{
            setUser(response.data)
            setPageNumber(0)
        }).catch(er =>{
            console.log(er)
        })


    }

    useEffect(() => {
        axios.get('http://karanza.ir:8080/getall').then(response =>{
            setUser(response.data)
        }).catch(er =>{
            console.log(er)
        })
    },[])



    return (


        <div>
            <form>

                <div className="form-row">

                    <div className="form-group col-md-3">
                        <label >نام</label>
                        <input type="text"    name="name" className="form-control"  value={keyname}   onChange={handelsetkeyname}/>
                    </div>
                    <div className="form-group col-md-3">
                        <label>نام خانوداگی</label>
                        <input type="text"name="family" className="form-control" value={keyfamily}   onChange={handelsetfamily} />
                    </div>

                    <div className="form-group col-md-3">
                        <label >شغل</label>
                        <input type="text" className="form-control"   name="work"  value={keywork}  onChange={handelsetwork}  />
                    </div>
                    <div className="form-group col-md-3">
                        <label >سن</label>
                        <input type="number"  name="age" className="form-control"  value={keyage}  onChange={handelsetage}  />
                    </div>
                    <div className="col-md-12 ml-5">
                        <button type="button"
                                className="btn btn-primary btn-block"
                                onClick={()=>search()}
                        >جست وجو </button>
                    </div>
                </div>

            </form>
            <div className='row'>
                {displayUsers.map((item)=>{
                        return(
                            <div className='col-lg-6' key={item.id}>

                                <div className="card mb-3" style={{ width:'40vh' }}>

                                    <div className="row no-gutters">
                                        <div className="col-md-8">
                                            <div className="card-body">
                                                <h5 className="card-title">{item.name}</h5>
                                                <p className="card-text">{item.family}</p>
                                                <p className="card-text">{item.work}</p>
                                                <p className="card-text"><small className="text-muted">{item.age}</small></p>
                                            </div>
                                        </div>
                                        <div className="col-md-4">

                                            <img src={item.profile_image} className="card-img" alt=""/>
                                        </div>

                                    </div>

                                </div>

                            </div>
                        )
                    }
                )}

            </div>


            <>

                { <div className='page1'>

                    <ReactPaginate
                        previousLabel={"قبلی"}
                        nextLabel={"بعدی"}
                        pageCount={pageCount}
                        onPageChange= {changePage}

                        containerClassName={"paginationBttns"}
                        previousLinkClassName={"previousBttn"}
                        nextLinkClassName={"nextBttn"}
                        disabledClassName={"paginationDisabled"}
                        activeClassName={"paginationActive"}
                    />
                </div> }
            </>


        </div>


    )

}

export default Profile;

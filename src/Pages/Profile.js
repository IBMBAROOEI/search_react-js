import React, {useState, useEffect}from 'react';
import axios from 'axios';

import Paginate from '../Pages/Paginate';

function    Profile()  {

 const [User, setUser] = useState([]);
 const [currentpage,setcurrentpage] =useState(1)
 const [postprepage] =useState(20)
 const [keyname, setkeyname] = useState('');
 const [keyfamily, setfamily] = useState('');
 const [keyage,setage] = useState('');
 const [keywork, setwork] = useState('');


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
  axios.get(`http://a.ir:8080/search/?name=${keyname}&age=${keyage}&work=${keywork}&family=${keyfamily}&`,
      {
       headers: {
        'Content-Type' : "text/html",
        'charset':"utf-8"
       },

      }

  ).then(response =>{
   setUser(response.data)

  }).catch(er =>{
   console.log(er)
  })


 }

 useEffect(() => {
  axios.get('http://a.ir:8080/getall').then(response =>{
   setUser(response.data)
  }).catch(er =>{
   console.log(er)
  })
 },[])


 const indexoflastpost=currentpage*postprepage;
 const indexfirstpost=indexoflastpost-postprepage;
 const currentposts=User.slice(indexfirstpost,indexoflastpost)

 const paginate= ( num)=> setcurrentpage(num)
 return (


     <div>
      <form >

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
        <div className="col-md-4">
         <button type="button"
                 className="btn btn-primary btn-block"
                 onClick={()=>search()}
         >Search</button>
        </div>
       </div>

      </form>







      <div className='row'>
       {currentposts.map((item)=>{
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

      <Paginate postprepage={postprepage}
                totalpost={User.length} paginate={paginate}
      />
     </div>


 )

}
export default Profile;

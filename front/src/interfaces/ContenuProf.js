import react from 'react'
import './ContenuProf.css';
import UpdateCours from '../components/UpdateCours'

function ContenuProf(props)
{



    return(<div className="wow">
            <p>{props.who===1 ? <p>hello one</p> : <div></div> }</p>
            <p>{props.who===2 ? <p>hello two</p> : <div></div> }</p>
            <p>{props.who===3 ? <UpdateCours/> : <div></div> }</p>
           
           </div>)
}

export default ContenuProf;
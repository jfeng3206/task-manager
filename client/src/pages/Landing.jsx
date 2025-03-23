import {Link} from 'react-router-dom'
import Wrapper from '../assets/wrappers/Landing.js';
const Landing = () => {
  return (
    <Wrapper>
    <div className="container_page"> 
        <div className="info">
          <h1>task<span> tracking </span> app
          </h1>
          <p>
            Keep track of your tasks, deadlines, and more.
          </p>
          <Link to ="/register" className ="btn register-link">Register</Link>
          <Link to ="/login" className ="btn login-link">Login</Link>  
        {/* <img src={main} alt='job hunt' className='img main-img' /> */}
      </div>
      </div>
      </Wrapper>
  )
}

export default Landing
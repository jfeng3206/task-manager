import { Link, Form, redirect,useNavigate } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { FormRow,  SubmitBtn } from '../components';
import customFetch from '../utils/customFetch';
import { useActionData } from 'react-router-dom';
export const action =
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await customFetch.post("/auth/login", data);
      console.log("Login successful");
      return redirect("/dashboard");
    } catch (error) {
      // toast.error(error.response.data.msg);
      return error;
    }
  };


const Login = () => {
  const navigate = useNavigate();
  const errors = useActionData();
 const loginDemoUser = async () => {
   const data = {
     email: 'test@test.com',
     password: 'secret123',
   };
   try {
     await customFetch.post('/auth/login', data);
     // toast.success('take a test drive');
     navigate('/dashboard');
   } catch (error) {
     return error;
   }
 };
  
  return (
     <Wrapper>
         <Form method='post' className='form'>
        <h4>Login</h4>
        {errors && <p style={{ color: 'red' }}>{errors.msg}</p>}
        <FormRow type="email" name="email"   />
        <FormRow type="password" name="password"    />
        <SubmitBtn />
        <button type='button' className='btn btn-block' onClick={loginDemoUser}>
         explore the app
       </button>
        <p>
              Not a member yet? <Link to ="/register">Register</Link>
        </p>
        </Form>
        
     </Wrapper>
     
  )
     
  
}

export default Login
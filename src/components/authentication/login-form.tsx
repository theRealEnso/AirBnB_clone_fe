import { useState, ChangeEvent, FormEvent} from "react";
import { Link, useNavigate } from "react-router-dom";

//import components
import { FormInput } from "./FormInput";
import { RiseLoader } from "react-spinners";

//import loginUser function to back end login user api endpoint
import { useLoginUserMutation } from "../../api/api-slice";

const LoginForm = () => {
  const navigate = useNavigate();

  const [loginUser, {isLoading, isSuccess, isError, error}] = useLoginUserMutation();

  const [formInputs, setFormInputs] = useState({
    email: "",
    password: "",
  });

  const {email, password} = formInputs;

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;

    setFormInputs({
      ...formInputs,
      [name]: value,
    });

  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      await loginUser({...formInputs});

      if(isSuccess){
        navigate("/")
      }

    } catch(error) {
      console.error(`Error logging in the user: ${error}`)
    }

  };

  return (
    <div className="flex items-center justify-center min-h-screen flex-col m-auto">

      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="mb-4 text-2xl font-bold tracking-wide">Welcome back!</h1>
        <span className="font-bold text-xl tracking wide">Sign in</span>
      </div>

      <div className="w-[30%] mb-2">
        <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-6">
            <div className="w-full shadow-md rounded-lg pl-4">
                <FormInput type="text" name="email" label="Email address" value={email} onChange={handleInputChange}/>
            </div>
          
          <div className="w-full shadow-md rounded-lg pl-4">
            <FormInput type="password" name="password" label="Password" value={password} onChange={handleInputChange}/>
          </div>
          
          <button className="w-[50%] rounded-full p-4 bg-primary text-white tracking-wide font-bold" type="submit">
            {
              isLoading ? <RiseLoader size={10} color="white"></RiseLoader> : "Login"
            }
          </button>
        </form>
      </div>
      
      <div className="flex space-x-2 mt-2">
        <span>Don't have an account?</span>
        <Link to="/register" className="font-bold underline hover:text-primary">Register</Link>
      </div>

      {
        isError && <span>{error.data.error.message}</span>
      }
    </div>
  );
};

export default LoginForm;

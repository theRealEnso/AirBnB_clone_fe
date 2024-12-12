import { useState, ChangeEvent, FormEvent} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

//import components
import Navbar from "../navigation-bar/Navbar";
import { FormInput } from "./FormInput";
import { RiseLoader } from "react-spinners";

//import redux selector
import { selectCurrentUser } from "../../redux/user/user-selectors";

//import redux action
import { setUser } from "../../redux/user/user-reducer";

//import loginUser function to back end login user api endpoint
import { useLoginUserMutation } from "../../api/api-slice";

//import utility function
import { getErrorMessage } from "../../utils";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  const [loginUser, {data: userData, isLoading, isSuccess, isError, error}] = useLoginUserMutation();

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

  const clearInputs = () => {
    setFormInputs({
      email: "",
      password: "",
    })
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const {user} = await loginUser({...formInputs}).unwrap(); // using unwrap method will provide us with the raw response from the server

      console.log(user);

      if(isSuccess || user){
        await dispatch(setUser(user));
        clearInputs();
        navigate("/account");
        console.log(userData);
      }

    } catch(error) {
      console.error(`Error logging in the user: ${error}`)
    }

  };

  // if(isError){
  //   console.log(error);
  // }


  return (
    <div>
      <Navbar></Navbar>
      
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
          isError && <span>{getErrorMessage(error)}</span>
          //error message we need is in error.data.error.message
        }
      </div>
    </div>

  );
};

export default LoginForm;

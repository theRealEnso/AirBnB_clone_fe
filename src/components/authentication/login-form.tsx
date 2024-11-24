import { useState} from "react";
import { Link } from "react-router-dom";

const LoginForm = () => {

  const [formInputs, setFormInputs] = useState({
    email: "",
    password: "",
  });

  const {email, password} = formInputs;

  const handleInputChange = (event) => {
    const {name, value} = event.target;

    setFormInputs({
      ...formInputs,
      [name]: value,
    });

    console.log(formInputs);
  };

  const handleSubmit = () => {

  };

  return (
    <div className="flex items-center justify-center min-h-screen flex-col m-auto">

      <div className="flex flex-col items-center justify-center">
        <h1 className="mb-4 text-2xl font-bold tracking-wide">Welcome back!</h1>
        <span className="font-bold text-xl tracking wide">Sign in</span>
      </div>

      <div className="w-[40%]">
        <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-6">
          <input className="py-4 rounded-lg w-full p-6 shadow-md outline-primary" type="text" name="email" placeholder="Email address" value={email} onChange={handleInputChange}/>
          <input className="py-4 rounded-lg w-full p-6 shadow-md outline-primary" type="password" placeholder="Enter a password" value={password} onChange={handleInputChange}/>
          <button className="w-[50%] rounded-full p-4 bg-primary text-white tracking-wide font-bold" type="submit">Login</button>
        </form>
      </div>
      
      <div className="flex space-x-2 mt-2">
        <span>Don't have an account?</span>
        <Link to="/register" className="font-bold underline">Register</Link>
      </div>
    </div>
  );
};

export default LoginForm;

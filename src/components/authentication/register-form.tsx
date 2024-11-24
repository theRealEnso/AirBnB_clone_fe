import { useState} from "react";
import { Link } from "react-router-dom";

const RegisterForm = () => {

  const [formInputs, setFormInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const {firstName, lastName, email, password, confirmPassword} = formInputs;

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

      <div>
        <h1 className="mb-4 text-2xl font-bold tracking-wide">Create an account!</h1>
      </div>

      <div className="w-[40%]">
        <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-6">
          <input className="py-4 rounded-lg w-full p-6 shadow-md outline-primary" type="text" name="firstName" placeholder="John" value={firstName} onChange={handleInputChange} />
          <input className="py-4 rounded-lg w-full p-6 shadow-md outline-primary" type="text" name="lastName" placeholder="Doe" value={lastName} onChange={handleInputChange} />
          <input className="py-4 rounded-lg w-full p-6 shadow-md outline-primary" type="text" name="email" placeholder="Email address" value={email} onChange={handleInputChange}/>
          <input className="py-4 rounded-lg w-full p-6 shadow-md outline-primary" type="password" placeholder="Enter a password" value={password} onChange={handleInputChange}/>
          <input className="py-4 rounded-lg w-full p-6 shadow-md outline-primary" type="text" placeholder="Confirm password" value={confirmPassword} onChange={handleInputChange} />
          <button className="w-[50%] rounded-full p-4 bg-primary text-white tracking-wide font-bold" type="submit">Sign up!</button>
        </form>
      </div>
      
      <div className="flex space-x-2 mt-2">
        <span>Already a member?</span>
        <Link to="/login" className="font-bold underline">Login</Link>
      </div>
    </div>
  );
};

export default RegisterForm;

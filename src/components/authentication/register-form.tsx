import { useState, FormEvent, ChangeEvent} from "react";
import { Link } from "react-router-dom";

//import components
import { FormInput } from "./FormInput";

type RegisterFormInputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type FormErrors = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

const RegisterForm = () => {

  const [formInputs, setFormInputs] = useState<RegisterFormInputs>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const {firstName, lastName, email, password, confirmPassword} = formInputs;

  const [errors, setErrors] = useState<FormErrors>({});

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;

    setFormInputs({
      ...formInputs,
      [name]: value,
    });
  };

  const clearFormInputs = () => {
    setFormInputs({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: ""
    })
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const validationErrors: FormErrors = {};

    if(!firstName.trim()){
      validationErrors.firstName = "First name is required";
    };

    if(firstName.length < 2){
      validationErrors.firstName = "First name must be at least two characters long"
    }

    if(!lastName.trim()){
      validationErrors.lastName = "Last name is required";
    };

    if(lastName.length < 2){
      validationErrors.lastName = "Last name must be at least two characters long";
    }

    if(!email.trim()){
      validationErrors.lastName = "Email address is required";
    } else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
      validationErrors.email = "email is not a valid email address"
    }

    if(!password.trim()){
      validationErrors.password = "Password is required";
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])\S{8,32}$/.test(password)){
      validationErrors.password = "Password must contain at least one uppercase character, special character, number, and be between 8 and 32 characters";
    }

    if(password !== confirmPassword){
      validationErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(validationErrors);

    if(Object.keys(validationErrors).length === 0){
      alert("Form submitted successfully!");
      clearFormInputs();
    }
  };

  console.log(formInputs);

  return (
    <div className="flex items-center justify-center min-h-screen flex-col m-auto">

      <div>
        <h1 className="mb-4 text-2xl font-bold tracking-wide">Create an account!</h1>
      </div>

      <div className="w-[40%]">
        <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-6">

          <div className="flex flex-col rounded-lg w-full h-full pl-4 shadow-md" >
            <FormInput type="text" name="firstName" label="First name" value={firstName} onChange={handleInputChange} />
            {
              errors.firstName && <span className="text-red-500">{errors.firstName}</span>
            }
          </div>

          <div className="flex flex-col rounded-lg w-full h-full pl-4 shadow-md" >
            <FormInput type="text" name="lastName" label="Last name" value={lastName} onChange={handleInputChange} />
            {
              errors.lastName && <span className="text-red-500">{errors.lastName}</span>
            }
          </div>

          <div className="flex flex-col rounded-lg w-full h-full pl-4 shadow-md" >
            <FormInput type="text" name="email" label="Email address" value={email} onChange={handleInputChange}/>
            {
              errors.email && <span className="text-red-500">{errors.email}</span>
            }
          </div>

          <div className="flex flex-col rounded-lg w-full h-full pl-4 shadow-md" >
            <FormInput type="password" name="password" label="Password" value={password} onChange={handleInputChange}/>
            {
              errors.password && <span className="text-red-500">{errors.password}</span>
            }
          </div>

          <div className="flex flex-col rounded-lg w-full h-full pl-4 shadow-md" >
            <FormInput type="password" name="confirmPassword" label="Confirm password" value={confirmPassword} onChange={handleInputChange} />
            {
              errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword}</span>
            }
          </div>
          
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

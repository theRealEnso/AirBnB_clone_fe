import { FC, InputHTMLAttributes } from "react";

type FormInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export const FormInput: FC<FormInputProps> = ({ label, ...otherProperties }) => {
  return (
    <div className="relative">
      <input
        {...otherProperties}
        placeholder=" "
        className={`peer outline-none h-full w-full py-4`}
      />
      <label
        className={`
          ${otherProperties.value && typeof otherProperties.value === "string" && otherProperties.value.length > 0 ? "top-[-10px] left-[-10px] text-black text-sm pointer-events-auto" : ""}
          absolute text-gray-400 font-bold tracking-wide absolute left-[20px] top-[15px] pointer-events-none transition-all
          peer-focus:top-[-10px] peer-focus:left-[-5px] peer-focus:text-black peer-focus:text-sm
        `}
      >
        {label}
      </label>
    </div>
  );
};

// const shrinkLabel = `peer-focus:text-red-500 peer-focus:-top-[5px] peer-focus:-left-[3px] peer-focus:text-sm transition-all`

// notes to self:
// tailwind CSS uses the peer and peer-* class names to target sibling elements. 
// tailwind doesn't seem to support javascript template literals, so we cannot define a string containing our desired class names and then using it in a conditional rendering statement. For example, we cannot do peer-focus:${shrinkLabel}
//tailwind also doesn't seem to be able 


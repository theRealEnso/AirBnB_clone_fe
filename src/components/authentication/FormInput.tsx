import React from 'react'

// const shrinkLabel = `peer-focus:text-red-500 peer-focus:-top-[5px] peer-focus:-left-[3px] peer-focus:text-sm transition-all`

export const FormInput = ({label, ...otherProperties}) => {
  return (
    <div className="relative">
        <input {...otherProperties} className={`peer outline-none h-full w-full py-4`} ></input>

        <label 
            className=
            {
                `text-gray-400 font-bold tracking-wide absolute left-[10px] top-[15px] peer-focus:text-black peer-focus:-top-[10px] peer-focus:-left-[3px] peer-focus:text-sm transition-all
                ${otherProperties.value && otherProperties.value.length && typeof otherProperties.value === "string" 
                    ? "text-black -top-[10px] -left-[3px] text-sm transition-all" 
                    : ""}`
            }>
                {label}
        </label>
    </div>
  );
};

// notes to self:
// tailwind CSS uses the peer and peer-* class names to target sibling elements. 
// tailwind doesn't seem to support javascript template literals, so we cannot define a string containing our desired class names and then using it in a conditional rendering statement. For example, we cannot do peer-focus:${shrinkLabel}
//tailwind also doesn't seem to be able 

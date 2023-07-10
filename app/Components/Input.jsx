import React from "react";

function Input(props) {
  const {
    className,
    ref,
    type,
    name,
    id,
    value,
    onChange,
    placeholder,
    style,
  } = props;
  return (
    <>
      <input
        type={type}
        ref={ref}
        value={value}
        placeholder={placeholder}
        id={id}
        onChange={onChange}
        name={name}
        style={style}
        className={className}
        required
      />
    </>
  );
}

export default Input;

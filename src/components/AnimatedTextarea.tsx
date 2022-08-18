import React, { useRef } from "react";

export const AnimatedTextarea: React.FC<{
  placeholder: string;
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
}> = ({ placeholder, label, onChange, value }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <>
      <style jsx>
        {`
          .form {
            position: relative;
            width: 100%;
            height: 200px;
          }
          .form__input {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 0.5rem;
            font-weight: 500;
            color: white;
            outline: none;
            padding: 1.25rem;
            background: #3f3f3f;
            resize: none;

            /* Change border when input focus*/
          }
          .form__input:hover {
            border-color: #adffff;
          }
          .form__input:focus {
            border-color: #18ffff;
          }
          .form__label {
            position: absolute;
            left: 1rem;
            top: 1.1rem;
            width: 400px;
            padding: 0 0.5rem;
            color: white;
            cursor: text;
            transition: top 200ms ease-in-out, left 200ms ease-in-out,
              font-size 200ms ease-in-out;
            background-color: #3f3f3f;
          }
          /* 1. When the input is in the focus state reduce the size of the label and move upwards 2. Keep label state when content is in input field */
          .form__input:focus ~ .form__label,
          .form__input:not(:placeholder-shown).form__input:not(:focus)
            ~ .form__label {
            top: -0.01rem;
            font-size: 0.8rem;
            font-weight: 700;
            left: 0.7rem;
          }
        `}
      </style>
      <div className="form">
        <textarea
          id="email"
          className="form__input"
          autoComplete="off"
          placeholder={placeholder}
          ref={textareaRef}
          onChange={onChange}
          value={value}
        />
        <label
          htmlFor={label}
          className="form__label"
          style={{
            fontWeight: "600",
          }}
          onClick={() => {
            textareaRef.current?.focus();
          }}
        >
          {label}
        </label>
      </div>
    </>
  );
};

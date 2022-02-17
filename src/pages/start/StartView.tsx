import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

function StartView() {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="App">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (inputRef.current !== null) {
            console.log("on submit", inputRef.current.value);
            navigate("/contribution", {
              state: { user: inputRef.current.value },
            });
          }
        }}
      >
        <input type="text" name="user" id="user" ref={inputRef} />
        <input type="button" value="GENERATE" />
      </form>
    </div>
  );
}

export default StartView;

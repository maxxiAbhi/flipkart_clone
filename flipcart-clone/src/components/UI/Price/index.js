import React from "react";



const Price = (props) => {
  return (
    <div
      style={{
        fontSize: props.fontSize ? props.fontSize : "14px",
        fontWeight: "bold",
        margin: "5px 0",
      }}
    >
     
     &#8377; {props.value}
    </div>
  );
};

export default Price;
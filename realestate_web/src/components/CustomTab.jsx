import React from "react"

const style = {
  padding: "10px 0",
  borderBottom: "3px solid transparent",
  display: "inline-block",
  cursor: "pointer",
  backgroundColor: "#1c90ec",
  width: "33.3%",
  color: "rgba(255, 255, 255, .7)",
  textAlign: "center"
}

const activeStyle = {
  ...style,
  color: "white",
  borderBottom: "3px solid #d71356"
} 

export const CustomTab = ({ children, isActive }) => {
  return <span style={isActive ? activeStyle : style}>{children}</span>
}
 

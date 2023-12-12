import React from "react";
import "./heading.css";
interface HeadingProps {
  Words: string;
}

const Heading: React.FC<HeadingProps> = ({ Words }) => {
  return <div className="Heading">{Words}</div>;
};

export default Heading;

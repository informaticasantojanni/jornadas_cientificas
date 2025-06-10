import React from "react";

const PlayIcon = ({ width, height, fill = "#fff" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 -960 960 960"
      fill={fill}
    >
      <path d="M360-272.31v-415.38L686.15-480 360-272.31ZM400-480Zm0 134 211.54-134L400-614v268Z"/>
    </svg>
  );
};

export default PlayIcon;

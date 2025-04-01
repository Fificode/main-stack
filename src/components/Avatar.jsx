import React from "react";

const Avatar = ({
  firstName,
  lastName,
  width = "w-[32px]",
  height = "h-[32px]",
  text = "text-[14px]",
  leading="leading-[16px]"
}) => {
  const imageSrc = null;
  const initials = `${firstName?.charAt(0) || ""}${
    lastName?.charAt(0) || ""
  }`.toUpperCase();
  return (
    <div
      className={`flex items-center justify-center ${width} ${height} p-2 rounded-full bg-avatar-gradient`}
    >
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={`${initials}`}
          className="h-full w-full rounded-full object-cover"
        />
      ) : (
        <span className={`text-white ${text} ${leading} font-[600] text-center -tracking-[0.3px]`}>
          {initials}
        </span>
      )}
    </div>
  );
};

export default Avatar;

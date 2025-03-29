import React from "react";

const SideNav = ({ buttons, isSelected, setIsSelected }) => {
  return (
    <nav className="flex flex-col sm:flex-row items-center w-52 sm:w-full p-4 bg-blue-900">
      <div className="flex flex-col sm:flex-row w-full justify-center">
        {buttons.map((text, index) => (
          <p
            key={index}
            className={`cursor-pointer text-white text-center px-4 py-2 m-1 rounded-lg transition-all duration-300 ${
              isSelected === index
                ? "bg-yellow-400 text-black font-bold"
                : "hover:bg-yellow-300"
            }`}
            onClick={() => setIsSelected(index)}
          >
            {text}
          </p>
        ))}
      </div>
    </nav>
  );
};

export default SideNav;

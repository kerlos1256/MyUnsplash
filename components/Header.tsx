import React, {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useState,
} from "react";
import icon from "../assets/logo.png";
import search from "../assets/search.svg";
import Image from "next/image";

const Header: FC<{
  setModel: Dispatch<SetStateAction<boolean>>;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}> = ({ search, setSearch, setModel }) => {
  const onChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
    },
    []
  );

  return (
    <div className="flex justify-between items-center pt-2">
      <div className="flex items-center">
        <div className="flex items-center mr-8 py-4">
          <div className="w-4 h-auto mx-1">
            <Image layout="responsive" src={icon} />
          </div>
          <div className="font-bold">My Unsplash</div>
        </div>
        <div className="flex items-center border border-gray-400 border-opacity-50 rounded-xl w-64 p-2 text-gray-400">
          <div className="w-4 h-auto mr-4 ml-2 fill-current">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 50 50"
              width="100%"
              height="100%"
            >
              <path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search by label"
            value={search}
            onChange={onChangeHandler}
            className="outline-none"
          />
        </div>
      </div>
      <div
        onClick={() => setModel(true)}
        className="py-2 px-4 text-white rounded-xl bg-green-500 cursor-pointer focus:bg-green-900 select-none"
      >
        Add a photo
      </div>
    </div>
  );
};

export default Header;

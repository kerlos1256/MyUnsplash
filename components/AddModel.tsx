import axios, { AxiosRequestConfig } from "axios";
import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { Image, ImageInput } from "../types/image.interface";

const AddModel: FC<{
  model: boolean;
  setModel: Dispatch<SetStateAction<boolean>>;
  addPhoto: (photo: Image) => void;
}> = ({ model, setModel, addPhoto }) => {
  const [photo, setPhoto] = useState<ImageInput>({
    password: "",
    name: "",
    src: "",
  });

  const [loading, setLoading] = useState<boolean>(false);

  const onAddPhoto = () => {
    if (loading) return;
    setLoading(true);
    const data = JSON.stringify({
      label: `${photo.name}`,
      url: `${photo.src}`,
      password: `${photo.password}`,
    });

    const config: AxiosRequestConfig<any> = {
      method: "post",
      url: "http://localhost:4000/my-unsplash",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then((res) => {
        const data: Image = res.data;
        console.log(data);
        addPhoto(data);
        setPhoto({ name: "", src: "", password: "" });
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setPhoto({ name: "", src: "", password: "" });
        setLoading(false);
      });
  };

  return (
    <div
      className={`${
        model ? "opacity-100 pointer-events-auto" : ""
      } pointer-events-none opacity-0 transition-opacity duration-300  h-screen w-screen top-0 left-0 fixed flex justify-center items-center`}
    >
      <div className="bg-white w-5/12 h-auto py-6 px-8 rounded-xl top-1/2 left-1/2 flex flex-col z-30">
        <div className="text-4xl font-bold">Add a new photo</div>
        <div>
          <div className="my-4">
            <div className="font-bold">Label</div>
            <div className="border-2 border-black border-opacity-50 rounded-xl px-4 py-3 my-2">
              <input
                className="outline-none w-full"
                placeholder="type a good label for your photo"
                value={photo.name}
                onChange={(e) => setPhoto({ ...photo, name: e.target.value })}
                type="text"
              />
            </div>
          </div>
          <div className="my-4">
            <div className="font-bold">Photo URL</div>
            <div className="border-2 border-black border-opacity-50 rounded-xl px-4 py-3 my-2">
              <input
                className="outline-none w-full"
                placeholder="put a valid photo url"
                value={photo.src}
                onChange={(e) => setPhoto({ ...photo, src: e.target.value })}
                type="text"
              />
            </div>
          </div>
          <div className="my-4">
            <div className="font-bold">Password</div>
            <div className="border-2 border-black border-opacity-50 rounded-xl px-4 py-3 my-2">
              <input
                className="outline-none w-full"
                placeholder="put a valid photo url"
                value={photo.password}
                onChange={(e) =>
                  setPhoto({ ...photo, password: e.target.value })
                }
                type="password"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end items-center">
          <div
            onClick={() => setModel(false)}
            className="cursor-pointer py-2 mx-4"
          >
            Cancel
          </div>
          <div
            onClick={() => onAddPhoto()}
            className="cursor-pointer py-2 px-4 bg-green-500 text-white rounded-xl"
          >
            {loading ? (
              <svg
                className="h-auto w-8 animate-spin cursor-auto"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="32"
                  strokeWidth="8"
                  stroke="#00ff33"
                  strokeDasharray="50.26548245743669 50.26548245743669"
                  fill="none"
                  strokeLinecap="round"
                  transform="matrix(1,0,0,1,0,0)"
                ></circle>
              </svg>
            ) : (
              "Submit"
            )}
          </div>
        </div>
      </div>
      <div
        onClick={() => {
          setModel(false);
        }}
        className="bg-black bg-opacity-50 w-full h-full absolute "
      ></div>
    </div>
  );
};

export default AddModel;

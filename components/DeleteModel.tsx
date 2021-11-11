import axios, { AxiosRequestConfig } from "axios";
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useState,
} from "react";

const DeleteModel: FC<{
  model: boolean;
  setModel: Dispatch<SetStateAction<boolean>>;
  img2Bdeleted: string | undefined;
  deletePhoto: (uuid: string) => void;
}> = ({ deletePhoto, img2Bdeleted, model, setModel }) => {
  const [password, setPassowrd] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const onDelete = useCallback(() => {
    if (loading) return;
    setLoading(true);
    if (!img2Bdeleted) return setModel(false);
    var data = JSON.stringify({
      password: `${password}`,
    });

    var config: AxiosRequestConfig<any> = {
      method: "delete",
      url: `http://localhost:4000/my-unsplash/${img2Bdeleted}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    console.log(console.log(img2Bdeleted));

    axios(config)
      .then((res) => {
        const data: { message: string; uuid: string } = res.data;
        console.log(data);
        deletePhoto(data.uuid);
        setModel(false);
        setLoading(false);
        setPassowrd("");
      })
      .catch(function (error) {
        console.log(error);
        setModel(false);
        setLoading(false);
        setPassowrd("");
      });
  }, [img2Bdeleted, password]);

  const onCancel = useCallback(() => {
    setModel(false);
  }, []);

  return (
    <div
      className={`${
        model ? "opacity-100 pointer-events-auto" : ""
      } pointer-events-none opacity-0 transition-opacity duration-300  h-screen w-screen top-0 left-0 fixed flex justify-center items-center`}
    >
      <div className="bg-white w-5/12 h-auto py-6 px-8 rounded-xl top-1/2 left-1/2 flex flex-col z-30">
        <div className="text-4xl font-bold">Are you sure ?</div>
        <div>
          <div className="my-4">
            <div className="font-bold">password</div>
            <div className="border-2 border-black border-opacity-50 rounded-xl px-4 py-3 my-2">
              <input
                value={password}
                onChange={(e) => setPassowrd(e.target.value)}
                className="outline-none w-full"
                placeholder="***********"
                type="password"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end items-center">
          <div onClick={() => onCancel()} className="cursor-pointer py-2 mx-4">
            Cancel
          </div>
          <div
            onClick={() => onDelete()}
            className="cursor-pointer py-2 px-4 bg-red-500 text-white rounded-xl"
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
                  stroke="#fe718d"
                  strokeDasharray="50.26548245743669 50.26548245743669"
                  fill="none"
                  strokeLinecap="round"
                  transform="matrix(1,0,0,1,0,0)"
                ></circle>
              </svg>
            ) : (
              "Delete"
            )}
          </div>
        </div>
      </div>
      <div
        onClick={() => setModel(false)}
        className="bg-black bg-opacity-50 w-full h-full absolute "
      ></div>
    </div>
  );
};

export default DeleteModel;

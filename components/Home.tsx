import React, {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Image } from "../types/image.interface";
import AddModel from "./AddModel";
import DeleteModel from "./DeleteModel";
import axios from "axios";

let count = 0;

const Home: FC<{
  model: boolean;
  setModel: Dispatch<SetStateAction<boolean>>;
  search: string;
}> = ({ model, setModel, search }) => {
  const divs = [1, 2, 3];

  const [deleteModel, setDeleteModel] = useState<boolean>(false);
  const [img2Bdeleted, setImg2bDeleted] = useState<string>();

  const [imgs, setImgs] = useState<Image[]>([]);

  const [filteredImgs, setFilteredImgs] = useState<Image[]>([]);

  const sort = useCallback(
    (images: Image[], setter: Dispatch<SetStateAction<Image[]>>) => {
      count = 0;
      const newImages: Image[] = [];
      images.map((img, index) => {
        if (count >= 3) count = 0;
        switch (count) {
          case 0:
            newImages.push({ ...img, index: count });
            count++;
            break;
          case 1:
            newImages.push({ ...img, index: count });
            count++;
            break;
          case 2:
            newImages.push({ ...img, index: count });
            count++;
            break;
        }
      });
      setter(newImages);
    },
    []
  );
  const addPhoto = (photo: Image) => {
    sort([{ ...photo }, ...imgs], setImgs);
    setModel(false);
  };

  const deletePhoto = (uuid: string) => {
    const updatedPhotos = imgs.filter((img) => img.uuid !== uuid);
    sort(updatedPhotos, setImgs);
  };

  useEffect(() => {
    setFilteredImgs(imgs);
  }, [imgs]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/my-unsplash/all")
      .then((res: { data: Image[] }) => {
        console.log(res.data);
        sort(res.data.reverse(), setImgs);
      });
  }, []);

  useEffect(() => {
    const filteredImgs = imgs.filter((img) => img.name.includes(search));
    sort(filteredImgs, setFilteredImgs);
  }, [search]);

  return (
    <div className={`grid grid-cols-3 gap-8 w-full my-8`}>
      {divs.map((div, index) => (
        <div key={index} className="flex gap-8 flex-col">
          {filteredImgs.map((img, i) =>
            img.index === index ? (
              <div key={i} className={`w-full h-auto relative group`}>
                <img src={img.src} className={`w-full h-auto rounded-xl`} />
                <div className="group group-hover:pointer-events-auto group-hover:opacity-100 w-full h-full pointer-events-none opacity-0 top-0 left-0 rounded-xl overflow-hidden absolute transition-opacity duration-200">
                  <div className="group-hover:opacity-60  w-full h-full bg-black opacity-0  transition-opacity duration-200"></div>
                  <div
                    onClick={() => {
                      setDeleteModel(true);
                      setImg2bDeleted(img.uuid);
                    }}
                    className="text-red-600 border-2 border-red-600 font-bold rounded-full py-1 px-6 absolute top-4 right-4 cursor-pointer"
                  >
                    delete
                  </div>
                  <div className="absolute bottom-8 left-8 text-white font-bold text-xl">
                    {img.name}
                  </div>
                </div>
              </div>
            ) : null
          )}
        </div>
      ))}
      <AddModel addPhoto={addPhoto} model={model} setModel={setModel} />
      <DeleteModel
        deletePhoto={deletePhoto}
        img2Bdeleted={img2Bdeleted}
        model={deleteModel}
        setModel={setDeleteModel}
      />
    </div>
  );
};

export default Home;

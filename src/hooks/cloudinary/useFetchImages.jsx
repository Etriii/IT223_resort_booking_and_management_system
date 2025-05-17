import { useEffect, useState } from "react";
import { getResortById } from "../../utils/cloudinaryapi";

const CLOUD_NAME = "dpa4l9gxw"; 

const useFetchImages = (imageField) => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const resort_id = localStorage.getItem("user_role")
      ? JSON.parse(localStorage.getItem("user_role"))[0]["resort_id"]
      : null;

    if (!resort_id) return;

    const fetchImage = async () => {
      const data = await getResortById(resort_id);

      if (data?.success && data.resort?.[imageField]) {
        const publicId = data.resort[imageField];
        const constructedUrl = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${publicId}`;
        setImageUrl(constructedUrl);
      }
    };

    fetchImage();
  }, [imageField]);

 return [imageUrl, setImageUrl];
};

export default useFetchImages;

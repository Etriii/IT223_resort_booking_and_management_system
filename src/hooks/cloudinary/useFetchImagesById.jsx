import { useEffect, useState } from "react";
import { getResortById } from "../../utils/cloudinaryapi";

const CLOUD_NAME = "dpa4l9gxw"; 

const useFetchImages = (resortId, imageField) => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (!resortId) return;

    const fetchImage = async () => {
      const data = await getResortById(resortId);

      if (data?.success && data.resort?.[imageField]) {
        const publicId = data.resort[imageField];
        const constructedUrl = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${publicId}`;
        setImageUrl(constructedUrl);
      }
    };

    fetchImage();
  }, [resortId, imageField]);

  return [imageUrl, setImageUrl];
};
export default useFetchImages;

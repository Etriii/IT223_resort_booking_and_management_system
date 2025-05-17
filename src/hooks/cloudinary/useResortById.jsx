// hooks/useResortById.js
import { useEffect, useState } from "react";

const CLOUD_NAME = "dpa4l9gxw";
const imageFields = [
  "main_image",
  "image1",
  "image1_2",
  "image1_3",
  "image2",
  "image3",
  "room_image_1",
  "room_image_2",
  "room_image_3",
];

const useResortById = (resortId) => {
  const [resorts, setResort] = useState(null);
  const [errors, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!resortId) return;

    const fetchResort = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/api.php?controller=Resorts&action=getResortById&id=${resortId}`
        );
        const data = await res.json();

        const updatedResort = { ...data };

        imageFields.forEach((field) => {
          updatedResort[`${field}_url`] = data[field]
            ? `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${data[field]}`
            : null;
        });

        setResort(updatedResort);
      } catch (err) {
        setError("Failed to load resort.");
      } finally {
        setLoading(false);
      }
    };

    fetchResort();
  }, [resortId]);

  return { resorts, loading, errors };
};

export default useResortById;

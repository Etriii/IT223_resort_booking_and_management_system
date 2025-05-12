const BASE_URL = "http://localhost:8000/api.php?controller=Resorts";

export const getResortById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}&action=getResortById&id=${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching resort by ID:", error);
    return null;
  }
};

export const uploadResortImageById = async (id, imageField, publicId) => {
  try {
    const response = await fetch(`${BASE_URL}&action=uploadResortImageById`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        imageField,
        image: publicId,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
};

const deleteResort = async (resortId) => {
    console.log("Deleting resort with ID:", resortId);

    return {
        success: true,
        message: "Resort Successfully Deleted!"
    };
};

export default deleteResort;
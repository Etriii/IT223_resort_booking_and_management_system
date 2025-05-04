const createResort = async (values) => {
    // Here you'd do validation or API call
    console.log("Creating resort:", values);

    // Mock success
    return {
        success: true,
        message: "Resort Successfully Created!"
    };
};

export default createResort;
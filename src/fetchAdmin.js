import axios from "./config/axios";

const fetchAdmin = async (token, setIsAdmin) => {
    try {
        const response = await axios.get("/getAppUser", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const userDataResponse = response.data;
        if (userDataResponse.role === 'ADMIN') setIsAdmin(true);
    } catch (error) {
        console.log(error);
    }
};

export { fetchAdmin }
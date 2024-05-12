import axios from "../config/axios";

const TagService = {
    getAllTags: async () => {
        try {
            const response = await axios.get(`public/getAllTags`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};

export default TagService;
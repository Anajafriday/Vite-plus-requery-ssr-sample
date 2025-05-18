import axios from "axios"
const base_url = `https://forkify-api.herokuapp.com/api/`
export const getMenus = async (query = "pizza") => {
    // console.log("Fetching menus...");
    try {
        const response = await axios({
            url: `${base_url}search`,
            method: "GET",
            params: { q: query }
        })
        // console.log(response.data)
        return response.data
    } catch (error) {
        throw new Error(error?.response?.data?.message)
    }
}
export const getMenu = async (id) => {
    try {
        const response = await axios({
            url: `${base_url}get`,
            method: "GET",
            params: { rId: id }
        })
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}
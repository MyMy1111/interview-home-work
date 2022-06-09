import axios from "axios";


export const getBlogs = async ({page, limit}) => {
  const res = await axios.get(`/blogs?page=${page}&limit=${limit}`);
  return res.data;
}

import axios from "axios";

export const add_new_category = async (formData: any) => {
  try {
    const { data } = await axios.post(`/api/category`, formData)
    return data;
  } catch (error: any) {
    console.log('Error in Add New Category (service) =>', error);
    throw new Error(error || error.message)
  }
}


export const get_parent_categories = async () => {
  try {
    const { data } = await axios.get('/api/category/fetch-category');
    return data.category;
  } catch (error: any) {
    console.log('Error in getting parent Categories (service) =>', error)
    throw new Error(error || error.message)
  }
}

export const get_all_categories = async () => {
  try {
    const { data } = await axios.get('/api/category');
    return data.category;
  } catch (error: any) {
    console.log('Error in getting all Categories (service) =>', error)
    throw new Error(error || error.message)
  }
}


export const delete_categories = async (id: string) => {
  try {
    const { data } = await axios.delete(`/api/category/${id}`);
    return data;
  } catch (error: any) {
    console.log('Error in delete categories (service) =>', error);
    throw new Error(error?.message || 'An error occurred while deleting the category');
  }
};

export const get_category_by_id = async (id: string) => {
  try {
    const { data } = await axios.get(`/api/category/${id}`)
    return data;
  } catch (error:any) {
    console.log('Error in getting Categories by ID (service) =>', error)
    throw new Error(error?.message || 'An error occurred while deleting the category');
  }
}

export const update_category = async (id: string, formData: any) => {
  try {
    const { data } = await axios.put(`/api/category/${id}`, formData)
    return data;
  } catch (error) {
    console.log('Error in updating Categories (service) =>', error)
  }
}





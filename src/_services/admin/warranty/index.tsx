import axios from "axios";


export const get_all_warranty_pagination = async (page:string,search:string) => {
    try {
      const { data } = await axios.get(`/api/warranty?page=${page}&search=${search}&limit=10`);
      return data;
    } catch (error: any) {
      console.log('Error in getting all warranty (service) =>', error)
      throw new Error(error || error.message)
    }
  }

export const add_new_warranty = async (formData: any) => {
  try {
    const { data } = await axios.post(`/api/warranty`, formData)
    return data;
  } catch (error: any) {
    console.log('Error in Add New warranty (service) =>', error);
    throw new Error(error || error.message)
  }
}

export const delete_warranty = async (id: string) => {
  try {
    const { data } = await axios.delete(`/api/warranty/${id}`);
    return data;
  } catch (error: any) {
    console.log('Error in delete warranty (service) =>', error);
    throw new Error(error?.message || 'An error occurred while deleting the warranty');
  }
};

// export const get_warranty_by_id = async (id: string) => {
//   try {
//     const { data } = await axios.get(`/api/warranty/${id}`)
//     return data;
//   } catch (error: any) {
//     console.log('Error in getting warranty by ID (service) =>', error)
//     throw new Error(error?.message || 'An error occurred while deleting the warranty');
//   }
// }

export const update_warranty = async (id: string, formData: any) => {
  try {
    const { data } = await axios.put(`/api/warranty/${id}`, formData)
    return data;
  } catch (error) {
    console.log('Error in updating warranty (service) =>', error)
  }
}








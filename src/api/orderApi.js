import axios from 'axios'

const addOrder = async () => {

  try {
    const response = await axios.post('/order')
    const responseData = response.data;
    return responseData;
  } catch (error) {
    console.error(error);
  }

  return null;

}


const checkOrder = async (num) => {

  try {
    const response = await axios.get('/order'
      , { params:  { orderNum: num }}
    )
    const responseData = response.data;
    return responseData;
  } catch (error) {
    console.error(error);
  }

  return null;

}


export { addOrder, checkOrder };
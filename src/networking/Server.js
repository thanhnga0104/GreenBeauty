const SERVER_NAME = '10.0.2.2';

//Api get all products
async function getProductsFromServer() {
  const apiGetAllProduct = 'http://' + SERVER_NAME + ':8000/product/';
  try {
    let response = await fetch(apiGetAllProduct, {
      method: 'GET',
      //  headers:{
      //     'Accept': 'application/json',
      //     'Content-Type':'application/json'
      // }
    });
    let responseJson = await response.json();
    // console.log("product: ", responseJson)
    return responseJson;
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}

//Api get product by id
async function getProductById(id) {
  const apiGetAllProduct =
    'http://' + SERVER_NAME + ':8000/product/' + id + '/';
  try {
    let response = await fetch(apiGetAllProduct, {
      method: 'GET',
      //  headers:{
      //     'Accept': 'application/json',
      //     'Content-Type':'application/json'
      // }
    });
    let responseJson = await response.json();
    console.log('product by id: ', responseJson);
    return responseJson;
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}

//Api get ảnh về theo id
async function getImageFromServer(id) {
  const apiGetImage = 'http://' + SERVER_NAME + ':8000/img/' + id + '/';
  try {
    let response = await fetch(apiGetImage, {method: 'GET'});
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}

//Hàm này chưa xong
async function getCategoryFromServer(id) {
  const apiGetImage = 'http://' + SERVER_NAME + ':8000/category/';
  try {
    let response = await fetch(apiGetImage, {method: 'GET'});
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}

//Api tìm kiếm sản phẩm theo tên
async function getSearchProduct(query) {
  const apiSearchProduct =
    'http://' +
    SERVER_NAME +
    ':8000/product/?search=' +
    query +
    '&ordering=price';
  if (query != '') {
    try {
      let response = await fetch(apiSearchProduct, {method: 'GET'});
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(`Error is: ${error}`);
    }
  }
}

async function getProvince() {
  const apiProvince = 'https://api.tiki.vn/directory/v1/countries/VN/regions/';
  try {
    let response = await fetch(apiProvince, {method: 'GET'});
    let responseJson = await response.json();
    return responseJson.data;
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}

//fetch api Quận/Huyện
async function getDistrict(city_id) {
  const apiDistrict =
    'https://api.tiki.vn/directory/v1/countries/VN/regions/' +
    city_id +
    '/districts/';
  try {
    let response = await fetch(apiDistrict, {method: 'GET'});
    let responseJson = await response.json();    
    return responseJson.data;
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}

//fetch api Phường/Xã
async function getWard(city_id, district_id) {
  const apiWard =
    'https://api.tiki.vn/directory/v1/countries/VN/regions/' +
    city_id +
    '/districts/' +
    district_id +
    '/wards';
  try {
    let response = await fetch(apiWard, {method: 'GET'});
    let responseJson = await response.json();    
    return responseJson.data;
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}

export {
  getProductsFromServer,
  getImageFromServer,
  getSearchProduct,
  getProductById,
  getProvince,
  getDistrict,
  getWard,
};

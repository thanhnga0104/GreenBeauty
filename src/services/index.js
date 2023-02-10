import AsyncStorage from '@react-native-async-storage/async-storage';
export const SERVER_NAME = '10.0.2.2';

//const SERVER_NAME ='192.168.1.4'
//Api get type of category
async function getTypeOfCategory() {
  const apiGetType = 'http://' + SERVER_NAME + ':8000/type/';
  try {
    let response = await fetch(apiGetType, {
      method: 'GET',
    });
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}

//Api get category
async function getCategory(type_id) {
  const apiGetCategory =
    'http://' + SERVER_NAME + ':8000/category/?producttype=' + type_id;
  try {
    let response = await fetch(apiGetCategory, {
      method: 'GET',
    });
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}

//Api get all products
async function getProductsFromServer() {
  const apiGetAllProduct =
    'http://' + SERVER_NAME + ':8000/product/?IsActive=true';
  try {
    let response = await fetch(apiGetAllProduct, {
      method: 'GET',
    });
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}

async function getProductsByCategory(category) {
  const apiGetAllProduct =
    'http://' +
    SERVER_NAME +
    ':8000/product/?category=' +
    category +
    '&?IsActive=true';
  try {
    let response = await fetch(apiGetAllProduct, {
      method: 'GET',
    });
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}

//Api get product by id
async function getProductById(id) {
  const apiGetProductById =
    'http://' + SERVER_NAME + ':8000/product/' + id + '/?IsActive=true';
  try {
    let response = await fetch(apiGetProductById, {
      method: 'GET',
    });
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}

//Api get product by id
async function getProductByCategory(category) {
  const apiGetProductByCategory =
    'http://' + SERVER_NAME + ':8000/product/?category=' + category;
  try {
    let response = await fetch(apiGetProductByCategory, {
      method: 'GET',
    });
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}

//Api get tất cả ảnh của 1 sản phẩm
async function getListImage(product_id) {
  // const apiGetImage = 'http://' + SERVER_NAME + ':8000/img/' + id + '/';
  const apiGetListImage =
    'http://' + SERVER_NAME + ':8000/img/?product=' + product_id;
  try {
    let response = await fetch(apiGetListImage, {method: 'GET'});
    let responseJson = await response.json();
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
//Fetch sản phẩm trong giỏ hàng về
async function getProductFromCart(user_id, product_id) {
  const apiGetProductFromCart =
    'http://' +
    SERVER_NAME +
    ':8000/cart/?user=' +
    user_id +
    '&product=' +
    product_id;
  try {
    let response = await fetch(apiGetProductFromCart, {method: 'GET'});
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

//Api thêm item vào giỏ hàng
async function postItemToCart(user, product) {
  const apiAddItemToCart = 'http://' + SERVER_NAME + ':8000/cart/';
  try {
    let response = await fetch(apiAddItemToCart, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + user.userToken,
      },

      body: JSON.stringify({
        quantities: 1,
        product: product.id,
        user: user.userID,
      }),
    });

    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}

//Api cập nhật số lượng khi thêm sản phẩm
async function putItemInCart(event, user, product) {
  const apiUpdateQuanlity =
    'http://' + SERVER_NAME + ':8000/cart/' + product.id + '/';
  let quantity = product.quantities;
  if (event == '+') {
    quantity = quantity + 1;
  } else if (event == '-') {
    quantity = quantity - 1;
  }

  try {
    let response = await fetch(apiUpdateQuanlity, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + user.userToken,
      },

      body: JSON.stringify({
        quantities: quantity,
      }),
    });

    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}

//Fetch api tỉnh thành
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

//Fetch api Quận/Huyện
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

//Fetch api Phường/Xã
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

async function getDataUser() {
  try {
    const user_token = await AsyncStorage.getItem('userToken');
    const user_id = await AsyncStorage.getItem('id');
    const user = {
      userID: user_id,
      userToken: user_token,
    };
    return user;
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}

async function getInfoUser(user_id, user_token) {
  const apiInfoUser = 'http://' + SERVER_NAME + ':8000/user/' + user_id + '/';
  try {
    let response = await fetch(apiInfoUser, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + user_token,
        'Content-Type': 'application/json',
      },
    });

    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}
//Api get address delivery
async function getAddress(user, defaultAddress) {
  const apiGetAddress =
    'http://' +
    SERVER_NAME +
    ':8000/delivery/?user=' +
    user.userID +
    '&defaultAddress=' +
    defaultAddress;
  try {
    let response = await fetch(apiGetAddress, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + user.userToken,
        'Content-Type': 'application/json',
      },
    });
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}

async function postAddress(
  user,
  name,
  phone,
  address,
  fullAddress,
  defaultAddress,
) {
  const apiAddAddress = 'http://' + SERVER_NAME + ':8000/delivery/';
  try {
    let response = await fetch(apiAddAddress, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + user.userToken,
      },

      body: JSON.stringify({
        address: address,
        fullAddress: fullAddress,
        defaultAddress: defaultAddress,
        phone: phone,
        receiveName: name,
        receiveGender: '',
        user: user.userID,
        province: 1,
        district: 1,
        ward: 1,
      }),
    });

    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}

async function putAddress(user, address_id) {
  const apiPutAddress =
    'http://' + SERVER_NAME + ':8000/delivery/' + address_id + '/';
  try {
    let response = await fetch(apiPutAddress, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + user.userToken,
      },

      body: JSON.stringify({
        defaultAddress: 0,
      }),
    });

    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}

async function postOrder(user, totalValue, delivery_id) {
  const apiPostOrder = 'http://' + SERVER_NAME + ':8000/order/';
  try {
    let response = await fetch(apiPostOrder, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + user.userToken,
      },

      body: JSON.stringify({
        totalValue: totalValue,
        user: user.userID,
        status: '1',
        delivery: delivery_id,
      }),
    });

    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}

async function postOrderDetail(order_id, product_id, quantity) {
  const apiPostOrderDetail = 'http://' + SERVER_NAME + ':8000/detailorder/';
  try {
    let response = await fetch(apiPostOrderDetail, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        //Authorization: 'Bearer ' + user.userToken,
      },

      body: JSON.stringify({
        quantities: quantity,
        order: order_id,
        product: product_id,
      }),
    });

    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}
async function getDetailById(id) {
  const apiGetDetailById = 'http://10.0.2.2:8000/detailorder/?order=' + id;
  try {
    let response = await fetch(apiGetDetailById, {
      method: 'GET',
    });
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}
async function getDeliveryInformation(id) {
  const apigetDeliveryInformation = 'http://10.0.2.2:8000/delivery/' + id + '/';
  try {
    let response = await fetch(apigetDeliveryInformation, {
      method: 'GET',
    });
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}
async function getRatingbyUserid(id) {
  const apigetRatingbyUserid = 'http://10.0.2.2:8000/rating/' + id + '/';
  try {
    let response = await fetch(apigetRatingbyUserid, {
      method: 'GET',
    });
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}
export {
  getRatingbyUserid,
  getDeliveryInformation,
  getDetailById,
  getProductByCategory,
  getTypeOfCategory,
  getCategory,
  getProductsFromServer,
  getProductsByCategory,
  getListImage,
  getImageFromServer,
  getSearchProduct,
  getProductById,
  getProvince,
  getDistrict,
  getWard,
  getProductFromCart,
  getDataUser,
  getInfoUser,
  getAddress,
};

export {
  postItemToCart,
  putItemInCart,
  postAddress,
  postOrder,
  putAddress,
  postOrderDetail,
};

//Xóa item khỏi giỏ hàng
async function deleteProductFromCart(cart_id) {
  const apiDeleteProductFromCart =
    'http://' + SERVER_NAME + ':8000/cart/' + cart_id + '/';
  try {
    let response = await fetch(apiDeleteProductFromCart, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}

export {deleteProductFromCart};

///LoveList
async function postToLoveList(user, product_id) {
  const apiAddToLoveList = 'http://' + SERVER_NAME + ':8000/lovelist/';
  try {
    let response = await fetch(apiAddToLoveList, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + user.userToken,
      },

      body: JSON.stringify({
        product_id: product_id,
        customer_id: user.userID,
      }),
    });

    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}

async function getProductFromLoveList(user_id) {
  const apiGetProductFromLoveList =
    'http://' + SERVER_NAME + ':8000/lovelist/?customer_id=' + user_id;

  try {
    let response = await fetch(apiGetProductFromLoveList, {method: 'GET'});
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}

async function deleteProducLoveList(id) {
  const apiDeleteProductLoveList =
    'http://' + SERVER_NAME + ':8000/lovelist/' + id + '/';
  try {
    let response = await fetch(apiDeleteProductLoveList, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}

export {postToLoveList, getProductFromLoveList, deleteProducLoveList};

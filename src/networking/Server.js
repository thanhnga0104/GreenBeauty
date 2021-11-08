

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
    console.log("product: ", responseJson)
    return responseJson;
  } catch (error) {
    console.error(`Error is: ${error}`);
  }

  //hàm khác
  // fetch(apiGetAllProduct, {
  //     method:"GET"
  // })
  // .then(resp => resp.json())
  // .then(data => {
  //     console.log(data)
  //     return data;
  // })
  // .catch(error)
  // {
  //          console.error(`Error is: ${error}`);
  //      }
}

//Api get ảnh về theo id
async function getImageFromServer(id) {
  const apiGetImage = 'http://' + SERVER_NAME + ':8000/img/' + id + '/';
  try {
    let response = await fetch(apiGetImage, {method: 'GET'});

    let responseJson = await response.json();
    // console.log("ảnh: ", responseJson);
    return responseJson;
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}

// async function getProductFromServer(id){
//     try{
//         let response = await fetch(apiGetProduct,
//              {method:'GET',
//             //  headers:{
//             //     'Accept': 'application/json',
//             //     'Content-Type':'application/json'
//             // }
//             }
//             );
//             // console.log('xin chào đã chạy tới đây');
//         let responseJson = await response.json();
//         console.log('rồi chạy tới đây nữa');
//         return responseJson ;
//     } catch(error)
//     {
//         console.error(`Error is: ${error}`);
//     }
// }

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

  const apiSearchProduct = 'http://' + SERVER_NAME + ':8000/product/?search=' + query +'&ordering=price' ;
  if(query != ''){
    try {

      let response = await fetch(apiSearchProduct, {method: 'GET'});
      let responseJson = await response.json();
      // console.log("Search: ", responseJson)
      return responseJson;
  
    } catch (error) {
      console.error(`Error is: ${error}`);
    }
  }  
}




export {getProductsFromServer, getImageFromServer, getSearchProduct};

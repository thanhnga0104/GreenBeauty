import React from 'react';
import {Component} from 'react';

const SERVER_NAME = '10.0.2.2';
const apiGetAllProduct = 'http://' + SERVER_NAME + ':8000/product/';
const apiGetProduct = 'http://10.0.2.2:8000/product/' + '${id}/';
// const apiGetAllProduct='http://127.0.0.1:8000/product/';

async function getProductsFromServer() {
  try {
    let response = await fetch(apiGetAllProduct, {
      method: 'GET',
      //  headers:{
      //     'Accept': 'application/json',
      //     'Content-Type':'application/json'
      // }
    });
    let responseJson = await response.json();
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
export {getProductsFromServer, getImageFromServer};

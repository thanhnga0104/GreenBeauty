import {SERVER_NAME} from '..';

async function getRecommend(id) {
  const request = 'http://' + SERVER_NAME + ':8000/recommend/' + id;
  try {
    let response = await fetch(request, {
      method: 'GET',
    });
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.log(`Line 12 in recommendService: ${error}`);
  }
}

async function getRecommendingre(id) {
  const request = 'http://' + SERVER_NAME + ':8000/recommendingre/' + id;
  try {
    let response = await fetch(request, {
      method: 'GET',
    });
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.log(`Line 25 in recommendService: ${error}`);
  }
}

export {getRecommend, getRecommendingre};

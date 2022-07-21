//this is where we will put our api requests
//our /api/server.js is an api that is connected to cloudinary -- it can make requests 
//now we can complete the circle by having our UI connect with our server
// react-client -> api -> cloudinary -> react-client
//the .env holds the API url 
import {Shoes, Car} from './Regex'
export const API_URL = process.env.REACT_APP_API_URL //export makes this usable by components

export const getImages = async (nextCursor) => {

	const params = new URLSearchParams();
  if (nextCursor) {
		params.append('next_cursor', nextCursor);
	}
  const response = await fetch(`${API_URL}/photos`)
  const responseJson = await response.json(); //takes the response and turns it to json

  return responseJson;
}

export const searchImages = async (searchValue, nextCursor) => {
  console.log(API_URL)
  const params = new URLSearchParams()
  console.log(typeof(searchValue))
  var expr = searchValue
  console.log(Shoes.test(expr))
  console.log(expr)
  switch(true){
    case (Shoes.test(expr) === true):
      expr = 'shoes'
      console.log(`expr passed the test, it should now be: shoes, but is ${expr}`)
      break
    case (Car.test(expr) === true):
      expr = 'car'
      break
    default:
      expr = searchValue
  }
  console.log(`Post Regex, expr should be shoes, but is: ${expr}`)
  params.append(`expression`, expr)
  params.append(`with_field`, "tags")
  params.append('prefix', "home/YEEZY_SHOES")
  params.append('max_results', 10)

  if (nextCursor) {
		params.append('next_cursor', nextCursor);
	}
  const response = await fetch(`${API_URL}/search?${params}`)
 // const response = await fetch(`${API_URL}/search?${params}`)
  console.log(response)
  const responseJson = await response.json()
  console.log(`Response in JSON form is ${responseJson.next_cursor}`) /*so this next cursor thing is working*/
  return responseJson
}
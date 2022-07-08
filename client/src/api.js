//this is where we will put our api requests
//our /api/server.js is an api that is connected to cloudinary -- it can make requests 
//now we can complete the circle by having our UI connect with our server
// react-client -> api -> cloudinary -> react-client
//the .env holds the API url 
export const API_URL = process.env.REACT_APP_API_URL //export makes this usable by components
export const getImages = async () => {
  const response = await fetch(`${API_URL}/photos`)
  const responseJson = await response.json(); //takes the response and turns it to json

  return responseJson;
}

export const searchImages = async (searchValue) => {
  console.log(API_URL)
  const params = new URLSearchParams()
  params.append(`expression`, searchValue)
  params.append(`with_field`, "tags")
  const response = await fetch(`${API_URL}/search?${params}`)
 // const response = await fetch(`${API_URL}/search?${params}`)
  console.log(response)
  const responseJson = await response.json()
  return responseJson
}
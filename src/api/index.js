import axios from "axios";

const url = "https://run.mocky.io/v3/05e9651d-528e-4d7c-a60b-bae8f09684c6";
let apiResponse;
let productJsonMap = {};

let flag;

export const fetchAPIData = async () => {
  let tempSession = sessionStorage.getItem("nodeAPIResponse");
  apiResponse = JSON.parse(tempSession);
  flag = "session---------------------------";
  if (!apiResponse) {
    try {
      const {
        data: { products },
      } = await axios.get(url);

      apiResponse = products.map((curData) => ({
        imageURL: curData.landingPageUrl,
        id: curData.productId,
        image: curData.searchImage,
        name: curData.brand,
        description: curData.product,
        price: curData.price,
        ratings: curData.rating,
        gender: curData.gender,
        color: curData.primaryColour,
        sizes: curData.sizes,
        stock: curData.inventoryInfo,
      }));

      sessionStorage.setItem("nodeAPIResponse", JSON.stringify(apiResponse));
      flag = "via api----------------------";
    } catch (error) {
      console.log("error");
    }
  }

  const fetchedapiResponse = apiResponse;

  console.log(flag);
  return fetchedapiResponse;
};

export const productIdDetails = async () => {
  const productDetailsArray = await fetchAPIData();
  productDetailsArray.map((currData) => {
    return (productJsonMap[currData.id] = currData);
  });
  return productJsonMap;
};

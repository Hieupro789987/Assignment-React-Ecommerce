
const getLocationVn = async () => {
  const response = await fetch('https://provinces.open-api.vn/api/?depth=3');
  const dataJson = await response.json();
  return dataJson;
}

export default getLocationVn;

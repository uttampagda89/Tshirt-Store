import { API } from "../../backend";

export const createOrder = (userId, token, orderData) => {
  const formData = new FormData();

  for (const name in orderData) {
    formData.append(name, orderData[name]);            // here name=Key and orderData=value
  }

  return fetch(`${API}order/add/${userId}/${token}/`, {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

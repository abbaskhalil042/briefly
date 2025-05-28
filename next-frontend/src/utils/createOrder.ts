// utils/createOrder.ts
export const createOrder = async (plan: string, token: string) => {
  const res = await fetch("http://localhost:5000/api/v1/payment/create-order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ plan }),
  });

  // const data = await res.json();
  // console.log("data from create order", data);

  return await res.json();
};

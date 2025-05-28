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

  return await res.json();
};

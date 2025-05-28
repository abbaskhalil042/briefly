// utils/createOrder.ts
export const createOrder = async (plan: string, token: string) => {
  const res = await fetch(
    "https://briefly-s1r0.onrender.com/api/v1/payment/create-order",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ plan }),
    }
  );

  return await res.json();
};

import { PaymentProps } from "../components/Payment/Payment";

export const savePayments = async (payments: PaymentProps[]) => {
  try {
    const response = await fetch(
      `http://localhost:${import.meta.env.VITE_BACKEND_PORT}/payment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentsList: payments,
        }),
      }
    );
    return response;
  } catch (error) {
    throw new Error("Error saving payments to the API");
  }
};

export const clearPayments = async () => {
  try {
    const response = await fetch(
      `http://localhost:${import.meta.env.VITE_BACKEND_PORT}/payment`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    throw new Error("Error clearing payments from the API");
  }
};

export const fetchPayments = async () => {
  try {
    const response = await fetch(
      `http://localhost:${import.meta.env.VITE_BACKEND_PORT}/payment`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const payments = await response.json();
    return payments;
  } catch (error) {
    throw new Error("Error fetching payments from the API");
  }
};

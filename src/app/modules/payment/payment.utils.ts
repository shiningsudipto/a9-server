import axios from "axios";
import dotenv from "dotenv";
import { TPaymentInfo } from "./paymentinterface";
import config from "../../../config";
dotenv.config();

export const initiatePayment = async (paymentData: TPaymentInfo) => {
  const res = await axios.post(config.payment.payment_url!, {
    store_id: config.payment.store_id,
    tran_id: paymentData.transactionId,
    success_url: `${config.live_url}/api/payment/confirmation?transactionId=${paymentData.transactionId}&status=success&paidStatus=${paymentData.paidStatus}`,
    fail_url: `${config.live_url}/api/payment/confirmation?status=failed`,
    cancel_url: config.client_url,
    amount: paymentData.amount,
    currency: "BDT",
    signature_key: config.payment.signature_key,
    desc: "Merchant Registration Payment",
    cus_name: paymentData.customerName,
    cus_email: paymentData.customerEmail,
    cus_add1: paymentData.customerAddress,
    cus_add2: "N/A",
    cus_city: "N/A",
    cus_state: "N/A",
    cus_postcode: "N/A",
    cus_country: "Bangladesh",
    cus_phone: paymentData.customerPhone,
    type: "json",
  });

  return res.data;
};

export const verifyPayment = async (transactionId: string) => {
  const response = await axios.get(config.payment.payment_verify_url!, {
    params: {
      store_id: config.payment.store_id,
      signature_key: config.payment.signature_key,
      type: "json",
      request_id: transactionId,
    },
  });
  return response.data;
};

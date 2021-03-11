import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

import CheckoutForm from "src/components/CheckoutForm";

export default function CheckOut() {
  const navigate = useNavigate();

  const getDonutPrice = () => {
    return 123456;
  };

  return (
    <h2>
      <a href="https://dashboard.stripe.com/test/payments">link to stripe</a>
      <a href="https://console.firebase.google.com/u/0/project/fir-tryout-f4e7a/functions">
        link to firebase console
      </a>

      <input
        type="text"
        value={amount}
        onInput={setAmount}
        placeholder="amount"
      />
      <input
        type="text"
        value={currency}
        onInput={setCurrency}
        placeholder="currency"
      />

      <CheckoutForm
        price={getDonutPrice(123456)}
        onSuccessfulCheckout={() => navigate("/success")}
      />
    </h2>
  );
}

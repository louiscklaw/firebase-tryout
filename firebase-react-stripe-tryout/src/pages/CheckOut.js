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
  const [amount, setAmount] = React.useState(1234);
  const [currency, setCurrency] = React.useState("jpy");

  const getDonutPrice = () => {
    return 123456;
  };

  return (
    <>
      <h2>checkout</h2>
      <div>
        <a href="https://dashboard.stripe.com/test/payments">link to stripe</a>
      </div>
      <div>
        <a href="https://console.firebase.google.com/u/0/project/fir-tryout-f4e7a/functions">
          link to firebase console
        </a>
      </div>
      <div>
        amount
        <input
          type="text"
          value={amount}
          onInput={(e) => setAmount(e.target.value)}
        />
      </div>
      <div>
        currency
        <input
          type="text"
          value={currency}
          onInput={(e) => setCurrency(e.target.value)}
        />
      </div>
      <CheckoutForm
        price={amount}
        currency={currency}
        onSuccessfulCheckout={() => navigate("/success")}
      />
    </>
  );
}

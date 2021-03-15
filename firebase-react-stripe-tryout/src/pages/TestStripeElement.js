import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import ReactDOM from "react-dom";
import { loadStripe } from "@stripe/stripe-js";

import axios from "axios";

import {
  CardElement,
  Elements,
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from "@stripe/react-stripe-js";

import { logEvent, Result, ErrorResult } from "../util";

const ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: "18px",
      color: "#424770",
      letterSpacing: "0.025em",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#9e2146",
    },
  },
};

const CheckoutForm = () => {
  const navigate = useNavigate();
  const elements = useElements();
  const stripe = useStripe();
  const [name, setName] = useState("");
  const [postal, setPostal] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);

  const [isProcessing, setProcessingTo] = useState(false);
  const [checkoutError, setCheckoutError] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const cardElement = elements.getElement(CardNumberElement);

    try {
      const { data: clientSecret } = await axios.post(
        "https://us-central1-fir-tryout-f4e7a.cloudfunctions.net/stripe_helloworld",
        {
          amount: "12345678",
          currency: "jpy",
        }
      );

      const paymentMethodReq = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: {
          name: "test billing",
        },
      });

      if (paymentMethodReq.error) {
        setCheckoutError(paymentMethodReq.error.message);
        setProcessingTo(false);
        return;
      }

      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethodReq.paymentMethod.id,
      });

      if (error) {
        setCheckoutError(error.message);
        setProcessingTo(false);
        return;
      }

      // onSuccessfulCheckout();
      navigate("/success");
      // alert("payment success");
    } catch (error) {}
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="cardNumber">Card Number</label>
        <CardNumberElement
          id="cardNumber"
          onBlur={logEvent("blur")}
          onChange={logEvent("change")}
          onFocus={logEvent("focus")}
          onReady={logEvent("ready")}
          options={ELEMENT_OPTIONS}
        />
        <label htmlFor="expiry">Card Expiration</label>
        <CardExpiryElement
          id="expiry"
          onBlur={logEvent("blur")}
          onChange={logEvent("change")}
          onFocus={logEvent("focus")}
          onReady={logEvent("ready")}
          options={ELEMENT_OPTIONS}
        />
        <label htmlFor="cvc">CVC</label>
        <CardCvcElement
          id="cvc"
          onBlur={logEvent("blur")}
          onChange={logEvent("change")}
          onFocus={logEvent("focus")}
          onReady={logEvent("ready")}
          options={ELEMENT_OPTIONS}
        />
        <button type="submit" disabled={!stripe}>
          Pay
        </button>
      </form>
      <button onClick={(e) => navigate("/success")}>test success</button>
    </>
  );
};

const stripePromise = loadStripe(
  "pk_test_51IR3dcFBIXj9AS8VMhc4PTNeUk3NOjYdaOtP7oTJ4V1KiWfJmJM4Xhd5PJ35AN9lZZw0eQeZbAF9j1NZDrzTyYL100iLiPJ8de"
);

const App = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default App;

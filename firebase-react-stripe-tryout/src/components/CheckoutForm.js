import React from "react";
import { useState } from "react";

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

import "./style.css";

const CardElementContainer = ({ children }) => {
  return <div id="CardElementContainer">{children}</div>;
};

const BillingDetailsFields = () => {
  return <></>;
};

const Row = ({ children }) => {
  return <>{children}</>;
};

const CheckoutForm = ({ price, currency, onSuccessfulCheckout }) => {
  const [isProcessing, setProcessingTo] = useState(false);
  const [checkoutError, setCheckoutError] = useState();

  const stripe = useStripe();
  const elements = useElements();

  const handleFormSubmit = async (ev) => {
    ev.preventDefault();

    const billingDetails = {
      name: `ev.target.name.value`,
      email: `123@123.com`,
      address: {
        city: `ev.target.city.value`,
        line1: `ev.target.address.value`,
        state: `ev.target.state.value`,
        postal_code: `00000`,
      },
    };

    const cardElement = elements.getElement("card");

    try {
      // const { data: clientSecret } = await axios.post("/api/payment_intents", {
      //   amount: price * 100
      // });

      const { data: clientSecret } = await axios.post(
        "https://us-central1-fir-tryout-f4e7a.cloudfunctions.net/stripe_helloworld",
        {
          amount: price,
          currency: currency,
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

      onSuccessfulCheckout();
    } catch (err) {
      setCheckoutError(err.message);
    }
  };

  const iframeStyles = {
    base: {
      color: "#fff",
      fontSize: "16px",
      iconColor: "#fff",
      "::placeholder": {
        color: "#87bbfd",
      },
    },
    invalid: {
      iconColor: "#FFC7EE",
      color: "#FFC7EE",
    },
    complete: {
      iconColor: "#cbf4c9",
    },
  };
  const cardElementOpts = {
    iconStyle: "solid",
    style: iframeStyles,
    hidePostalCode: true,
  };

  const handleCardDetailsChange = (ev) => {
    ev.error ? setCheckoutError(ev.error.message) : setCheckoutError();
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <Row>
        <BillingDetailsFields />
      </Row>
      <Row>
        <CardElementContainer>
          <CardElement
            options={cardElementOpts}
            onChange={handleCardDetailsChange}
          />
        </CardElementContainer>
      </Row>
      {checkoutError}
      <Row>
        {/* TIP always disable your submit button while processing payments */}
        {/* <button disabled={isProcessing || !stripe}>
          {isProcessing ? 'Processing...' : `Pay $${price}`}
        </button> */}
        <button>{isProcessing ? "Processing..." : `Pay $${price}`}</button>
      </Row>
    </form>
  );
};

export default CheckoutForm;

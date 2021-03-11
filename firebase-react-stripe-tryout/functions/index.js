"use strict";

const path = require("path");

const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// const { Logging } = require('@google-cloud/logging');
// const logging = new Logging({
//   projectId: process.env.GCLOUD_PROJECT,
// });

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const { Stripe } = require("stripe");
const stripe = new Stripe(functions.config().stripe.secret, {
  apiVersion: "2020-08-27",
});

function reportError(err, context = {}) {
  // This is the name of the StackDriver log stream that will receive the log
  // entry. This name can be any valid log stream name, but must contain "err"
  // in order for the error to be picked up by StackDriver Error Reporting.
  const logName = "errors";
  const log = logging.log(logName);

  // https://cloud.google.com/logging/docs/api/ref_v2beta1/rest/v2beta1/MonitoredResource
  const metadata = {
    resource: {
      type: "cloud_function",
      labels: { function_name: process.env.FUNCTION_NAME },
    },
  };
}

// https://www.npmjs.com/package/cors#enable-cors-for-a-single-route
const stripe_helloworld = express();
stripe_helloworld.use(cors());
stripe_helloworld.use(cookieParser());
stripe_helloworld.post("/", async (req, res) => {
  try {
    const { amount, currency } = req.body;

    stripe.paymentIntents
      .create({
        amount,
        // https://www.currency-iso.org/en/home/tables/table-a1.html
        currency,
      })
      .then(async (paymentIntent) => {
        let new_payment_id = admin
          .firestore()
          .collection("stripe_payments")
          .doc();
        await admin
          .firestore()
          .collection("stripe_payments")
          .doc(`${"restaurant_id"}/payments/${new_payment_id.id}`)
          .set(
            {
              payment_id: paymentIntent.id,
              amount,
              currency,
              created: admin.firestore.FieldValue.serverTimestamp(),
            },
            { merge: true }
          );

        return paymentIntent;
      })
      .then((paymentIntent) => {
        res.status(200).send(paymentIntent.client_secret);
      })
      .catch(async (err) => {
        res.status(500).json({ statusCode: 500, message: err.message });
        await reportError(err, { message: err.message });
      });
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
    await reportError(err, { message: err.message });
  }
});
exports.stripe_helloworld = functions.https.onRequest(stripe_helloworld);

const test_app = express();
test_app.use(cookieParser());
test_app.get("/", (req, res) => {
  res.send("testtesttest");
});
exports.test = functions.https.onRequest(test_app);

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

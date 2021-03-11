"use strict";

const path = require("path");
const functions = require("firebase-functions");

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const { Stripe } = require("stripe");
const stripe = new Stripe(functions.config().stripe.secret, {
  apiVersion: "2020-08-27",
});

// https://www.npmjs.com/package/cors#enable-cors-for-a-single-route

const stripe_helloworld = express();
stripe_helloworld.use(cors());
stripe_helloworld.use(cookieParser());
stripe_helloworld.post("/", async (req, res) => {
  try {
    const { amount, currency } = req.body;
    // https://stripe.com/docs/api/payment_intents/object
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      // https://www.currency-iso.org/en/home/tables/table-a1.html
      currency,
    });

    res.status(200).send(paymentIntent.client_secret);
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
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

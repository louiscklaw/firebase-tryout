#!/usr/bin/env node

const fs = require('fs')

function between(min, max) {
  return Math.floor(
    Math.random() * (max - min) + min
  )
}



const fi = fs.readFileSync('./input.json',{encoding:'utf-8'})

json_fi = JSON.parse(fi)

const ORDER_PENDING="等の待 / Pending"
const ORDER_DELIVERED="送の達 / Delivered"
const ORDER_REFUNDED="回の水 / Refunded"

Object.keys(json_fi).map(
  k => json_fi[k].status=[ORDER_PENDING,ORDER_DELIVERED,ORDER_REFUNDED][between(0,2)]
  )

var a_out = []
var d_out = {}
json_fi.map(d => {
  d_out[d.id] = {...d, "__collections__": {}}
})

fs.writeFileSync('./out.json',JSON.stringify(
  {
    "__collections__": {
      "users": d_out
    }
  }
),{encoding:'utf-8'})
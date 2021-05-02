'use strict'

const moment = require('moment')
const { validationResult } = require('express-validator')
const HttpStatus = require('http-status-codes')
const jwt = require('jsonwebtoken')
const crypto = require('crypto');

const documentClient = require('../../config/documentClient')

module.exports = {
  login: login,
  signup: signup
}


async function login(req, res) {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    console.log('login errors', errors)
    return res.status(HttpStatus.StatusCodes.UNPROCESSABLE_ENTITY).json({ errors: errors.mapped(), message: HttpStatus.ReasonPhrases.UNPROCESSABLE_ENTITY })
  }

  let inputData = req.body

  try {
    let params = {
      TableName: process.env.DYNAMODB_PREFIX + 'users',
      Key: {
        username: inputData.username
      }
    }
    const result = await documentClient.get(params).promise()
    // console.log('result', result)
    if (!result.Item) {
      return res.status(HttpStatus.StatusCodes.UNPROCESSABLE_ENTITY).json({ message: HttpStatus.ReasonPhrases.UNPROCESSABLE_ENTITY })
    }

    let hash = crypto.pbkdf2Sync(inputData.password, result.Item.salt, 1000, 64, 'sha512').toString('hex');
    if (hash !== result.Item.hash) {
      return res.status(HttpStatus.StatusCodes.UNPROCESSABLE_ENTITY).json({ message: HttpStatus.ReasonPhrases.UNPROCESSABLE_ENTITY })
    }

    let signData = {
      username: result.Item.username
    }
    let token = await jwt.sign(signData, process.env.APP_SECREAT_KEY, { algorithm: 'HS256', expiresIn: '12h' })

    return res.status(HttpStatus.StatusCodes.OK).json({ token: token })

  } catch (err) {
    console.log('login err', err)
    return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: HttpStatus.ReasonPhrases.INTERNAL_SERVER_ERROR })
  }

}

async function signup(req, res) {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    console.log('signup errors', errors)
    return res.status(HttpStatus.StatusCodes.UNPROCESSABLE_ENTITY).json({ errors: errors.mapped(), message: HttpStatus.ReasonPhrases.UNPROCESSABLE_ENTITY })
  }

  let inputData = req.body

  try {
    let getparams = {
      TableName: process.env.DYNAMODB_PREFIX + 'users',
      Key: {
        username: inputData.username
      }
    }
    const getresult = await documentClient.get(getparams).promise()
    // console.log('getresult', getresult)
    if (getresult.Item) {
      return res.status(HttpStatus.StatusCodes.UNPROCESSABLE_ENTITY).json({ message: 'Username already exists' })
    }


    let timestamp = moment().toISOString()
    inputData.createdAt = timestamp

    inputData.salt = crypto.randomBytes(16).toString('hex');
    inputData.hash = crypto.pbkdf2Sync(inputData.password, inputData.salt, 1000, 64, 'sha512').toString('hex');

    delete inputData.password;

    let params = {
      TableName: process.env.DYNAMODB_PREFIX + 'users',
      Item: inputData
    }

    const result = await documentClient.put(params).promise()
    // console.log('result', result)

    return res.status(HttpStatus.StatusCodes.CREATED).json({ message: HttpStatus.ReasonPhrases.CREATED })
  } catch (err) {
    console.log('signup err', err)
    return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: HttpStatus.ReasonPhrases.INTERNAL_SERVER_ERROR })
  }

}
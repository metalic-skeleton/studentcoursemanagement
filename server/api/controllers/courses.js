'use strict'

const moment = require('moment')
const { validationResult } = require('express-validator')
const HttpStatus = require('http-status-codes')

const documentClient = require('../../config/documentClient')

module.exports = {
  getAllCourses: getAllCourses
}

async function getAllCourses(req, res) {
  try {
    let params = {
      TableName: process.env.DYNAMODB_PREFIX + 'courses'
    }
    const result = await documentClient.scan(params).promise()
    // console.log('result', result)

    return res.status(HttpStatus.StatusCodes.OK).json(result.Items)
  } catch (err) {
    console.log('getAllCourses err', err)
    return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: HttpStatus.ReasonPhrases.INTERNAL_SERVER_ERROR })
  }
}
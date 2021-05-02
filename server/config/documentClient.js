const AWS = require('aws-sdk')

AWS.config.region = process.env.AWS_REGION
AWS.config.AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID
AWS.config.AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY

const documentClient = new AWS.DynamoDB.DocumentClient()

module.exports = documentClient
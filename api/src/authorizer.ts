import { APIGatewayRequestAuthorizerHandler } from 'aws-lambda';
import { PolicyGenerator } from './policy-generator';
import axios from "axios";
import _ from "lodash";
import 'source-map-support/register';

const policyGenerator = new PolicyGenerator();

export const handler: APIGatewayRequestAuthorizerHandler = async (event, _context, callback) => {
  var secretKey = process.env.RECAPTCHA_SECRET;

  if (_.isNil(event.headers)) {
    console.error('Received request without headers - Unauthorized access')
    callback('Unauthorized')
    return;
  }

  const token = event.headers['x-recaptcha-token'];
  console.log('reCaptcha Token:' + token)
  var verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;

  const { data } = await axios.get(verificationUrl)
  
  if (!data.success) {
    console.error('Google reCaptcha returns failed - Unauthorized access', data)
    callback('Unauthorized')
    return;
  } 

  return policyGenerator.determinePolicyResponse(event);
}

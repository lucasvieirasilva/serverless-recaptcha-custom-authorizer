import type { APIGatewayRequestAuthorizerEvent, APIGatewayAuthorizerResult } from 'aws-lambda'
import _ from 'lodash'
import { v4 } from 'uuid'

export type IAMEffect = 'Allow' | 'Deny'

export class PolicyGenerator {
  
  public async determinePolicyResponse (event: APIGatewayRequestAuthorizerEvent): Promise<APIGatewayAuthorizerResult> {
    const arn = this.generateApiWideMethodArn(event)
    const subject = v4()
    const customAuthorizerResult = this.generatePolicy(subject, 'Allow', arn)
    return customAuthorizerResult;
  }

  public generateApiWideMethodArn (event: Pick<APIGatewayRequestAuthorizerEvent, 'methodArn'>): string {
    const resourceIndex = event.methodArn.indexOf('/')
    if (resourceIndex === -1) {
      return event.methodArn + '/*'
    } else {
      return event.methodArn.slice(0, resourceIndex) + '/*'
    }
  }

  public generatePolicy (principal: string, effect: IAMEffect, arn: string): APIGatewayAuthorizerResult {
    return {
      principalId: principal,
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Effect: effect,
            Action: 'execute-api:Invoke',
            // "arn:aws:execute-api:{regionId}:{accountId}:{apiId}/{stage}/{httpVerb}/[{resource}/[{child-resources}]]"
            Resource: arn
          }
        ]
      }
    }
  }
}
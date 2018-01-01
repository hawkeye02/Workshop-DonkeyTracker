# Step 9: Create an API for your Website

aa

![01](./images/01.jpg)

aa

![02](./images/02.jpg)

aa

![03](./images/03.jpg)

aa


```javascript
var AWS = require("aws-sdk");

AWS.config.update({
    region: "us-west-2",
    endpoint: "https://dynamodb.us-west-2.amazonaws.com"
});

var docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {
    const done = (err, res) => callback(null, {
        statusCode: err ? '400' : '200',
        body: err ? err.message : JSON.stringify(res),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
    });
  
    var params = {
      ExpressionAttributeNames:{
        "#u": "uuid",
        "#t": "timestamp"
      },
      ExpressionAttributeValues: {
        ':u': event.queryStringParameters.u,
        ':t' : event.queryStringParameters.t
       },
     KeyConditionExpression: '#u = :u and begins_with(#t, :t)',
     ProjectionExpression: '#t, latitude, longitude, speed',
     TableName: 'Tracks'
    };
    
    docClient.query(params, done);
};
```

aa

[Reserved Words](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/ReservedWords.html)

[Expression Attribute Names](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.ExpressionAttributeNames.html)

![04](./images/04.jpg)

aa

```json
{
  "httpMethod": "GET",
  "queryStringParameters": {
    "u": "D4F2CD57-9739-4238-84EC-DA0A4C5324EF",
    "t": "2017-12-31"
  }
}
```

![05](./images/05.jpg)

aa

![06](./images/06.jpg)

aa

![07](./images/07.jpg)

aa

![08](./images/08.jpg)

aa

![09](./images/09.jpg)

aa

![10](./images/10.jpg)

aa

![11](./images/11.jpg)

aa

![12](./images/12.jpg)

aa

![13](./images/13.jpg)

aa

![14](./images/14.jpg)

aa

![15](./images/15.jpg)

aa

![16](./images/16.jpg)

aa

![17](./images/17.jpg)

aa

![18](./images/18.jpg)

aa

![19](./images/19.jpg)

aa

![20](./images/20.jpg)

aa

![21](./images/21.jpg)

aa

![22](./images/22.jpg)

aa

![23](./images/23.jpg)

aa

![24](./images/24.jpg)

aa

![25](./images/25.jpg)

aa

![26](./images/26.jpg)

aa
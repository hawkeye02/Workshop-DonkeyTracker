# Step 3: Exposing your Lambda Function through the API Gateway

Log in to the **[AWS Console](https://console.aws.amazon.com)** and navigate to **API Gateway**. Make sure you are in the same region as the one where you created the DynamoDB table and Lambda function. If this is the first API Gateway you create in this account, you will be greeted with a screen like the one below. Click on **Get Started**.

![01](./images/01.jpg)

Acknowledge the opening dialog by clicking on **OK**.

![02](./images/02.jpg)

Step out of the sample API by ticking the radio box next to **New API**. Give the API a name and an optional description and leave the default **Endpoint Type** as **Edge optimized**. This will bring the API closer to your customers and also mitigate DDoS attacks. This is not just useful to enhance availability but also helps to control the cost. Then click on **Create API**.

![03](./images/03.jpg)

Once the API is created you will be redirected to its **Resources**. Naturally this is so far empty so go ahead, expand the dropdown list **Actions** and click on **Create Method**.

![05](./images/05.jpg)

Pick **POST** from the list of available methods and click on the checkmark to the right.

![06](./images/06.jpg)

Select **Lambda Function** as integration type and make sure to tick the box next to **Use Lambda Proxy integration**. Then pick the region where you deployed your Lambda function and enter the name of your function (here **locations**).

![07](./images/07.jpg)

Acknowledge the warning that you are abut to give the API Gateway rights to invoke your Lambda function by clicking on **OK**.

![08a](./images/08a.jpg)

Once the method is created, head over to your Lambda functions in a new broser tab. You should be seeing **API Gateway** in the triggers section of your function.

![08b](./images/08b.jpg)

Head back to the browser tab where you have your API Gateway console open, click on your **POST** method and then on the header of the **Method Request** box. We'll make a few adjustments such as enabling authorization through an API key and CORS before we deploy the API.

![09](./images/09.jpg)

Click on the pencil next to **API Key Required** and select **true** from the dropdown list. Then click on the checkmark next to it to confirm and store the configuration.

![10](./images/10.jpg)

This will get you back to the POST method and you should see the confirmation that an API key is now required.

![11](./images/11.jpg)

Head to the top level resource ("/") and pick **Enable CORS** from the dropdown list **Actions**.

![12](./images/12.jpg)

Make sure that **X-API-Key** is part of the list of **Access-Control-Allow-Headers** and click on **Enable CORS and replace existing CORS headers**.

![13](./images/13.jpg)

Acknowledge the summary of the changes that are about to be made by clicking on **Yes, replace existing values**.

![14](./images/14.jpg)

Once you receive confirmation...

![15](./images/15.jpg)

...pick **Deploy API** from the dropdown list **Actions**.

![16](./images/16.jpg)

In the dialog that opens next, pick **[New Stage]** from the dropdown list, enter **prod** as stage name as well as an optional description for the stage and the deployment you are about to make. Then click on **Deploy**.

![17](./images/17.jpg)

You will be redirected to your new stage once the deployment is complete. Take note of the **Invoke URL**. You will need it later when you test the API. 

![18](./images/18.jpg)

You have now an API but it will refuse to respond without an API key. So, let's take care of that next. On the left hand navigation tree head over to **Usage Plans** and click on the button **Enable Usage Plans**. This might take a moment. Refresh the screen from time to time.

![19](./images/19.jpg)

Once the prompt to enable usage plans disappears, click on the button **Create**.

![20](./images/20.jpg)

Give the plan a name (here **Basic**), set average (here: **5**) and burstable (here: **10**) limits for the number of requests per second (RPS) and scroll further down...

![21](./images/21.jpg)

...to enable a monthly quota (here: **50,000**). Then click on **Next**.

![22](./images/22.jpg)

Click on **Add API Stage** and...

![23](./images/23.jpg)

...pick your newly created API and stage from the respective dropdwn lists, then click the checkmark next to it...

![24](./images/24.jpg)

...and click on **Next**.

![25](./images/25.jpg)

Finally, click on **Done** to create the usage plan.

![26](./images/26.jpg)

Once the usage plan is created,...

![27](./images/27.jpg)

...navigate to **API Keys** and select **Create API Key** from the dropdown list **Actions**.

![28](./images/28.jpg)

Give the API key a name and an optional description and click on **Save**.

![29](./images/29.jpg)

Once the key is created, click on **Add to Usage Plan**,...

![30](./images/30.jpg)

enter the plan you created in the revious step (here: **Basic**) and click on the checkmark to the right.

![31](./images/31.jpg)

This will automatically populate the fields **API** and **Stage**. 

![32](./images/32.jpg)

You're now ready to test our API. You may have different preferences for tools to craft and test HTTP POST requests but the following steps are leveraging [Postman](https://www.getpostman.com/). Start **Postman**, pick POST as the method, enter the URL to our API and add to the header the key **x-api-key** with the API key you just generated as the value. 

What, you forgot the invoke URL for your API and the API key? No worries you can always get them back.

![33a](./images/33a.jpg)

The invoke URL is at the top of the page for your API stage,...

![33b](./images/33b.jpg)

and you can always head back to yur API keys and click on **Show**...

![33c](./images/33c.jpg)

...to see the full key.

![33d](./images/33d.jpg)

Back in Postman add the following body to your HTTP POST requests. This is similar to what you will pass on from the mobile application. Don't worry about what all this is for now, we'll have a closer look when we cover the mobile application.

```json
{
    "location": {
        "coords": {
            "speed": 34.549999999999997,
            "longitude": -122.38515208,
            "latitude": 37.562428439999998,
            "accuracy": 5,
            "altitude_accuracy": -1,
            "altitude": 0,
            "heading": 321.32999999999998
        },
        "extras": {},
        "is_moving": true,
        "odometer": 1300163.6000000001,
        "uuid": "test-uuid",
        "activity": {
            "type": "unknown",
            "confidence": 100
        },
        "battery": {
            "level": -1,
            "is_charging": false
        },
        "timestamp": "2017-12-26T19:11:54.118Z"
    },
    "device": {
        "version": "11.2",
        "uuid": "test-uuid",
        "model": "x86_64",
        "manufacturer": "Apple",
        "cordova": "4.5.4",
        "platform": "iOS"
    }
}

```

Now click on **Send**. You should receive a status code 200, indicating that your request was successful.

![33e](./images/33e.jpg)

To verify, head over to the DynamoDB console in a new browser tab, navigate to items and verify that a new item has indeed just been added.

![34](./images/34.jpg)

And that's it for step 3. You just created an API with a HTTP POST method that triggers your Lambda function. You set up authorization with API keys and enabled throtteling for the usage plan before testing that you can indeed write to your DynamoDB table. You are now ready to move on to [step 4](../Step-04).
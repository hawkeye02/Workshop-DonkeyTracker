# Step 12 (optional): Set up a Domain

Log in to the **[AWS Console](https://console.aws.amazon.com)**, navigate to **Route 53**...

![01](./images/01.jpg)

...and click on **Get started now** under **Domain registration**.

![02](./images/02.jpg)

Click on **Register Domain**,...

![03](./images/03.jpg)

...type the name of the domain you want to register and pick the top-level domain extension (here: .info). Click **Check** to test the availability of the domain name...

![04](./images/04.jpg)

 ...and then click on **Add to cart**.

![05](./images/05.jpg)

Scroll down to the bottom of the page and click on **Continue**.

![06](./images/06.jpg)

Fill in the contact details of the **registrant**...

![07](./images/07.jpg)

...and click on **Continue**.

![08](./images/08.jpg)

Tick the check-box to indicate you accept the **Terms & Conditions** and finalize the purchase of the domain name by clicking on **Complete Purchase**.

![09](./images/09.jpg)

Route 53 informs you about the next steps, which include the formal registration of the domain as well as an email confirmation that you will have to acknowledge. Click on **Go To Domains** to close this screen...

![10](./images/10.jpg)

...and see the status of the registration which in the screen below shows still as **in progress**.

![11](./images/11.jpg)

Meanwhile you should have received an email that prompts you to confirm the contact details (or at least the email-address) of the registrant. Click on the link in the email to confirm that it is valid and yours.

![12](./images/12.jpg)

You should see a screen that indicates your email verification is now complete.

![13](./images/13.jpg)

Shortly thereafter you will also receive a 2nd email confirming the registration.

![14](./images/14.jpg)

At this time your domain name request transitioned from **Pending requests** to **Registered domains**.

![15](./images/15.jpg)

Now that you own the domain you can start pointing it at your CloudFront distribution. Open a 2nd browser tab, navigate to the CloudFront Console, click on your distribution and then on **Edit** in the tab **General**.

![16](./images/16.jpg)

Under **Alternate Domain Names** add the name of your newly registered domain.

![17](./images/17.jpg)

Scroll down and click on **Yes, Edit** to confirm the change.

![18](./images/18.jpg)

Back in the Route 53 Console select the **Dashboard** in the navigation tree to the left and click on **Hosted zones**.

![19](./images/19.jpg)

Click on your domain name...

![20](./images/20.jpg)

...and then on **Create Record Set**. 

![21](./images/21.jpg)

You will first create a record for the IP v4 address of your domain without the prefix **www**. So, go ahead, leave the name blank, pick **Type A**, activate the radio box for **Alias Yes** and then select your CloudFront domain from the list of **Alias Targets** before clicking on **Create**.

![22](./images/22.jpg)

Once the record is created, click on **Create Record Set** again to create a record for the IP v6 address of your domain without the prefix **www**.

![23](./images/23.jpg)

Leave the name blank again, pick **Type AAAA**, acivate the radio box for **Alias Yes** and then select your CloudFront domain from the list of **Alias Targets** before clicking on **Create** once more.

![24](./images/24.jpg)

With the 2 records in place open a new browser tab...

![25](./images/25.jpg)

...and verify that you can now reach your website under the newly created domain name. 

![26](./images/26.jpg)

At present, you can reach your website under the naked domain name that you registered but it will fail with the prefix **www**. To some extend it is a matter of taste if you have a domain with or without the prefix **www** - or both. If you want to have them both, head over to [step 13](../Step-13) next.
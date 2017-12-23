# WORK IN PROGRESS (DonkeyTracker Workshop)
Workshop to build an end-to-end serverless tracking application for your mobile device including a serverless backend powered by Amazon Web Services (AWS). The keyword here is **serverless**.

**Serveless computing** allows you to focus entirely on your application rather than managing servers and scaling the environment. Often it is also more cost efficient since you avoid overprisioning and have just the right capacity. Therefore this workshop is build around technologies such as DynamoDB, Lambda, API Gateway and Simple Storage Service (S3).

## Requirements

* An **AWS Account**. If you don't have one yet, head over to [Appendix-03](./Appendix-03) to learn how to get one and configure the initial Identity and Access Management. You will also need an **AWS Access Key ID** and **AWS Secret Access Key** for some of the testing from the AWS CLI. [Appendix-03](./Appendix-03) also explains how to get the key.
* A Code Editor. I prefer [Visual Studio Code](https://code.visualstudio.com/) and use the following extensions for this workshop:
    * [Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one) for the documentation in Markdown

## Step 1: Storing Data in DynamoDB

AWS provides many options to store and query data. For the type of data that we want to store in our tracking application, a database is probably most appropriate and AWS provides severeal managed and unmanaged services. While the recently announced [Amazon Aurora Serverless](https://aws.amazon.com/blogs/aws/in-the-works-amazon-aurora-serverless/) might be an option in the future we'll pick for now the already proven NoSQL database [DynamoDB](https://aws.amazon.com/dynamodb/). 

Head over to [Step-01](./Step-01) to dive right in.

## [Appendix-01: References](./Appendix-01)
## [Appendix-02: Acronyms](./Appendix-02)
## [Appendix-03: Initial Identity and Access Management for a New Account](./Appendix-03)

# Appendix 3: Initial Identity and Access Management for a New Account

There are a few security considerations regarding the access to your new AWS account that you may want to address. 

Log in to the **[AWS Console](https://console.aws.amazon.com)**. 

![01](./images/01.jpg)

Navigate to **Identity and Access Management**. In the Dashboard you will find a number of warnings that are good practice to take care off.

![02](./images/02.jpg)

First, activate Multi-Factor Authentication (MFA) to add an additional level of security. There are just too many bad actors out there and we don’t want to make life simple for them so expand the drop down element and click on **Manage MFA**.

![03](./images/03.jpg)

Select a **Virtual MFA** and click on **Next Step**. In order to configure a Virtual MFA we require a device with an application that supports TOTP (Time-Based One-Time Password Algorithm) such as Google Authenticator (for more information see also [Using Multi-Factor Authentication (MFA) in AWS](http://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa.html?icmpid=docs_iam_console)).

![04](./images/04.jpg)

Confirm the requirements for a Virtual MFA and click on **Next Step**.

![05](./images/05.jpg)

Scan the QR Code in your Virtual MFA application (e.g. Google Authenticator) on your mobile device and enter 2 subsequent codes as requested then click **Activate Virtual MFA**.

![06](./images/06.jpg)

That completes the activation of the virtual MFA. Click **Finish** to return to the dashboard.

![07](./images/07.jpg)

When you first create an AWS account, you begin with a single sign-in identity that has complete access to all AWS services and resources in the account. This identity is called the AWS account *root user* and is accessed by signing in with the email address and password that you used to create the account. It is strongly recommended to create IAM (Identity and Access Management) users - even for administrative tasks and use the root user only for a [limited set of tasks that require these elevated priviliges](http://docs.aws.amazon.com/general/latest/gr/aws_tasks-that-require-root.html). 
So go ahead and expand the drop down **Create individual IAM users** and click on **Manage Users**.

![08](./images/08.jpg)

Click on **Add User**

![09](./images/09.jpg)

Give the user a name and check the boxes for **Programmatic Access** and **Console Access**. The former is required for the AWS Command Line Interface (CLI) and Software Development Kits (SDK). Also give the user a password. Leave the require password reset unchecked since this user is for yourself and then click **Next Permissions**.

![10](./images/10.jpg)

Select **Add user to group** and click on **Create Group**.

![11](./images/11.jpg)

Give the group a name (here Admin) and tick the box next to **AdministratorAccess**. This is our first IAM user and we want to give it full admin rights.

![12](./images/12.jpg)

Click on **Next Review**...

![13](./images/13.jpg)

...and in the following screen on **Create User**.

![14](./images/14.jpg)

Acknowledge the confirmation that the user has been created and click on **Close**.

![15](./images/15.jpg)

Back in the Dashboard you will see that the warnings for IAM users and groups have been resolved and only the password policy remains. Expand the dropdown **Apply an IAM password policy** and click on **Manage Password Policy**.

![16](./images/16.jpg)

Set the password policy as you see fit. Here you see a minimum password length of 6 characters, requirements for upper and lower case characters, numbers as well as alphanumeric characters and you also allow the users to change their passwords. Then cick on **Apply password policy**.

![17](./images/17.jpg)

Back in the dashboard you see that all warnings are now resolved. So you can log out as the root user and log back in as the newly created IAM user. 

![18](./images/18.jpg)

For the root user you have already enabled MFA but you haven't done the same yet for the IAM user so head over to the IAM console.

![19](./images/19.jpg)

Select your user and navigate to the tab **Security credentials**, then click the pencil next to **Assigned MFA device** which currently shows **No**.

![20](./images/20.jpg)

The next steps are the same as the ones for the root user. Select **A virtual MFA device** and click on **Next Step**. 

![21](./images/21.jpg)

Acknowledge the reminder that you require an MFA application  such as Google Authenticator and click on **Next Step**.

![22](./images/22.jpg)

Scen the QR Code in your virtual MFA device and enter 2 subsequent authentication codes, then click on **Activate Virtual MFA**.

![23](./images/23.jpg)

Back in the screen for the configuration of security credentials for your IAM users scroll down and click on create **Create access key**. Thi is the key you will require for CLI and SDK access to your AWS account.

![24](./images/24.jpg)

This is the only time you will see the **secret access key** in the concole. You can delete it and create a new one but once yu leave this screen you can never again retrieve the key from the console. So, copy the secret access key and store it somewhere save or simply download the credentials as .csv file. 

![25](./images/25.jpg)

This concludes the initial configuration of the Identity and Access Management for you new account and you're all set for the next steps.
AWSCognito.config.region = _config.cognito.region;
     
var poolData = {
    UserPoolId : _config.cognito.userPoolId, 
    ClientId : _config.cognito.userPoolAppClientId 
};

var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);

function verifyUser(){
    createCognitoUser(document.getElementById('txtEmail').value).confirmRegistration(document.getElementById('txtVerify').value, true, function(err, result) {
        if (err) {
            alert(err);
            return;
        }
        console.log('You are now confirmed and can log in.');
        window.location.href = '/sign-in.html';
    });
}

function createCognitoUser(email) {
    return new AmazonCognitoIdentity.CognitoUser({
        Username: email,
        Pool: userPool
    });
}
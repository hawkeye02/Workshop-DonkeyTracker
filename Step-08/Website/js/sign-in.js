AWSCognito.config.region = _config.cognito.region;
     
var poolData = {
    UserPoolId : _config.cognito.userPoolId, 
    ClientId : _config.cognito.userPoolAppClientId 
};

var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);

function signIn(){
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
        Username: document.getElementById('txtEmail').value,
        Password:  document.getElementById('txtPassword').value
    });

    createCognitoUser(document.getElementById('txtEmail').value).authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            console.log('Successfully Logged In');
            window.location.href = 'tracker.html';
        },
        onFailure: function (err) {
            alert(err);
        }
    });
}

function createCognitoUser(email) {
    return new AmazonCognitoIdentity.CognitoUser({
        Username: email,
        Pool: userPool
    });
}
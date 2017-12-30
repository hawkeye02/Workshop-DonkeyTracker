AWSCognito.config.region = _config.cognito.region;
     
var poolData = {
    UserPoolId : _config.cognito.userPoolId, 
    ClientId : _config.cognito.userPoolAppClientId 
};

function registerUser(){
    var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);

    var attributeList = [];
    
    var attributeEmail = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute({
        Name : 'email',
        Value : document.getElementById('txtEmail').value 
    });
    
    attributeList.push(attributeEmail);
    
    var cognitoUser;
    userPool.signUp(document.getElementById('txtEmail').value, document.getElementById('txtPassword').value, attributeList, null, function(err, result){
        if (err) {
            alert(err);
        }
        cognitoUser = result.user;
        alert('user ' + cognitoUser.getUsername() + ' registered');
    });
}

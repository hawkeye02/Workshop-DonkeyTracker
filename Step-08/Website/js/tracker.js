window.onload = checkToken;

AWSCognito.config.region = _config.cognito.region;
     
var poolData = {
    UserPoolId : _config.cognito.userPoolId, 
    ClientId : _config.cognito.userPoolAppClientId 
};

var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);

function checkToken(){
    var cognitoUser = userPool.getCurrentUser();

    if (cognitoUser) {
        cognitoUser.getSession(function sessionCallback(err, session) {
            if (err) {
                alert(err);
                window.location.href = '/sign-in.html';
            } else if (!session.isValid()) {
                alert('no session token');
                window.location.href = '/sign-in.html';
            } else {
                document.getElementById('txtJWT').innerHTML = (session.getIdToken().getJwtToken());
            }
        });
    } else {
        alert('not logged in');
        window.location.href = '/sign-in.html';        
    }
}

function signOut(){
    userPool.getCurrentUser().signOut();
    window.location.href = '/index.html';   
}
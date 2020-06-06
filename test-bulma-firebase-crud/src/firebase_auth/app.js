


function getRecaptchaMode() {
    var config = parseQueryString(location.hash);
    return config['recaptcha'] === 'invisible' ?
        'invisible' : 'normal';
  }


/**
 * @return {string} The URL of the FirebaseUI standalone widget.
 */
function getWidgetUrl() {
    return '/widget.html#recaptcha=' + getRecaptchaMode() + '&emailSignInMethod=' +
        getEmailSignInMethod();
  }

/**
 * Open a popup with the FirebaseUI widget.
 */
var signInWithPopup = function() {
    window.open(getWidgetUrl(), 'Sign In', 'width=985,height=735');
  };


/**
 * Initializes the app.
 */
var initApp = function() {
    document.getElementById('sign-in-with-popup').addEventListener(
        'click', signInWithPopup);
    document.getElementById('sign-out').addEventListener('click', function() {
      firebase.auth().signOut();
    });
    // document.getElementById('delete-account').addEventListener(
    //     'click', function() {
    //       deleteAccount();
    //     });

    // document.getElementById('recaptcha-normal').addEventListener(
    //     'change', handleConfigChange);
    // document.getElementById('recaptcha-invisible').addEventListener(
    //     'change', handleConfigChange);
    // // Check the selected reCAPTCHA mode.
    // document.querySelector(
    //     'input[name="recaptcha"][value="' + getRecaptchaMode() + '"]')
    //     .checked = true;

    // document.getElementById('email-signInMethod-password').addEventListener(
    //     'change', handleConfigChange);
    // document.getElementById('email-signInMethod-emailLink').addEventListener(
    //     'change', handleConfigChange);

    // // Check the selected email signInMethod mode.
    // document.querySelector(
    //     'input[name="emailSignInMethod"][value="' + getEmailSignInMethod() + '"]')
    //     .checked = true;
  };

window.addEventListener('load', initApp);

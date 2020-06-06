const guideList = document.querySelector( '.guides' )
const loggedOutLinks = document.querySelectorAll( '.logged-out' );
const loggedInLinks = document.querySelectorAll( '.logged-in' );
const accountDetails = document.querySelector( '.account-details' )
const adminItems = document.querySelectorAll('.admin');

const setupUI = ( user ) => {
  // remember update firebase rules
  // match /users/{userId} {
  //   allow create: if request.auth.uid != null
  //   allow read: if request.auth.uid == userId
  // }

  if ( user ) {

    if (user.admin) {
      // show admin panel
      adminItems.forEach(item => item.style.display = 'block')
    }


    // normal user log in
    db.collection( 'users' ).doc( user.uid ).get().then( ( doc ) => {
      const html = `
        <div>logged in as ${user.email}</div>
        <div>${doc.data().bio}</div>
        <div>${user.admin? 'admin': ''}</div>
        `
      accountDetails.innerHTML = html;
    } )

    loggedInLinks.forEach( item => item.style.display = 'block' )
    loggedOutLinks.forEach( item => item.style.display = 'none' )
  } else {
    // hide account info
    // user logged out

    accountDetails.innerHTML = '';

    loggedInLinks.forEach( item => item.style.display = 'none' )
    loggedOutLinks.forEach( item => item.style.display = 'block' )
    adminItems.forEach(item => item.style.display = 'none')

  }
}

// setup guides
const setupGuides = ( data ) => {
  if ( data.length ) {

    let html = '';
    data.forEach( ( doc ) => {
      const guide = doc.data()
      const li = `
        <li>
          <div class="collapsible-header grey lighten-4">${guide.title}</div>
          <div class="collapsible-body white">${guide.content}</div>
        </li>
      `
      html += li
    } )

    guideList.innerHTML = html
  } else {
    guideList.innerHTML = '<h5 class="center-align">Login to view guides</h5>'
  }
}

// setup materialize components
document.addEventListener( 'DOMContentLoaded', function () {

  var modals = document.querySelectorAll( '.modal' );
  M.Modal.init( modals );

  var items = document.querySelectorAll( '.collapsible' );
  M.Collapsible.init( items );

} );
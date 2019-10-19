function helloworld() {
  console.log( 'helloworld' );
}

const get_ele = ( sel_in ) => {
  return document.querySelector( sel_in )
};
const get_eles = ( sel_in ) => {
  return document.querySelectorAll( sel_in )
};


function click_list_all() {
  fetch( 'http://localhost:5000/test-firebase-3a0f6/us-central1/main/api/jstest/echo_get?q=1234' )
    .then( res => res.text() )
    .then( res_text => {
      console.log(res_text)
      get_ele( '#list_result' ).innerHTML = res_text;
    })
}


document.addEventListener( "DOMContentLoaded", function () {
  console.log( "helloworld" );
} );
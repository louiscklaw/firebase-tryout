function helloworld() {
  console.log( 'helloworld' );
}

const get_ele = ( sel_in ) => {
  return document.querySelector( sel_in )
};
const get_eles = ( sel_in ) => {
  return document.querySelectorAll( sel_in )
};

const prepare_get_request = ( endpoint ) => {
  return fetch( `${API_PATH}/${endpoint}` );
}

const prepare_put_request = ( endpoint ) => {
  return fetch( `${API_PATH}/${endpoint}`, create_json_put_config() );
}

function create_json_put_config( json_in ) {
  return {
    ...METHOD_PUT,
    ...HEADERS_JSON,
    body: JSON.stringify( json_in )
  };
}

const create_delete_config = ( ) => {
  return {
    ...METHOD_DELETE
  };
}

function create_json_post_config( json_in ) {
  return {
    ...METHOD_POST,
    ...HEADERS_JSON,
    body: JSON.stringify( json_in )
  };
}

function clickCreate() {
  fetch( `${API_PATH}/create_fight`, create_json_post_config( {
      winner: get_ele( '#create_winner' ).value,
      losser: get_ele( '#create_losser' ).value,
      title: get_ele( '#create_title' ).value
    } ) )
    .then( res => res.json() )
    .then( res_json => {
      refreshLists();
      get_ele( '#create_result' ).innerHTML = JSON.stringify( res_json );
    } )

}

function click_echo_get() {
  fetch( `${API_PATH}/echo_get?q=1234` )
    .then( res => res.text() )
    .then( res_text => {
      console.log( res_text )
      get_ele( '#echo_get' ).innerHTML = res_text;
    } )
}

function click_hello_get() {
  fetch( `${API_PATH}/hello_get` )
    .then( res => res.text() )
    .then( res_text => {
      console.log( res_text );
      get_ele( '#hello_get' ).innerHTML = res_text;
    } )
}

function click_list_all() {
  fetch( `${API_PATH}/fights` )
    .then( res => res.json() )
    .then( res_json => {
      get_ele( '#list_all_result' ).innerHTML = JSON.stringify( res_json );
    } )
}

function fetch_records() {
  return fetch( `${API_PATH}/fights` )
    .then( res => res.json() );
}

function prepareRecordList ( eles_in ) {

  fetch_records()
    .then( res_json => {
      eles_in.forEach( ele_in => {
        emptyList(ele_in);
        Object.keys( res_json ).forEach( _id => {
          var sel = ele_in;
          var opt1 = document.createElement( "option" );
          opt1.value = _id;
          opt1.text = _id;
          sel.add( opt1, null );
        } );
      })


    } )
}

function loadRecord( id_in ) {
  return prepare_get_request( `/fight/${id_in}` )
    .then( res => res.json() )

}

function readRecord( id_in ) {
  prepare_get_request( `/fight/${id_in}` )
    .then( res => res.json() )
    .then( res_json => {
      get_ele( '#read_winner' ).value = res_json.value.winner;
      get_ele( '#read_losser' ).value = res_json.value.losser;
      get_ele( '#read_title' ).value = res_json.value.title;
    } )
}

function onUpdateSelectChange( ele_in ) {
  var id_to_load = ele_in.value;
  loadRecord( id_to_load )
    .then( res_json => {
      get_ele( '#update_winner' ).value = res_json.value.winner;
      get_ele( '#update_losser' ).value = res_json.value.losser;
      get_ele( '#update_title' ).value = res_json.value.title;
    } )
}

function updateRecord() {
  var id_to_update = get_ele( '#update_records_list' ).value;
  var fetch_url = `${API_PATH}/fights/${id_to_update}`;
  console.log( fetch_url );

  fetch( fetch_url, create_json_put_config( {
      // winner: get_ele( '#update_winner' ).value,
      // losser: get_ele( '#update_losser' ).value,
      title: get_ele( '#update_title' ).value
    } ) )
    .then( res => res.json() )
    .then( res_json => {
      get_ele( '#update_records' ).innerHTML = JSON.stringify( res_json );
    } )
}

function deleteRecord () {
  let id = get_ele( '#delete_records_list' ).value;

  let fetch_url = `${API_PATH}/fights/${id}`;

  fetch(fetch_url , create_delete_config() )
  .then( res_json => {
    get_ele( '#update_records' ).innerHTML = JSON.stringify( res_json );
  } )
    .then( () => {
      refreshLists();
  })
}

function onReadSelectChange( ele_in ) {
  var id_to_read = ele_in.value;
  readRecord( id_to_read );
}

function emptyList ( ele_in ) {
  _.range( ele_in.options.length ).forEach( idx => {
    ele_in.remove( 0 );
  })

}

function refreshLists () {
  prepareRecordList( [
    get_ele( '#read_records_list' ),
    get_ele( '#update_records_list' ),
    get_ele( '#delete_records_list' )
  ] );
}

document.addEventListener( "DOMContentLoaded", function () {
  console.log( "helloworld" );

  refreshLists();
} );
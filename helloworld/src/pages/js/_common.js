function json_pretty_print (json_in) {
  return JSON.stringify( json_in, null, 2 );
}

function clear_select_list_option ( ele_in ) {
  _.range( ele_in.length ).forEach( idx => {
    ele_in.remove( 0 );
  })
}
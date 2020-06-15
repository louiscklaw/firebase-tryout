function update_status(pre_in) {
  get_ele("#status").innerHTML = pre_in;
}

function json_pretty_print(json_in) {
  return JSON.stringify(json_in, null, 2);
}

function clear_select_list_option(ele_in) {
  _.range(ele_in.length).forEach(idx => {
    ele_in.remove(0);
  });
}

const create_delete_config = ( ) => {
  return {
    ...METHOD_DELETE
  };
}

function create_json_post_config(json_in) {
  return {
    ...METHOD_POST,
    ...HEADERS_JSON,
    body: JSON.stringify(json_in)
  };
}

function fetch_get_json(uri_in) {
  return fetch(uri_in).then(res => res.json());
}

function fetch_json ( uri, config ) {
  return fetch( uri, config )
    .then( res => res.json() );
}

const fetch_delete_request = endpoint => {
  console.log( `${API_BASE_PATH}/${endpoint}` );
  return fetch_json( `${API_BASE_PATH}/${endpoint}`, create_delete_config());
}

const prepare_put_request = endpoint => {
  return fetch(`${API_PATH}/${endpoint}`, create_json_put_config());
};

function create_json_put_config(json_in) {
  return {
    ...METHOD_PUT,
    ...HEADERS_JSON,
    body: JSON.stringify(json_in)
  };
}

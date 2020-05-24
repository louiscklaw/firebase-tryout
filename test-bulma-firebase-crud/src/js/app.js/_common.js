function update_status(pre_in) {
  get_ele("#status").innerHTML = pre_in;
}

function fetch_get_into_ele(uri, sel_in) {
  fetch_get_json(uri).then(res_json => {
    get_ele(sel_in).innerHTML = `<pre>${JSON.stringify(res_json)}</pre>`;
  });
}

function clearListContent(sel_in) {
  _.range(get_ele(sel_in).childElementCount).forEach(() => {
    get_ele(sel_in).remove(0);
  });
}

function fetch_get_json(uri_in) {
  return fetch(uri_in).then(res => res.json());
}

function prepare_list_request() {
  return fetch_get_json(`${API_BASE_PATH}/crud/fights`);
}

function updateList(json_in, sel_in) {
  Object.keys(json_in).forEach(_id => {
    let option = new Option(_id, _id);
    get_ele(sel_in).appendChild(option);
  });
}

function updateSelectLists() {
  prepare_list_request().then(res_json => {
    ["#read_record_list", "#update_record_list", "#delete_record_list"].forEach(
      id_list => {
        clearListContent(id_list);
        updateList(res_json, id_list);
      }
    );
  });
}

function clickDeleteRecord() {
  var id_to_delete = get_ele("#delete_record_list").value;
  var fetch_url = `${API_BASE_PATH}/crud/fight/${id_to_delete}`;

  fetch(fetch_url, create_delete_config())
    .then(res => res.json())
    .then(res_json => {
      console.log(res_json);
      updateSelectLists();
    });
}

function get_ele(sel_in) {
  return document.querySelector(sel_in);
}

function json_pretty_print(json_in) {
  return JSON.stringify(json_in, null, 2);
}

function clear_select_list_option(ele_in) {
  _.range(ele_in.length).forEach(idx => {
    ele_in.remove(0);
  });
}

var create_delete_config = () => {
  return {
    ...METHOD_DELETE
  };
};

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

function fetch_json(uri, config) {
  return fetch(uri, config).then(res => res.json());
}

var fetch_delete_request = endpoint => {
  console.log(`${API_BASE_PATH}/${endpoint}`);
  return fetch_json(`${API_BASE_PATH}/${endpoint}`, create_delete_config());
};

var prepare_put_request = endpoint => {
  return fetch(`${API_PATH}/${endpoint}`, create_json_put_config());
};

function create_json_put_config(json_in) {
  return {
    ...METHOD_PUT,
    ...HEADERS_JSON,
    body: JSON.stringify(json_in)
  };
}

function getRecordById(id_in) {
  return fetch_get_json(`${API_BASE_PATH}/crud/fight/${id_in}`);
}

function getUpdateRecord(id_in) {
  getRecordById(id_in).then(res_json => {
    get_ele("#update_winner").value = res_json["winner"];
    get_ele("#update_losser").value = res_json["losser"];
    get_ele("#update_title").value = res_json["title"];
  });
}

function getReadRecord(id_in) {
  getRecordById(id_in).then(res_json => {
    get_ele("#read_winner").value = res_json["winner"];
    get_ele("#read_losser").value = res_json["losser"];
    get_ele("#read_title").value = res_json["title"];
  });
}

function addClickEventListener(sel_in, cb) {
  return get_ele(sel_in).addEventListener("click", cb);
}

function gen_get_record_uri(id_in){
  return `${API_BASE_PATH}/crud/fight/${id_in}`
}

function gen_create_record_uri(){
  return ``
}
function crudHelloworld() {
  fetch(`${API_BASE_PATH}/crud/helloworld`)
    .then(res => res.text())
    .then(res_text => {
      console.log(res_text);
    });
}

function createRecord() {
  fetch(
    `${API_BASE_PATH}/crud/fight`,
    create_json_post_config({
      winner: get_ele("#create_winner").value,
      losser: get_ele("#create_losser").value,
      title: get_ele("#create_title").value
    })
  )
    .then(res => res.json())
    .then(res_json => {
      updateSelectLists();
    });
}

function prepare_list_request() {
  return fetch_get_json(`${API_BASE_PATH}/crud/fights`);
}

function getRecordById(id_in) {
  return fetch_get_json(`${API_BASE_PATH}/crud/fight/${id_in}`);
}

function listRecords() {
  prepare_list_request().then(res_json => {
    get_ele("#record_list").innerHTML = json_pretty_print(res_json);
  });
}

function updateList(json_in, sel_in) {
  Object.keys(json_in).forEach(_id => {
    let option = new Option(_id, _id);
    get_ele(sel_in).appendChild(option);
  });
}

function clearListContent(sel_in) {
  _.range(get_ele(sel_in).childElementCount).forEach(() => {
    get_ele(sel_in).remove(0);
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

function readSelectListChange() {
  let id_to_read = get_ele("#read_record_list").value;
  getReadRecord(id_to_read);
}
function updateSelectListChange() {
  let id_to_read = get_ele("#update_record_list").value;
  getUpdateRecord(id_to_read);
}

function clickUpdateRecord() {
  var id_to_update = get_ele("#update_record_list").value;
  var fetch_url = `${API_BASE_PATH}/crud/fight/${id_to_update}`;

  fetch(
    fetch_url,
    create_json_put_config({
      winner: get_ele("#update_winner").value,
      losser: get_ele("#update_losser").value,
      title: get_ele("#update_title").value
    })
  ).then(res => res.json());
}

function clickDeleteRecord() {
  var id_to_delete = get_ele("#delete_record_list").value;
  var fetch_url = `${API_BASE_PATH}/crud/fight/${id_to_delete}`;

  fetch( fetch_url, create_delete_config() )
    .then( res => res.json() )
    .then( res_json => {
      console.log( res_json );
      updateSelectLists();
    });
}

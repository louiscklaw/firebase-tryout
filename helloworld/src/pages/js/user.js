function fetchUserList() {
  return fetch(`${API_PATH}/list_user`);
}

function fetch_to_json(uri, config = "") {
  if (config == "") {
    return fetch(uri).then(res => res.json());
  } else {
    return fetch(uri, config).then(res => res.json());
  }
}

function clickDeleteUser() {
  let id_to_delete = get_ele("#delete_user_list").value;
  fetch_to_json(`${API_PATH}/user/${id_to_delete}`, create_delete_config())
    .then(res_json => {
      get_ele("#delete_user_result").innerHTML = json_pretty_print(res_json);
    })
    .then( () => { updateUserList(); });
}

function clickListUser() {
  fetchUserList()
    .then(res => res.json())
    .then(res_json => {
      get_ele("#list_user_result").innerHTML = json_pretty_print(res_json);
    });
}

function insert_into_user_delete(ele_in, text, value) {
  ele_in.appendChild(new Option(text, value));
}

function insert_into_user_update(ele_in, text, value) {
  ele_in.appendChild(new Option(text, value));
}

function updateUserList() {
  fetchUserList()
    .then( res => res.json() )
    .then( res_json => {
      clear_select_list_option( get_ele( '#delete_user_list' ) );
      clear_select_list_option( get_ele( '#update_user_list' ) );
      return res_json;
    })
    .then(res_json => {
      let ele_delete_user_list = get_ele("#delete_user_list");
      let ele_update_user_list = get_ele("#update_user_list");
      Object.keys(res_json).forEach(_id => {
        insert_into_user_delete(ele_delete_user_list, _id, _id);
        insert_into_user_update(ele_update_user_list, _id, _id);
      } );

    });
}

document.addEventListener("DOMContentLoaded", function() {
  updateUserList();
});

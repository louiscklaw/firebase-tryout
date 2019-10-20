function fetchUserList() {
  return fetch(`${API_PATH}/list_user`);
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
    .then(res => res.json())
    .then(res_json => {
      let ele_delete_user_list = get_ele( "#delete_user_list" );
      let ele_update_user_list = get_ele( '#update_user_list' );
      Object.keys(res_json).forEach(_id => {
        insert_into_user_delete(ele_delete_user_list, _id, _id);
        insert_into_user_update(ele_update_user_list, _id, _id);
      });
    });
}

document.addEventListener("DOMContentLoaded", function() {
  updateUserList();
});

function debug_crud_helloworld() {
  alert("debug_crud helloworld");
}

get_ele("#read_record_list").addEventListener("change", () => {
  let id_to_read = get_ele("#read_record_list").value;
  getReadRecord(id_to_read);
});

get_ele("#update_record_list").addEventListener("change", () => {
  let id_to_read = get_ele("#update_record_list").value;
  getUpdateRecord(id_to_read);
});

updateSelectLists();

addClickEventListener("#list_records", () => {
  fetch_get_into_ele(`${API_BASE_PATH}/crud/fights`, "#record_list");
});

addClickEventListener("#createRecord", () => {
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
      get_ele("#record_list").innerHTML = json_pretty_print(res_json);
    })
    .then(() => {
      updateSelectLists();
    });
});

addClickEventListener("#update_record", () => {
  debug_print("udpate record");

  var id_to_update = get_ele("#update_record_list").value;
  var fetch_url = `${API_BASE_PATH}/crud/fight/${id_to_update}`;

  fetch(
    fetch_url,
    create_json_put_config({
      winner: get_ele("#update_winner").value,
      losser: get_ele("#update_losser").value,
      title: get_ele("#update_title").value
    })
  )
    .then(res => res.json())
    .then(() => {
      alert("update Done");
    });
});

addClickEventListener("#btn_delete_record", () => {
  var id_to_delete = get_ele("#delete_record_list").value;
  var fetch_url = `${API_BASE_PATH}/crud/fight/${id_to_delete}`;

  fetch(fetch_url, create_delete_config())
    .then(res => res.json())
    .then(res_json => {
      console.log(res_json);
      updateSelectLists();
    });
});


addClickEventListener('#sign-in-with-popup', () => {
  signInWithPopup();
})


get_ele("#btn_getIdToken").addEventListener("click", () =>{
  console.log('btn_getIdToken');
  getCurrentUserIdToken();
});

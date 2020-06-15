let USER_API_BASE_PATH = `${API_BASE_PATH}/user`

function user_helloworld() {
  fetch(`${USER_API_BASE_PATH}/helloworld`,{
    credentials: 'include'
  })
    .then(res=>res.text())
    .then(res_text => {
      console.log(res_text);
    })
}

function link_test(){
  fetch(`${USER_API_BASE_PATH}/link_test?q=abcdef`, {
    credentials: 'include',
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(res => res.text())
  .then(res_text => {
    console.log(res_text);
  })
}

function addUser() {
  let user_email = get_ele("#add_user_email").value;
  if (user_email) {
    fetch(
      `${USER_API_BASE_PATH}/user`,
      create_json_post_config({
        email: user_email
      })
    )
      .then(res => res.json())
      .then(res_json => {
        console.log(res_json);
      });
  }
}

let user_lists = [
  '#update_user_list','#remove_user_list'
];

function add_options(sel_in, option_in){
  get_ele(sel_in).appendChild(option_in);
}



function update_user_select_list(){
  fetch_json(`${USER_API_BASE_PATH}/users`)
    .then(res_json => {
      user_lists.forEach( listing => {
        clearListContent(listing);
      })

      Object.keys(res_json).forEach( _id => {
        user_lists.forEach( listing => {
          add_options(listing, new Option(_id, _id));
        })
      })
    })
}

function get_users() {
  return fetch(`${USER_API_BASE_PATH}/users`)
    .then(res => res.json())
    .then(res_json => {
      console.log(res_json);
    })
}

function get_user_json(){
  console.log(get_users());
}

function get_value_from_list(sel_in){
  return get_ele(sel_in).value;
}

function removeUser(){
  fetch(`${USER_API_BASE_PATH}/user/${get_value_from_list('#remove_user_list')}`,create_delete_config())
    .then(res => res.json())
    .then(res_json=>{
      update_user_select_list();
    })
}

function check_user(){
  fetch(`${USER_API_BASE_PATH}/check_user`)
    .then(res => res.text())
    .then( res_json=>{
      console.log(res_json);
    })
}

document.addEventListener( "DOMContentLoaded", function () {
    update_user_select_list();
} );



function init_page(){
  addClickEventListener('#save_new_record',()=>{
    var value_on_screen = record_fields.map(x => get_ele(`#add_${x}`).value);

    var to_add = new TestRecord(...value_on_screen);

    fetch(endpoints['fight'].create(), create_json_post_config(to_add.get_json()))
    .then(res=> res.json)
    .then(res_json => console.log(res_json));
  })

  addClickEventListener('#cancel_add', () =>{
    console.log('cancel add new record');
  })
}

init_page();
function test_edit_hellworld(){
  alert("test_edit_hellworld");
}

function get_record(id_in){
  console.log('getting record');
  fetch_json(endpoints['fight'].read(id_in))
  .then(res_json => {
    record_fields.forEach(field_name => {
      get_ele(`#edit_${field_name}`).value = res_json[field_name];
    })
  })
  .then(() => {
    console.log("get record done");
  })
}

function update_record(id_in){
  console.log('updating');
  var value_on_screen = record_fields.map(x => get_ele(`#edit_${x}`).value);
  var to_update = new TestRecord(...value_on_screen);
  fetch(endpoints['fight'].update(id_in), create_json_put_config(to_update.get_json()))
    .then(res => res.json())
    .then(res_json => console.log('update done'));
}

function get_id_from_href(){
  let output = {};
  let url = window.location.href;
  url.split("?")[1].split('&').map(x => x.split('='))
    .forEach( key_pair => {
      output[key_pair[0]] = key_pair[1];
    })
  return output;
}

function init_page(){
  var id = get_id_from_href()['q'];
  get_record(id);
  addClickEventListener('#save_edit', () => {
    update_record(id);
  })
}

init_page();
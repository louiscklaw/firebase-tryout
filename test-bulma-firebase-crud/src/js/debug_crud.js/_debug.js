
function debug_print(text_in) {
  if (ENV_DEBUG) {
    console.debug(text_in);
  }
}

function debug_alert(text_in){
  if(ENV_DEBUG){
    alert(text_in);
  }
}
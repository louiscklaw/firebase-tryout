var endpoints ={};
var record_types = ['fight'];

function init_endpoints(){
  record_types.forEach( r_type => {
    endpoints[r_type]={
      // post
      'create': () => {return `${API_BASE_PATH}/crud/${r_type}`},

      // get
      'read': (id) => {return `${API_BASE_PATH}/crud/${r_type}/${id}`},
      'list': () => {return `${API_BASE_PATH}/crud/${r_type}s`},

      // put
      'update': (id) => {return `${API_BASE_PATH}/crud/${r_type}/${id}`},

      // delete
      'delete': (id) => { return `${API_BASE_PATH}/crud/${r_type}/${id}`}
    };
  })
}

init_endpoints();
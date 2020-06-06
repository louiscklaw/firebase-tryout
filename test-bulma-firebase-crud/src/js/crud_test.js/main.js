function set_html_node(node_in, att_name, att_value = "") {
  if (att_value == "") {
    return node_in;
  } else {
    if (typeof att_value == typeof [1]) {
      let att_value_string = att_value.join(" ");
      return node_in.setAttribute(att_name, att_value_string);
    } else {
      return node_in.setAttribute(att_name, att_value);
    }
  }
}

// var record_fields =['team', 'pld', 'w', 'd', 'l', 'gf', 'ga', 'gd', 'pts' ];

function get_col_name(json_in) {
  // I would like to work only on the first row
  let _first_id = Object.keys(json_in)[0];

  let test_array =['team', 'pld', 'w', 'd', 'l', 'gf', 'ga', 'gd', 'pts' ];
  test_array.push('operation');

  return test_array
    .map(col_name => {
      return encap_html_tag(col_name, "th");
    })
    .join("");
}

function encap_html_tag(content, tag_in) {
  return `<${tag_in}>${content}</${tag_in}>`;
}

function get_table_header(json_in) {
  return encap_html_tag(get_col_name(json_in), "thead");
}

function get_table_footer(json_in) {
  return encap_html_tag(get_col_name(json_in), "tfoot");
}

function get_href_text(text, params_in) {
  let a_node = document.createElement("a");
  let text_node = document.createTextNode(text);

  Object.keys(params_in).forEach(key => {
    set_html_node(a_node, key, params_in[key]);
  });
  a_node.appendChild(text_node);
  console.log(a_node);
  return a_node.outerHTML;
}

function get_table_body(json_in) {
  return Object.keys(json_in)
    .map(_id => {
      var column_names = Object.keys(json_in[_id]);
      var row = column_names
        .map(col_name => {
          let value = json_in[_id][col_name];
          return encap_html_tag(value,"td");
        })
        .join("");

      // TODO: update me
      var oper_cell = operations.map( operation => encap_html_tag(
        get_href_text(operation,{id: `oper_${operation}_${_id}`})
        , 'td')).join('');

      // TODO: update me
      var final = row+oper_cell;
      console.log(final);

      return encap_html_tag(final, "tr");
    })
    .join("");
}

function table_template(table_content) {
  return `<table class="table is-fullwidth is-hoverable list_records">${table_content}</table>`;
}

function gen_table(json_in) {
  return table_template(
    [
      get_table_header(json_in),
      get_table_body(json_in),
      get_table_footer(json_in)
    ].join("")
  );
}

function fetch_uri_to_table(uri) {
  console.log("loading table");
  fetch_get_json(uri)
    .then(res_json => {
      get_ele("#list_record_table").innerHTML = gen_table(res_json);
    })
    .then(() => {
      console.log("load table done");
    });
}

// TODO: remove me
// document.addEventListener("DOMContentLoaded", function() {
//   console.log("crud_test.js helloworld");
//   fetch_uri_to_table(`${API_BASE_PATH}/crud/fights`);
// });

fetch_uri_to_table(`${API_BASE_PATH}/crud/fights`);
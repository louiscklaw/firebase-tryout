const GET_ENDPOINTS = {
    '/helloworld': echo_get
}

const POST_ENDPOINTS = {
    '/helloworld': echo_post
}

const PUT_ENDPOINTS = {};
const DELETE_ENDPOINTS = {};

function echo_get( req, res ) {
    // res.send( req.param.test );
    res.send( req.query.echo );

}

function echo_post ( req, res ) {
    console.log( JSON.stringify(req.body.echo) );
    // res.send( { foo: "bar" } );
    res.send( req.body.echo);
}

module.exports.init_http_actions = ( express_app ) => {
    Object.keys( GET_ENDPOINTS ).forEach( endpoint_path => {
        express_app.get( endpoint_path, GET_ENDPOINTS[ endpoint_path ] );
    } )

    Object.keys( POST_ENDPOINTS ).forEach( endpoint_path => {
        express_app.post( endpoint_path, POST_ENDPOINTS[
            endpoint_path ] );
    } );
}

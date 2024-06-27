import { 
  PUBLIC_SERVER, 
  PUBLIC_MATRIX_URL, 
  PUBLIC_REQUIRE_AUTH 
} from '$env/static/public';

import { redirect } from "@sveltejs/kit";
import { error } from '@sveltejs/kit';


/** @type {import('./$types').LayoutServerLoad} */
export async function load( { fetch, params, url, cookies, request } ) {

  const access_token = cookies.get('mx_access_token');

  let data = {
    homeserver_reachable: false,
    access_token_exists: !!access_token,
  };


  if(!access_token && PUBLIC_REQUIRE_AUTH == 'true') {
    redirect(302, '/login');
  }

  /*
  try {
    let url = `${PUBLIC_MATRIX_URL}/_matrix/client/versions`;
    const res = await fetch( url );
    const resp = await res.json();
    if(resp?.versions) {
      data.homeserver_reachable = true;
    }
  } catch(_) {
  }
  */


  return data;
}

import { FETCH_USER } from '../actions/types';

// export default function(state = {}, action) {
export default function(state = null, action) {
  // console.log(action);
	switch (action.type) {
		case FETCH_USER:
		  return action.payload || false;
      // User model || not logged in.
		default:
			return state;
	}
}

import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { RECEIVE_POST, REMOVE_POST } from '../actions/posts_actions'
import merge from 'lodash/merge';

const defaultState = {
  currentUser: null,
  errors: [],
};

const customizer = (objValue, srcValue) => {
  if (_.isArray(objValue)) {
    return srcValue;
  }
}

const SessionReducer = (state = defaultState, action) => {
  switch (action.type) {
    case RECEIVE_CURRENT_USER: {
      const currentUser = action.user;
      return merge({}, state, { currentUser });
    }
    case RECEIVE_POST: {
      let currentUser = Object.assign({}, state.currentUser)
      currentUser.feedIds = currentUser.feedIds.slice();
      if (!currentUser.feedIds.includes(action.post.id)){
        currentUser.feedIds.unshift(action.post.id);
      }
      return _.merge({}, state, { currentUser })
    }
    case REMOVE_POST: {
      let currentUser = Object.assign({}, state.currentUser)
      currentUser.feedIds = currentUser.feedIds.slice(),
      currentUser.feedIds.splice(currentUser.feedIds.indexOf(action.post.id), 1)
      return _.mergeWith({}, state, { currentUser }, customizer)
    }
    default:
      return state;
  }
};

export default SessionReducer;

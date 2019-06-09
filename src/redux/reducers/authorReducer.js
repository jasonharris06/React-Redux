//Reducer: Function that accepts state and action and returns a new state
import * as types from '../actions/actionTypes';
import initialState from './initialState';
export default function authorReducer(state = initialState.authors, action) {
    switch (action.type) {
        case types.LOAD_AUTHORS_SUCCESS:
            //Whatever is retured from the reducer becomes the new state.
            //Do not do state.push(action.course) this mutates state
            //the spread opperator clones the state and clones the course
            return action.authors;
        //Needs a default so it can return an unchanged state if the action wasn't triggered
        default:
            return state;
    }
}
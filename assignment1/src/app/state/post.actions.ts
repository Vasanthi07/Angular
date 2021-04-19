import { createAction, props } from "@ngrx/store";
import { Details } from "../details";

export const ADD_POST_ACTION = '[posts page] add post';

export const UPDATE_POST_ACTION = '[posts page] update post'
export const addPost = createAction(ADD_POST_ACTION,props<{post : Details}>());
export const updatePost = createAction(UPDATE_POST_ACTION,props<{post : Details}>());
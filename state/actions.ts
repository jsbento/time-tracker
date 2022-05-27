import { User } from '../types/User';

export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const setCurrentUser = (user: User | null) => ({type: SET_CURRENT_USER, user});
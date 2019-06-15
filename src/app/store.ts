import { GET_WORDS, GET_PATH, HANDLE_POINT, REMOVE_WORD, INIT_PLAY } from './actions';
import { Word } from "./word";

export interface IAppState {
  words: Word[];
  point: number;
  gameOver: boolean;
  isPlay: boolean;
}
export const INITIAL_STATE: IAppState = {
  words: [],
  point: 5,
  gameOver: false,
  isPlay: false
}

export const rootReducer = (state: IAppState = INITIAL_STATE, action): IAppState => {
  console.log('store action' , action);
  switch (action.type) {
    case INIT_PLAY: 
      return {
        ...state,
        words: [],
        point: 5,
        gameOver: false,
      };
    case GET_PATH: 
      return {
        ...state,
        isPlay: action.isPlay
      };
    case GET_WORDS:
      return {
        ...state,
        words: [...state.words, action.word] 
      };
    case HANDLE_POINT:
      return {
        ...state,
        point: action.isPointUp ? state.point + 1 : state.point - 1
      };
    case REMOVE_WORD: 
      return {
        ...state,
        words: state.words.filter((item, index) => index !== action.index)
      };
    default:
      return state;
  }
}


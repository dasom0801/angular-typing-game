import { GET_WORDS, GET_PATH, HANDLE_POINT, REMOVE_WORD } from './actions';
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
  switch (action.type) {
    case GET_PATH: 
      return {
        ...state,
        isPlay: action.isPlay
      }
    case GET_WORDS:
      return {
        ...state,
        words: [...state.words, action.word] 
      };
    case HANDLE_POINT:
      return {
        ...state,
        point: action.isPoint ? ++state.point : --state.point
      }
    case REMOVE_WORD: 
      return {
        ...state,
        words: state.words.filter((item, index) => index !== action.index)
      }
    default:
      return state;
  }
}


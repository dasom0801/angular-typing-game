import { GET_WORDS, GET_PATH, HANDLE_POINT, REMOVE_WORD, INIT_PLAY, GAMEOVER, LEVEL_UP, COUNT_TIME } from './actions';
import { Word } from "./word";

export interface IAppState {
  words: Word[];
  point: number;
  gameOver: boolean;
  isPlay: boolean;
  playSpeed: number;
  gameLevel: number;
  playTime: number;
}
export const INITIAL_STATE: IAppState = {
  words: [],
  point: 5,
  gameOver: false,
  isPlay: false,
  playSpeed: 1000,
  gameLevel: 1,
  playTime: 0
}

export const rootReducer = (state: IAppState = INITIAL_STATE, action): IAppState => {
  console.log('store action' , action);
  switch (action.type) {
    case INIT_PLAY: 
      return {
        ...INITIAL_STATE,
        isPlay: true
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
    case GAMEOVER: 
      return {
        ...state,
        gameOver: action.isOver
      }
    case LEVEL_UP:
      return {
        ...state,
        playSpeed: state.playSpeed - 100,
        gameLevel: state.gameLevel + 1
      }
    case COUNT_TIME: 
      return {
        ...state,
        playTime: state.playTime + 1
      }
    default:
      return state;
  }
}


import { WeatherActions, WeatherActionType } from '../actions/weather';
import { Weather } from '../../../model/weather';


export interface WeatherState {
    weatherList: Weather[];
    isLoading: boolean;
    error: string;
}

export const initialState: WeatherState = {
    weatherList: [],
    isLoading: false,
    error: ''
  };

  export function reducers(state = initialState, action: WeatherActions): WeatherState {
    switch (action.type) {
        case WeatherActionType.SEARCH: {
            return { ...state, isLoading: true, error: '' };
        }

        case WeatherActionType.SEARCH_COMPLETE: {
            return { ...state, isLoading: false, weatherList: [...state.weatherList, action.payload] };
        }

        case WeatherActionType.SEARCH_ERROR: {
            return { ...state, isLoading: false, error: action.payload };
        }

        default: {
            return state;
        }
    }
}
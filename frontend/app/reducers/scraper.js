import { SCRAPE_SUCCESS } from '../actions/scraper';


const initialState = {
    latest: null,
};

const scraper = (state = initialState, action = {}) => {
    switch (action.type) {
        case SCRAPE_SUCCESS: {
            const { data } = action;

            return {
                ...state,
                [data.url]: action.data,
                latest: action.data,
            };
        }
        default: {
            return state;
        }
    }
}

export default scraper;

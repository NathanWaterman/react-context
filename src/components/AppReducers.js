export const initialState = {
    searchedTerm: 'ba',
    loginTerm: ''
};

export const UPDATE_SEARCH = "UPDATE_SEARCH";
export const SET_LOGIN = "SET_LOGIN";

export function reducer(state, action) {
    switch (action.type) {
        case UPDATE_SEARCH:
            return {
                searchedTerm: action.searchedTerm
            };
        //TODO - RE-ARCHITECT LOGIN COMPONENT
        // case SET_LOGIN:
        //     return {
        //         loginTerm: action.loginTerm
        //     };
        default:
            return initialState;
    }
}
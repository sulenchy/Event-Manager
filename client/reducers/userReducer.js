export default (state = [], action) => {
    switch (action.type) {
        case 'SIGN_IN_USER':
            return [action.payload];
        default:
            return state;
    }
};
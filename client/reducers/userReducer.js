export default (state = [], action) => {
    switch (action.type) {
        case 'SIGN_IN_USER':
            console.log(action);
            return [action.payload];
        default:
            return state;
    }
};
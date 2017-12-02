export default (state = [], action) => {
    switch(action.type){
        case 'ADD_NEW_CENTER':
            return [action.payload];
        case 'GET_ALL_CENTER':
            return [action.payload];
        case 'GET_CENTER_DETAILS':
            return [action.payload];
        default:
            return state;
    }    
};
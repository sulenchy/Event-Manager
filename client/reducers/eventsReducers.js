export default (state = [], action) => {
    switch(action.type){
        case 'ADD_NEW_EVENT':
            return [action.payload];
        case 'GET_ALL_EVENT':
            return [action.payload];
        case 'GET_AN_EVENT':
            return [action.payload];
        default:
            return state;
    }    
};
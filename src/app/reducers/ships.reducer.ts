export function shipReducer(state, action) {
    switch(action.type){
        case '[ShipComponent] Set PageShips':
            return {
                ...state,
                ship: action.page
            }
    }
    
}
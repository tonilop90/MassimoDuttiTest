import { createAction, props } from '@ngrx/store';

export const changePage = createAction(
    '[ShipComponent] Set PageShips',
    props<{page:number}>()
);
export const previousPage = createAction('[Ship Component] PreviousPage');
export const reset = createAction('[Ship Component] Reset');
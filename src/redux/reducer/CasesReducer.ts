import { CasesActions } from '../actions/Cases';
import { CasesTypes } from '../actions/Actions';
import { CharityCase } from '../../models/CharityCase';

export interface ICasesState {
    cases?: CharityCase[];
}

const initialState: ICasesState = {
    cases: undefined,
};

export default function(
    state: ICasesState = initialState,
    action: CasesActions
): ICasesState {
    switch (action.type) {
        case CasesTypes.CASES_LOADED:
            return {
                ...state,
                cases: action.payload,
            };
        default:
            return state;
    }
}

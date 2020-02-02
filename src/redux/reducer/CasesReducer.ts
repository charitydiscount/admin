import { CasesActions } from '../actions/Cases';
import { CasesTypes } from '../actions/Actions';
import { CharityCase } from '../../models/CharityCase';

export interface ICasesState {
    cases?: CharityCase[];
    currentCase?: CharityCase;
}

const initialState: ICasesState = {
    cases: undefined,
    currentCase: undefined,
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
        case CasesTypes.SET_CURRENT_CASE:
            return {
                ...state,
                currentCase: action.payload,
            };
        default:
            return state;
    }
}

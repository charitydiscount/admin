import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { fetchCases } from '../../rest/CasesService';
import { createAction } from '../helper/ActionHelper';
import { CasesTypes } from './Actions';
import { ActionTypesUnion } from '../helper/TypesHelper';
import { CharityCase } from '../../models/CharityCase';

export const casesActions = {
    casesLoaded: (cases: CharityCase[]) =>
        createAction(CasesTypes.CASES_LOADED, cases),
};
export type CasesActions = ActionTypesUnion<typeof casesActions>;

export const loadCases = () => async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
    const cases = await fetchCases();

    return dispatch(casesActions.casesLoaded(cases));
};

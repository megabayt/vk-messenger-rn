import { takeLatest } from 'redux-saga/effects';

import { setTokenSaga, watchAuth } from '@/store/sagas/auth.saga';
import { apisauceMock } from '@/__mocks__/apisauceMock';
import { setToken, unsetToken, AuthActionTypes } from '@/store/actions/auth.actions';
import { stepper } from '@/utils/tests';

describe('Chat sagas', () => {
  beforeEach(() => {
    // @ts-ignore
    apisauceMock.setToken.mockClear();
  });
  it('should set token', async () => {
    const action = setToken('token');

    setTokenSaga(apisauceMock, action);
    expect(apisauceMock.setToken).toHaveBeenCalledWith('token');
  });

  it('should unset token', async () => {
    const action = unsetToken();

    setTokenSaga(apisauceMock, action);
    expect(apisauceMock.setToken).toHaveBeenCalledWith('');
  });

  test('watch test', () => {
    const step = stepper(watchAuth(apisauceMock));
    expect(step()).toEqual(takeLatest(AuthActionTypes.SetToken, setTokenSaga, apisauceMock));
    expect(step()).toEqual(takeLatest(AuthActionTypes.UnsetToken, setTokenSaga, apisauceMock));
    expect(step()).toBeUndefined();
  });
});

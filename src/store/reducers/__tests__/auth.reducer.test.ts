import { setToken, unsetToken } from '@/store/actions/auth.actions';
import { authReducer, initialAuthState } from '@/store/reducers/auth.reducer';

describe('auth reducer', () => {
  it('should set token', () => {
    const data = 'token';
    const state = authReducer(initialAuthState, setToken(data));
    expect(state.token).toBe(data);
  });

  it('should unset token', () => {
    const data = 'token';
    const state1 = authReducer(initialAuthState, setToken(data));
    const state2 = authReducer(state1, unsetToken());
    expect(state2.token).toBe('');
  });
});

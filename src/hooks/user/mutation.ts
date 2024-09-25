import { useMutation } from 'react-query';

import { Login, SignUp } from '@/services/user';
export const useLogin = () => {
  return useMutation((payload: any) => Login(payload));
};

export function useSignUp() {
  return useMutation((payload: any) => SignUp(payload));
}

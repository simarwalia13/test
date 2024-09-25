import { callApi } from '@/utils/apiutils';
import { Auth } from '@/utils/endpoint/user';

export const Login = async ({ body }: any) => {
  return callApi<any>({
    uriEndPoint: { ...Auth.login.v1 },
    body,
  });
};

export const SignUp = async ({ body }: any) => {
  return callApi<any>({
    uriEndPoint: { ...Auth.signup.v1 },
    body,
  });
};

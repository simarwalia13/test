import { defaults } from '@/utils/endpoint/default';

export const Auth = {
  login: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/auth/login',
    },
  },

  signup: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/auth/signup',
    },
  },
};

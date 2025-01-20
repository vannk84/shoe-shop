import { Auth0Client } from '@auth0/auth0-spa-js';
import eventBus from '~/utils/eventBus';

let auth0Client: Auth0Client | null = null;

export default defineNuxtPlugin(async (nuxtApp) => {
  const config = useRuntimeConfig();

  auth0Client = new Auth0Client({
    domain: config.public.auth0.domain,
    clientId: config.public.auth0.clientId,
    authorizationParams: {
      redirect_uri: window?.location?.origin,
      // redirect_uri: 'http://localhost:3000/auth0/login/callback',
    },
  });

  const saveAuthToStorage = (isAuthenticated: boolean, user: any) => {
    localStorage.setItem('auth_isAuthenticated', JSON.stringify(isAuthenticated));
    localStorage.setItem('auth_user', JSON.stringify(user));
  };

  const getAuthFromStorage = () => {
    const isAuthenticated = JSON.parse(localStorage.getItem('auth_isAuthenticated') || 'false');
    const user = JSON.parse(localStorage.getItem('auth_user') || 'null');
    return { isAuthenticated, user };
  };

  const clearAuthFromStorage = () => {
    localStorage.removeItem('auth_isAuthenticated');
    localStorage.removeItem('auth_user');
  };

  return {
    provide: {
      auth0: {
        login: async () => {
          await auth0Client?.loginWithRedirect();
          const user = await auth0Client?.getUser();
          eventBus.emit('loginSuccess', { user });
        },
        loginWithPopup: async () => {
          try {
            await auth0Client?.loginWithPopup();
            const user = await auth0Client?.getUser();
            const isAuthenticated = !!user;

            saveAuthToStorage(isAuthenticated, user);
            eventBus.emit('loginSuccess', { user });

            return { isAuthenticated, user };
          } catch (error) {
            console.error('Login with Popup Error:', error);
          }
        },
        logout: async () => {
          await auth0Client?.logout({ logoutParams: { returnTo: window.location.origin } });
          clearAuthFromStorage();
        },
        isAuthenticated: async () => {
          return await auth0Client?.isAuthenticated();
        },
        getUser: async () => {
          return await auth0Client?.getUser();
        },
        loadFromStorage: () => getAuthFromStorage(),
      },
    },
  };
});

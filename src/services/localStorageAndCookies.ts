import Cookies from 'js-cookie';

export const saveLoginResponse = (response: any) => {
  saveAccessToken(response.accessToken);
  saveRefreshToken(response.refreshToken, response.expiresAtRefreshToken);
};

//cookies
/**
 *
 * @param response accesstoken itself
 * saves accesstoken in cookie
 */
export function saveAccessToken(response: string) {
  Cookies.set('accessToken', response);
}

/**
 *
 * @returns accesstoken as string
 */
export function getAccessToken(): string {
  const obj = Cookies.get('accessToken');
  if (obj === 'undefined') return '';
  return obj ? obj : '';
}
/**
 *
 * @param response refreshtoken as string
 * @param date expiry of refreshtoken as num in milisec, which is converted to UTC
 * saves in cookie as long as expiry time is greater than now.
 */
export function saveRefreshToken(response: string, date?: any) {
  Cookies.set('refreshToken', response, { expires: new Date(date) });
}

/**
 *
 * @returns refreshtoken as string from cookie
 */
export function getRefreshToken(): string {
  const obj = Cookies.get('refreshToken');
  if (obj === 'undefined') return '';
  return obj ? obj : '';
}

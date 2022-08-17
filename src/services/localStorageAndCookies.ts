import Cookies from 'js-cookie';

/**
 *
 * @param response whole login response obj
 * stores response in localStorage as string
 */

export function saveLoginResponse(response: any) {
  localStorage.setItem('loginResponse', response);
}

/**
 *
 * @returns login response as string
 */
export function getLoginResponse(): any {
  const obj = localStorage.getItem('loginResponse');
  return obj ? obj : '';
}

/**
 *
 * @returns login status from local storage as boolean value
 */
export function getLogStatus(): boolean {
  const logStatus = localStorage.getItem('LogStatus');
  return logStatus ? Boolean(logStatus) : false;
}

/**
 *
 * @param loggedIn Log in response after successful login to server
 * saves boolean as string in local storage
 */
export function setLogStatus(loggedIn: boolean): void {
  if (loggedIn) {
    localStorage.setItem('LogStatus', 'true');
  } else {
    localStorage.setItem('LogStatus', '');
  }
}

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
  return obj ? obj : '';
}

/**
 *
 * @param response refreshtoken as string
 * @param date expiry date of refreshtoken as number
 * saves in cookie
 */
export function saveRefreshToken(response: string, date?: number) {
  Cookies.set('refreshToken', response, { expires: date });
  Cookies.set('expiresAtRefreshToken', date ? date.toString() : '');
}

/**
 *
 * @returns refreshtoken as string from cookie
 */
export function getRefreshToken(): string {
  const obj = Cookies.get('refreshToken');
  return obj ? obj : '';
}

/**
 *
 * @returns expiry time of refreshtoken as number from cookie
 */
export function getExpiresAtRefreshToken(): number {
  const obj = Cookies.get('expiresAtRefreshToken');
  return obj ? +obj : -1;
}

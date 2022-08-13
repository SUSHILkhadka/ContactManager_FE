export function saveLoginResponse(response: string){
    localStorage.setItem('loginResponse',response)
}

export function getLoginResponse(): any {
    const obj = localStorage.getItem('loginResponse');
    return obj ? obj : '';
  }

  export function getLogStatus(): boolean {
    const logStatus = localStorage.getItem('LogStatus');
    return logStatus ? Boolean(logStatus) : false;
  }

  export function setLogStatus(loggedIn: boolean): void {
    if (loggedIn == true) {
      localStorage.setItem('LogStatus', 'true');
    } else {
      localStorage.setItem('LogStatus', '');
    }
  }
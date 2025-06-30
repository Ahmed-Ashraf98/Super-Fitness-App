import { environment } from './../../../../../../../../environments/environment';

export class AuthENDPOINT {
  static LOGIN = `${environment.baseUrl}/api/v1/auth/signin`;
  static REGISER = `${environment.baseUrl}/api/v1/auth/signup`;
  static Change_Password = `${environment.baseUrl}/api/v1/auth/change-password`;
  static DELETE_ACOUNT = `${environment.baseUrl}/api/v1/auth/deleteMe`;
  static EDITE_PROFILE = `${environment.baseUrl}/api/v1/auth/editProfile`;
  static LOGIN_OUT = `${environment.baseUrl}/api/v1/auth/logout`;
  static USER_INFO = `${environment.baseUrl}/api/v1/auth/profile-data`;
  static FORGET_PASSWORD = `${environment.baseUrl}/api/v1/auth/forgotPassword`;
  static VERIFY_RESET_CODE = `${environment.baseUrl}/api/v1/auth/verifyResetCode`;
  static RESET_PASSWORD = `${environment.baseUrl}/api/v1/auth/resetPassword`;
}

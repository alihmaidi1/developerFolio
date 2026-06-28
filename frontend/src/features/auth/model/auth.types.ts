export interface AdminLoginRequest {
  email: string;
  password: string;
}

export interface AdminSession {
  id: string;
  email: string;
}

export interface AdminLoginResponse extends AdminSession {
  accessToken: string;
}

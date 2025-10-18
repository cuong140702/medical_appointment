export interface AccessTokenPayloadCreate {
  id: number;
  name: string;
  email: string;
  phone: string;
  roleId: number;
  roleName: string;
}

export interface AccessTokenPayload extends AccessTokenPayloadCreate {
  exp: number;
  iat: number;
}

export interface RefreshTokenPayloadCreate {
  id: number;
}

export interface RefreshTokenPayload extends RefreshTokenPayloadCreate {
  exp: number;
  iat: number;
}

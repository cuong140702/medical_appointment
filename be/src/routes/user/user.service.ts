import { HttpException, Injectable } from '@nestjs/common';
import { UserRepo } from 'src/routes/user/user.repo';
import { GetUsersQueryType, LoginBodyType } from 'src/routes/user/user.model';
import { HashingService } from 'src/shared/services/hashing.service';
import { TokenService } from 'src/shared/services/token.service';
import { AccessTokenPayloadCreate } from 'src/shared/types/jwt.type';

@Injectable()
export class UserService {
  constructor(
    private userRepo: UserRepo,
    private readonly hashingService: HashingService,
    private readonly tokenService: TokenService,
  ) {}

  list(pagination: GetUsersQueryType) {
    return this.userRepo.list(pagination);
  }

  async generateTokens({
    id,
    name,
    email,
    phone,
    roleId,
    roleName,
  }: AccessTokenPayloadCreate) {
    const [accessToken, refreshToken] = await Promise.all([
      this.tokenService.signAccessToken({
        id,
        name,
        email,
        phone,
        roleId,
        roleName,
      }),
      this.tokenService.signRefreshToken({
        id,
      }),
    ]);
    const decodedRefreshToken =
      await this.tokenService.verifyRefreshToken(refreshToken);
    await this.userRepo.createRefreshToken({
      refreshToken,
      userId: id,
      expiredAt: new Date(decodedRefreshToken.exp * 1000),
    });
    return { accessToken, refreshToken };
  }

  async login(body: LoginBodyType) {
    // 1. Lấy thông tin user, kiểm tra user có tồn tại hay không, mật khẩu có đúng không
    const user = await this.userRepo.findUniqueUserIncludeRole({
      email: body.email,
    });
    if (!user) {
      throw new Error('Không tìm thấy người dùng với email đã cung cấp.');
    }

    const isPasswordMatch = await this.hashingService.compare(
      body.password,
      user.password,
    );
    if (!isPasswordMatch) {
      throw new Error('Mật khẩu không chính xác. Vui lòng thử lại.');
    }

    // 4. Tạo mới accessToken và refreshToken
    const tokens = await this.generateTokens({
      id: user.id,
      email: user.email,
      phone: user.phone as string,
      name: user.name,
      roleId: user.roleId,
      roleName: user.role.name,
    });

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      user: {
        id: user.id,
        email: user.email,
        phone: user.phone,
        name: user.name,
        roleId: user.roleId,
        role: user.role?.name,
      },
    };
  }
}

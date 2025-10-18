import { Injectable } from '@nestjs/common';
import { GetUsersQueryType, GetUsersResType } from 'src/routes/user/user.model';
import { RoleType } from 'src/shared/models/shared-role.model';
import { UserType } from 'src/shared/models/shared-user.model';
import { PrismaService } from 'src/shared/services/prisma.service';

export type WhereUniqueUserType = { id: number } | { email: string };

@Injectable()
export class UserRepo {
  constructor(private prismaService: PrismaService) {}

  async list(pagination: GetUsersQueryType): Promise<GetUsersResType> {
    const skip = (pagination.page - 1) * pagination.limit;
    const take = pagination.limit;

    const [totalItems, data] = await Promise.all([
      this.prismaService.user.count({
        where: {
          deletedAt: null,
        },
      }),
      this.prismaService.user.findMany({
        skip,
        take,
        where: {
          deletedAt: null,
        },
        include: {
          role: true,
        },
      }),
    ]);

    return {
      data,
      totalItems,
      page: pagination.page,
      limit: pagination.limit,
      totalPages: Math.ceil(totalItems / pagination.limit),
    };
  }

  createRefreshToken(data: {
    refreshToken: string;
    userId: number;
    expiredAt: Date;
  }) {
    return this.prismaService.refreshToken.create({
      data,
    });
  }

  async findUniqueUserIncludeRole(
    where: WhereUniqueUserType,
  ): Promise<(UserType & { role: RoleType }) | null> {
    return this.prismaService.user.findFirst({
      where: {
        ...where,
        deletedAt: null,
      },
      include: {
        role: true,
      },
    });
  }
}

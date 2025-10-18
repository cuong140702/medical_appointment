import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import CustomZodValidationPipe from './shared/pipes/custom-zod-validation.pipe';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';
import { CustomZodSerializerInterceptor } from './shared/interceptor/transform.interceptor';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './routes/user/user.module';

@Module({
  imports: [SharedModule, UserModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: CustomZodValidationPipe,
    },
    { provide: APP_INTERCEPTOR, useClass: CustomZodSerializerInterceptor },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}

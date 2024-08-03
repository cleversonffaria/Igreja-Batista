import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validateEnv } from '@config/env/validation';
import configDbEnv from '@config/env/config_db.env';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberModule } from '@app/member/member.module';
import { PermissionModule } from '@app/permission/permission.module';
import { RoleModule } from '@app/role/role.module';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { CashflowModule } from './cashflow/cashflow.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            validate: validateEnv,
            load: [configDbEnv],
            cache: true,
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get<string>('DB_HOST'),
                port: configService.get<number>('DB_PORT'),
                username: configService.get<string>('DB_USERNAME'),
                password: configService.get<string>('DB_PASSWORD'),
                database: configService.get<string>('DB_DATABASE'),
                autoLoadEntities: true,
                synchronize: true,
            }),
            inject: [ConfigService],
        }),
        CoreModule,
        MemberModule,
        PermissionModule,
        RoleModule,
        AuthModule,
        CashflowModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        // {
        //     provide: APP_GUARD,
        //     useClass: JwtAuthGuard,
        // },
    ],
})
export class AppModule {}

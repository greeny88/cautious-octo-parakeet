import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { FirebaseService } from './firebase.service';

@Module({
  imports: [
    // AuthModule,
    ConfigModule.forRoot({ 
      // envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
      isGlobal: true 
    }),
    // TypeOrmModule.forRootAsync({
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => ({
    //     type: 'postgres',
    //     host: configService.get<string>('DATABASE_HOST'),
    //     port: configService.get<number>('DATABASE_PORT'), // Optional?
    //     username: configService.get<string>('DATABASE_USER'),
    //     password: configService.get<string>('DATABASE_PASSWORD'),
    //     database: configService.get<string>('DATABASE_NAME'),
    //     autoLoadEntities: true, // What is the purpose of this option?
    //     synchronize: process.env.NODE_ENV !== 'production', // Set to false in production
    //     extra: process.env.NODE_ENV === 'production' ? {
    //       socketPath: configService.get<string>('DB_HOST'),
    //     } : {},
    //   }),
    // }),
  ],
  controllers: [AppController],
  providers: [AppService, FirebaseService],
})
export class AppModule {}

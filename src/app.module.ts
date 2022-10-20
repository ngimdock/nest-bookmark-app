import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { ConfigModule } from '@nestjs/config';
import { Neo4jModule } from './neo4j/neo4j.module';
import { UserModule } from './domain/nodes/user/user.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    Neo4jModule.forRootAsync(),
    UserModule,
    BookmarkModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
  ],
})
export class AppModule {}

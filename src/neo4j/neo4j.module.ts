import { DynamicModule, Module } from '@nestjs/common';
import { Neo4jService } from './neo4j.service';
import { Neo4jConfig } from './interfaces/neo4j-config.interface';
import { NEO4J_CONFIG, NEO4J_CONNECTION } from './neo4j.constants';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  createDatabaseConfig,
  createDatabaseConnection,
} from './utils/neo4j.utils';

@Module({})
export class Neo4jModule {
  static forRootAsync(customConfig?: Neo4jConfig): DynamicModule {
    return {
      module: Neo4jModule,
      imports: [ConfigModule],
      global: true,
      providers: [
        {
          provide: NEO4J_CONFIG,
          inject: [ConfigService],
          useFactory: (configService: ConfigService) =>
            customConfig || createDatabaseConfig(configService),
        },

        {
          provide: NEO4J_CONNECTION,
          inject: [NEO4J_CONFIG],
          useFactory: async (config: Neo4jConfig) =>
            await createDatabaseConnection(config),
        },
        Neo4jService,
      ],

      exports: [NEO4J_CONNECTION, Neo4jService],
    };
  }
}

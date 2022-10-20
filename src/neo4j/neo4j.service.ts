import { Injectable, OnApplicationShutdown, Inject } from '@nestjs/common';
import { Connection } from 'cypher-query-builder';
import { NEO4J_CONFIG, NEO4J_CONNECTION } from './neo4j.constants';

@Injectable()
export class Neo4jService implements OnApplicationShutdown {
  constructor(
    @Inject(NEO4J_CONNECTION) private readonly connection: Connection,
  ) {}

  /**
   * close the connection to the database when the application shutdown
   */
  onApplicationShutdown() {
    this.connection.close();
  }

  /**
   * create the connection to the database
   */
  initQuery() {
    return this.connection.query();
  }
}

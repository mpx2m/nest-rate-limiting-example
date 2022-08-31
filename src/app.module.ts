import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo"
import { Module } from "@nestjs/common"
import { GraphQLModule } from "@nestjs/graphql"
import { AppController } from "./app.controller"
import { AppResolver } from "./app.resolver"
import { join } from "path"
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageDisabled,
} from "apollo-server-core"
import { ThrottlerModule } from "@nestjs/throttler"
import { GqlThrottlerGuard } from "./gql-throttler.guard"
import { APP_GUARD } from "@nestjs/core"

@Module({
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: GqlThrottlerGuard,
    },
  ],
  imports: [
    AppResolver,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
      sortSchema: true,
      debug: false,
      playground: false,
      plugins: [
        process.env.NODE_ENV === "production"
          ? ApolloServerPluginLandingPageDisabled()
          : ApolloServerPluginLandingPageLocalDefault(),
      ],
      context: ({ req, res }) => ({ req, res }),
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
  ],
})
export class AppModule {}

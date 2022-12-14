import { ExecutionContext, Injectable } from "@nestjs/common"
import { GqlExecutionContext } from "@nestjs/graphql"
import { ThrottlerGuard } from "@nestjs/throttler"

@Injectable()
export class GqlThrottlerGuard extends ThrottlerGuard {
  getRequestResponse(context: ExecutionContext) {
    const gqlCtx = GqlExecutionContext.create(context)
    const ctx = gqlCtx.getContext()

    if (gqlCtx.getType() === "graphql") {
      return { req: ctx.req, res: ctx.res }
    }

    return super.getRequestResponse(context)
  }

  protected getTracker(req: Record<string, any>): string {
    return req.ips.length ? req.ips[0] : req.ip // individualize IP extraction to meet your own needs
  }
}

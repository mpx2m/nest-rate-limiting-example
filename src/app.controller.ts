import { Controller, Get } from "@nestjs/common"

@Controller("test")
export class AppController {
  @Get()
  getVersion(): string {
    return "test"
  }
}

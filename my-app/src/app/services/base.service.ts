import { PLATFORM_ID, inject } from "@angular/core";
import { Config } from "./config";
import { HttpClient } from "@angular/common/http";
import { isPlatformBrowser } from "@angular/common";

export class BaseService {
  protected readonly baseUrl = Config.API_URL;
  protected readonly http = inject(HttpClient);
  protected readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
}
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { GlobalService } from "./global.service";

@Injectable()
export class LoginActivate implements CanActivate {
  constructor(private globalService: GlobalService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean>|Promise<boolean>|boolean {
    if (!this.globalService.loggedIn) {
      this.router.navigate(['/']);
    }
    return true;
  }
}

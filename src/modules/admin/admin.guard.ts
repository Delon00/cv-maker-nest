import { CanActivate, ExecutionContext, Injectable, UnauthorizedException  } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log('AdminGuard user:', user);

    if (!user || user.plan !== 'admin') {
      throw new UnauthorizedException('Access denied. Admins only.');
    }

    return true;
  }
}

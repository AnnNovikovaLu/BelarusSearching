import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { User } from 'src/user/user.model';

@Injectable()
export class VerifiedUserGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const user: User = req.user;

    if (!user) {
      throw new ForbiddenException('User not found.');
    }

    const isVerified = await User.findByPk(user.id, {
      include: ['verification'],
    });

    if (!isVerified || !isVerified.verification) {
      throw new ForbiddenException('User is not verified.');
    }

    return true;
  }
}

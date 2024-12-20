import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { UserService } from '../services/user.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const userService = inject(UserService)

  const isLogued = await firstValueFrom(userService.observeCurrentUser())

  if(isLogued){
    return true;
  }else{
    router.navigate(['auth']);
    return false;
  }
};

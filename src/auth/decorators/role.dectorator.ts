import { SetMetadata } from '@nestjs/common';

export const Roles = (role: string) => SetMetadata('role', role);
export const isPublic = (isPublic: boolean) =>
  SetMetadata('isPublic', isPublic);

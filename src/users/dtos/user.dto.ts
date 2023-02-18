import { Expose, Transform } from 'class-transformer';

export class PublicUserDto {
  @Expose()
  id: number;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  email: string;

  @Expose()
  phone: string;

  @Expose()
  photoPath: string;

  @Expose()
  createdAt: Date;

  @Expose()
  active: boolean;
}

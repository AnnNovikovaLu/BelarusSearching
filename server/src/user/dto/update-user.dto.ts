export interface UpdateUserDto {
  readonly name?: string;
  readonly surname?: string;
  readonly email?: string;
  readonly password?: string;
  readonly oldPassword?: string;
}

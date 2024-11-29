export interface DecodedToken {
  id: number;
  email: string;
  role: string;
  surname?: string;
  name?: string;
  imagePath?: string;
}

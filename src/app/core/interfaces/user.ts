export interface User {
  id?: number; // Long in Java diventa number in TypeScript
  surname: string; // String in Java diventa string in TypeScript
  name: string; // String in Java diventa string in TypeScript
  role?: string; // String in Java, opzionale
  email: string; // String in Java diventa string in TypeScript
  password: string; // String in Java diventa string in TypeScript
  imagePath?: string; // String in Java, opzionale
}

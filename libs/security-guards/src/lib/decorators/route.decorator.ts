import { SetMetadata } from '@nestjs/common';

// Define o decorador para verificar a rota
export const Route = (route: string) => SetMetadata('route', route);

import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  /**
   * Retorna el estado actual de la aplicación.
   * @returns Un objeto con el estado ('OK') y la hora actual en formato ISO.
   */
  getStatus(): { status: string; time: Date | string } {
    return { status: 'OK', time: new Date().toISOString() };
  }
}

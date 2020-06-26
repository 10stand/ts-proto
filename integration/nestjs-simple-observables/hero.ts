import { Observable } from 'rxjs';
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';


export interface HeroById {
  id: number;
}

export interface VillainById {
  id: number;
}

export interface Hero {
  id: number;
  name: string;
}

export interface Villain {
  id: number;
  name: string;
}

export interface DataLoaders {

  getDataLoader<T>(identifier: string, constructorFn: () => T): T;

}

export interface HeroServiceController<Context extends DataLoaders> {

  findOneHero(request: HeroById, ctx?: Context): Observable<Hero>;

  findOneVillain(request: VillainById, ctx?: Context): Observable<Villain>;

  findManyVillain(request: Observable<VillainById>, ctx?: Context): Observable<Villain>;

}

export interface HeroServiceClient<Context extends DataLoaders> {

  findOneHero(request: HeroById, ctx?: Context): Observable<Hero>;

  findOneVillain(request: VillainById, ctx?: Context): Observable<Villain>;

  findManyVillain(request: Observable<VillainById>, ctx?: Context): Observable<Villain>;

}

export function HeroServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['findOneHero', 'findOneVillain'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod('HeroService', method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = ['findManyVillain'];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod('HeroService', method)(constructor.prototype[method], method, descriptor);
    }
  }
}

export const HERO_PACKAGE_NAME = 'hero'
export const HERO_SERVICE_NAME = 'HeroService';
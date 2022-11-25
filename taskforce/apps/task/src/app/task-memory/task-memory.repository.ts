import { CRUDRepositoryInterface } from '@taskforce/core';

export class TaskMemoryRepository implements CRUDRepositoryInterface<any, string, any> {
  create(item: any): Promise<any> {
    throw new Error('Method not implemented.');
  }
  findById(id: string): Promise<any> {
    throw new Error('Method not implemented.');
  }
  update(id: string, item: any): Promise<any> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

}

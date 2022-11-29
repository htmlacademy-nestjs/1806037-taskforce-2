// the abbreviation 'E' from the word 'Entity'

export  interface CRUDRepositoryInterface<E, I, R> {
  create(item: E): Promise<R | null>;
  findById(id: I): Promise<R>;
  update(id: I, item: E): Promise<R>;
  delete(id: I): Promise<void>;
}

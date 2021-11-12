export interface IHashGeneratorService {
    CreateHash<T>(data: T, salt :string): string
}

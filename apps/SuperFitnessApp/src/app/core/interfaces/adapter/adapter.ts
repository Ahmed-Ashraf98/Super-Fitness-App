export interface IAdapter<TInput, TOutput> {
    adaptSuccess(response: TInput): TOutput;
    adaptError(error: TInput): TOutput;
}
export enum HTTPMethod {
  GET = 'GET',
  POST = 'POST',
}

export type RequestParams<ReqT> = {
  method: HTTPMethod;
  endpoint: string;
  headers: Record<string, string>;
  /**
   * Объект с данными запроса.
   * - Для GET-запроса данные превращаются в query-строку и добавляются в endpoint
   * - Для POST-запроса данные преобразуются к формату JSON и добавляются в тело запроса (необязательное требование)
   */
  data: ReqT;
};

// Перечисление статусов ответа
export enum StatusHTTP {
  status200 = 200,
  status201 = 201,
  status300 = 300,
  status304 = 304,
  status400 = 400,
  status401 = 401,
  status403 = 403,
  status404 = 404,
  status422 = 422,
  UNEXPECTED_ERROR = 'UNEXPECTED ERROR',
}

// Ответ API
export type ApiResponse<SuccessT, MetaT, ErrorT> =
  | {
      success: true;
      data: SuccessT;
      meta: MetaT;
      status: StatusHTTP;
    }
  | {
      success: false;
      data: ErrorT;
      meta: MetaT;
      status: StatusHTTP;
    }
  | {
      success: false;
      data: null;
      meta: null;
      status: StatusHTTP;
    };

export interface IApiStore {
  readonly baseUrl: string;

  request<
    SuccessT,
    ErrorT = unknown,
    MetaT = unknown,
    ReqT = Record<string, unknown>,
  >(
    params: RequestParams<ReqT>
  ): Promise<ApiResponse<SuccessT, MetaT, ErrorT>>;
}

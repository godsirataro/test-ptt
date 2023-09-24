export class ResponseResult<T> {
  isSuccess = false;
  error?: string;
  errors?: string[];
  status = 400;
  data?: T | string;

  static success<T>(data?: T): ResponseResult<T> {
    return { data, isSuccess: true, status: 200 };
  }

  static fail<T>(data?: T, status = 400): ResponseResult<T> {
    return { data, isSuccess: false, status };
  }

  static failWithErrors(errors: string[]): ResponseResult<string[]> {
    return { errors, isSuccess: false, status: 400 };
  }

  static failWithError(error: string, status = 500): ResponseResult<null> {
    return { error, isSuccess: false, status };
  }

  static unAuthorized<T>(): ResponseResult<T> {
    return { isSuccess: false, status: 401 };
  }
}

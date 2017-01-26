import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

import 'rxjs/add/operator/map';

type customServerResponseObject = { 'statusCode': boolean | number, 'statusDesc': any };

@Injectable()
export class HttpService {

  constructor(public http: Http) { }

  GetHeaders() {
    let headers: Headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options: RequestOptions = new RequestOptions();
    options.headers = headers;
    return options;
  }

  ResponseMap(res: Response) {
    let response: customServerResponseObject = res.json();
    if (response && response.hasOwnProperty('statusCode')) {
      return response;
    } else {
      return {
        statusCode: false,
        statusDesc: response,
      };
    }
  }

  get(url: string) {
    return this.http.get(url).map(this.ResponseMap);
  }

  post(url: string, obj: Object) {
    return this.http.post(url, JSON.stringify(obj), this.GetHeaders()).map(this.ResponseMap);
  }

  put(url: string, obj: Object) {
    return this.http.put(url, JSON.stringify(obj), this.GetHeaders()).map(this.ResponseMap);
  }

  PutRequestS3(url: string, obj: Object) {
    let headers: Headers = new Headers();
    headers.append('x-amz-acl', 'public-read');
    let options: RequestOptions = new RequestOptions();
    options.headers = headers;

    return this.http.put(url, obj, options);

  }

  delete(url: string) {
    return this.http.delete(url).map((this.ResponseMap));
  }

}
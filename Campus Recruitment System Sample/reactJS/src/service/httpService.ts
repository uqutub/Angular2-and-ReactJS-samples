import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/dom/ajax';

// https://xgrommx.github.io/rx-book/content/rxjs_bindings/dom/index.html#rxdomrequestgetjsonurl
// https://github.com/ReactiveX/rxjs/blob/master/src/observable/dom/AjaxObservable.ts

export class HttpService {

    // responseType: 'text' or 'json'
    // headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8' or 'application/json'

    // headers: Object = { 'Content-Type': 'application/json' }

    static get(url: string, headers: Object = null): Observable<any> {
        return Observable.ajax({
            url,
            method: 'GET',
            async: true,
            crossDomain: true,
            responseType: 'json',
            createXHR: () => new XMLHttpRequest()
        });
    } // get

    static post(url: string, body: any, headers = { 'Content-Type': 'application/json' }): Observable<any> {
        return Observable.ajax({
            url,
            method: 'POST',
            body,
            headers,
            async: true,
            crossDomain: true,
            responseType: 'json',
            createXHR: () => new XMLHttpRequest()
        });
    } // post

    static put(url: string, body: Object, headers: Object = null): Observable<any> {
        // return Observable.ajax.put(url, body, headers);
        return Observable.ajax({
            url,
            method: 'PUT',
            body,
            async: true,
            // responseType: 'json',
            crossDomain: true,
            createXHR: () => new XMLHttpRequest()
        });
    } // put

    static delete(url: string, body?: { id: string | number }, headers: Object = null): Observable<any> {
        return Observable.ajax({
            url,
            method: 'DELETE',
            body,
            async: true,
            crossDomain: true,
            createXHR: () => new XMLHttpRequest()
        });
    } // delete
}
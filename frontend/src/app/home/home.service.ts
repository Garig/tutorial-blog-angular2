import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class HomepageService {

  constructor(private http: Http) {}

  getBlogPosts(): Observable<any> {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth_token'));

    return this.http.get('http://localhost:8080/Plone/blog', { headers })
    .map(res => res.json().items)
    .map(res => {
      return res.map(function(item) {
        var parts = item['@id'].split('/');
        item.postId = parts[parts.length - 1];
        return item;
      })
    })
  }

  postBlogPosts(title, description, text): Observable<any> {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth_token'));

    return this.http.post(
      'http://localhost:8080/Plone/blog',
      JSON.stringify({
        '@type': 'Document',
        'title': title,
        'text': text,
        'description': description,
      }),
      { headers })
    .map(res => res.json())
    .map((res) => {
      return true;
    });
  }
}

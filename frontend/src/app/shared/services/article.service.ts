import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ArticleType} from "../../../types/article.type";
import {environment} from "../../../environments/environment";
import {ActiveParamTypes} from "../../../types/active-param.type";
import {ArticlesType} from "../../../types/articles.type";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

  getArticlePopular(): Observable<ArticleType[]>{
    return this.http.get<ArticleType[]>(environment.api + 'articles/top');
  }

  public getArticles(params: ActiveParamTypes): Observable<ArticlesType> {
    return this.http.get<ArticlesType>(environment.api + 'articles', {params: params})

  }

  public getArticle(url: string): Observable<ArticleType> {
    return this.http.get<ArticleType>(environment.api + 'articles' + '/' + url);
  }

  public getArticleRelated(url: string): Observable<ArticleType[]> {
    return this.http.get<ArticleType[]>(environment.api + 'articles/related' + '/' + url);
  }
}

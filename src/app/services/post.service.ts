import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post';
import { Interactions } from '../models/interactions';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private baseUrl='http://localhost:9000/post'

  constructor(private http:HttpClient) { }
  getPostList(): Observable<any> {  
    return this.http.get(`${this.baseUrl}`+'/getAllPosts');  
  }  

  
  createPost(postData: any): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post(`${this.baseUrl}`+'/addPost', postData, { headers });
  }
  
  deletePost(id: string): Observable<any> {  
    return this.http.delete(`${this.baseUrl}/deletePost/${id}`, { responseType: 'text' });  
  }  
  getPost(id: string): Observable<Post> {  
    return this.http.get<Post>(`${this.baseUrl}/getDetailsPost/${id}`);  
  }  
 
  getComment(id: string): Observable<Interactions> {
    return this.http.get<Interactions>(`${this.baseUrl}/getinteractions/${id}`);
  }
  
  
  updatePost(id: string, post: Post): Observable<Object> {  
    return this.http.put(`${this.baseUrl}/modifierPost/${id}`, post);  
  }  
  uploadPhoto(idPost: string, formData: FormData) {
    return this.http.post(`http://localhost:9000/post/upload/${idPost}`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }
  
  downloadFile(fileName: string): Observable<Blob> {
    const url = `${this.baseUrl}/download/${fileName}`;
    return this.http.get(url, { responseType: 'blob' });
  }

  getPhoto(photo: string): string{
    const photoUrl = `${this.baseUrl}/download/${photo}`;

    return `${this.baseUrl}/download/${photo}`;
  }
  addComment(id: string,comment: any): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post(`${this.baseUrl}`+`/addinteraction/${id}`, comment, { headers });
  }
  addReply(id: string,reply: any): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post(`${this.baseUrl}`+`/addReponse/${id}`, reply, { headers });
  }
  approveBlog(id: string): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.put(`${this.baseUrl}`+`/approveBlog/${id}`,{ headers });
  }
  approveAllBlogs(): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.put(`${this.baseUrl}`+`/approveAll`,{ headers });
  }
  getReplies(interactionId: string): Observable<Interactions[]> {
    const url = `${this.baseUrl}/getReplies/${interactionId}`;
    return this.http.get<Interactions[]>(url);
  }
    

}


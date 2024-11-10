import { Component } from '@angular/core';
import { Post } from '../models/post';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { PostService } from '../services/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-post-update',
  templateUrl: './post-update.component.html',
  styleUrls: ['./post-update.component.css']
})
export class PostUpdateComponent {
  post!: Post;
  filteredPosts: Post[] = [];  // Define filteredPosts as an array of Post
  feedback: any = {};
  public Editor = ClassicEditor as any;

  constructor(private postService: PostService, private route: ActivatedRoute, private router: Router,
              private http: HttpClient) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
        const idPost = params['id'];
        if (idPost) {
            this.postService.getPost(idPost).subscribe({
                next: post => {
                    this.post = post;
                    this.post.idPost = idPost; // Ensure `idPost` is defined in `post`
                    this.filteredPosts = [post];  // Assuming you're showing only one post here

                },
                error: () => {
                    this.feedback = { type: 'warning', message: 'Error loading' };
                }
            });
        } else {
            this.post = new Post(); // Default for new posts
        }
    });
}

  save() {
    const id = this.post.idPost;

    this.postService.updatePost(id, this.post).subscribe({
      next: () => {
        this.feedback = { type: 'success', message: 'Save was successful!' };
        setTimeout(async () => {
          await this.router.navigate(['/listPost']);
        }, 1000);
      },
      error: () => {
        this.feedback = { type: 'error', message: 'Error saving' };
      }
    });
  }

  async cancel() {
    await this.router.navigate(['/listPost']);
  }

    // Add navigateToUpdate method here
    navigateToUpdate(idPost: string) {
      this.router.navigate(['/updatePost', idPost]);
    }
  
    getPostPhotoUrl(post: Post): string {
      return `path/to/your/images/${post.photo}`; // Replace with your actual image path logic
    }
}







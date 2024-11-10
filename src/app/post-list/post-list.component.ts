import { Component, OnInit } from '@angular/core';
import { Post } from '../models/post';
import { PostService } from '../services/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit{
  posts: Post[] = [];
  filteredPosts: Post[] = [];
  searchInput: string = '';
  sortBy: keyof Post = 'idPost';

  constructor(private postService: PostService, private router: Router) { }

  ngOnInit(): void {
    this.fetchPosts();
  }
  fetchPosts(): void {
    this.postService.getPostList()
      .subscribe({
        next: (posts) => {
          this.posts = posts;
          this.filteredPosts = this.posts;
          this.sortPosts();
        },
        error: (error) => {
          console.error(error);
        }
      });
  }
  sortPosts(): void {
    // Sort the posts array based on the selected field and direction
    this.posts.sort((a, b) => {
      if (a[this.sortBy] < b[this.sortBy]) {
        return 1;
      } else if (a[this.sortBy] > b[this.sortBy]) {
        return -1;
      } else {
        return 0;
      }
    });
  }
  
  // Update the sorting field and call sortPosts
  onSortChange(): void {
    this.sortPosts();
  }
  getPostPhotoUrl(post: Post): string {
    return this.postService.getPhoto(post.photo);
  }
  deletePost(post: Post): void {

    this.postService.deletePost(post.idPost).subscribe(() => {

      this.posts = this.posts.filter((b) => b.idPost !== post.idPost);
    });
    this.fetchPosts();
  }
  navigateToUpdate(idPost: string): void {
    this.router.navigate(['/updatePost/', idPost]);
  }
  navigateToAddPost() {
    this.router.navigate(['/addPost']);
  }
 
  onSearch(): void {
    this.filteredPosts = this.posts.filter(post =>
      post.datePost?.toLowerCase().includes(this.searchInput.toLowerCase())
    );
    console.log('Filtered Posts:', this.filteredPosts);
  }
}


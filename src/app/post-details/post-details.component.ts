import { Component, OnInit } from '@angular/core';
import { Interactions } from '../models/interactions';
import { PostService } from '../services/post.service';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../models/post';
import { FormBuilder, FormGroup } from '@angular/forms';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';



@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  Postsaveform: FormGroup;
  public Editor = ClassicEditor; // CKEditor instance

  constructor(private fb: FormBuilder,private postService: PostService, private route: ActivatedRoute) {
    // Initialize the form
    this.Postsaveform = this.fb.group({
      content: [''] // Form control for the CKEditor content
    });
  }
  post: Post | undefined;
  comments: Interactions[] = [];
 
  interaction: Interactions = {
    id: '',
    commentaire: '',
    replay: [],
  };
  submitted = false;
  replies: Interactions[] = [];
  currentCommentId: string | null = null;
  replyText: string = '';
  showReplyInput: { [key: string]: boolean } = {};
  currentCommentReplies: Interactions[] = [];
  badWordsList = ['badword1', 'badword2', 'badword3'];





  ngOnInit(): void {
    this.getPostById();
    this.getCommentaires();
    // this.getRepliesForComment(this.currentCommentId!);


  }

  getPostPhotoUrl(photoName: any): string {
    // Assuming getPhotoUrl is a method in your PostService
    return this.postService.getPhoto(photoName);
  }

  getPostById(): void {
    const postId = this.route.snapshot.paramMap.get('id');
    if (postId) {
      this.postService.getPost(postId).subscribe(
        (post) => {
          this.post = post;
          this.getCommentaires();
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
  getCommentaires(): void {
    const postId = this.route.snapshot.paramMap.get('id');

    if (postId) {
      this.postService.getComment(postId).subscribe(
        (comments) => {
          this.comments = Array.isArray(comments) ? comments : [];

          console.log(this.comments);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  

  // New method to check for bad words in a comment
  containsBadWords(comment: string): boolean {
    const lowerCaseComment = comment.toLowerCase();
    return this.badWordsList.some(badWord => lowerCaseComment.includes(badWord));
  }



  getRepliesForComment(commentId: string): void {
    if (commentId) {
      this.postService.getReplies(commentId).subscribe(
        (replies) => {
          this.currentCommentReplies = Array.isArray(replies) ? replies : [];
          console.log("hedhy" + this.currentCommentReplies);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
  
 

  addInteraction(): void {
    const postId = this.route.snapshot.paramMap.get('id');
    if (postId) {
        // Check for bad words in the comment before proceeding
        if (this.containsBadWords(this.interaction.commentaire)) {
            const confirmDialog = window.confirm('Warning: The comment contains inappropriate language.');
            if (!confirmDialog) return;
        }

        this.postService.addComment(postId, this.interaction).subscribe(
            (response) => {
                console.log('Interaction ajoutée avec succès', response);
                this.interaction.commentaire = ''; // Clear the comment field after successful submission
                this.getCommentaires(); // Refresh comments list
            },
            (error) => {
                console.error('Erreur lors de l\'ajout de l\'interaction', error);
            }
        );
    }
}

addReply(commentId: string): void {
    if (commentId && this.replyText.trim() !== '') { // Check if reply text is not empty
        const reply: Interactions = {
            id: '', // Set ID if necessary, or allow backend to generate it
            commentaire: this.replyText,
            replay: [],
        };

        this.postService.addReply(commentId, reply).subscribe(
            (response) => {
                console.log('Réponse ajoutée avec succès', response);
                this.replyText = ''; // Clear the reply text after adding
                this.getCommentaires(); // Refresh comments list including replies
            },
            (error) => {
                console.error('Erreur lors de l\'ajout de la réponse', error);
            }
        );
    }
}

toggleReplyInput(commentId: string): void {
    this.showReplyInput[commentId] = !this.showReplyInput[commentId];
    this.currentCommentId = this.showReplyInput[commentId] ? commentId : null;
}
savePost(): void {
  // Save post logic here
  console.log(this.Postsaveform.value);
}
}





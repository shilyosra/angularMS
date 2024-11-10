import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostDetailsComponent } from './post-details/post-details.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostAddComponent } from './post-add/post-add.component';
import { PostUpdateComponent } from './post-update/post-update.component';



const routes: Routes = [
  
  { path: "addPost", component: PostAddComponent },
  { path: "listPost", component: PostListComponent },
  { path: "upload/:id", component: UploadFileComponent },
  { path: "updatePost/:id", component: PostUpdateComponent },
  { path: "detailsPost/:id", component: PostDetailsComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

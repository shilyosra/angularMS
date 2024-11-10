import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { PostListComponent } from './post-list/post-list.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { RouterModule } from '@angular/router';
import { PostUpdateComponent } from './post-update/post-update.component';
import { PostAddComponent } from './post-add/post-add.component';

@NgModule({
  declarations: [
    AppComponent,
    UploadFileComponent,
    PostDetailsComponent,
    PostListComponent,
    PostUpdateComponent,
    PostAddComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

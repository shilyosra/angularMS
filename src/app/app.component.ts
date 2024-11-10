import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup } from '@angular/forms';

import { Router } from '@angular/router';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Post } from './models/post';
import { PostService } from './services/post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  
}
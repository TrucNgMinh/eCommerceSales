import { Component, OnInit } from '@angular/core';
import { Blog } from 'src/app/models/blog.model';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css']
})
export class NewsDetailComponent implements OnInit {

  blog: Blog = new Blog();
  
  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { Blog } from 'src/app/models/blog.model';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  blogs: Blog[] = [];

  constructor(
    private blogService: BlogService
  ) { }

  ngOnInit(): void {
    this.getBlogs();
  }

  getBlogs():void {
    this.blogService.getBlogs().subscribe((res) => {
      this.blogs = res;
    })
  }

}

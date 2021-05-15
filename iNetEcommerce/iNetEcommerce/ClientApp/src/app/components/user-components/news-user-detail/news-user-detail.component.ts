import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Blog } from 'src/app/models/blog.model';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-news-user-detail',
  templateUrl: './news-user-detail.component.html',
  styleUrls: ['./news-user-detail.component.css']
})
export class NewsUserDetailComponent implements OnInit {

  blogId: number = 0;
  blogModel: Blog = new Blog(this.blogId);

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getQueryParams();
  }

  getBlog(blodId: number): void {
      this.blogService.getBlogById(blodId).subscribe((res)=> {
        this.blogModel = res;
      })
  }

  getQueryParams(): void {
    this.route.params.subscribe(params => {

      this.blogId = +params['id'];

      if (this.blogId> 0) {
        this.getBlog(this.blogId);
      }
    });
  }
}

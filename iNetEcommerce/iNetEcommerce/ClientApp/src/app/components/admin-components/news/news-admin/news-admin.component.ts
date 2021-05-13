import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs-compat';
import { datatableLanguageOptions } from 'src/app/app.constants';
import { Blog } from 'src/app/models/blog.model';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-news-admin',
  templateUrl: './news-admin.component.html',
  styleUrls: ['./news-admin.component.css']
})
export class NewsAdminComponent implements OnInit, OnDestroy {
  
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  blogs : Blog[] = [];

  constructor(private blogService: BlogService) { }
  
  ngOnDestroy(): void {

    this.dtTrigger.unsubscribe();

  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      paging: true,
      language: datatableLanguageOptions,
    };

    this.getBlogs(true);
  }

  getBlogs(isTrigger: boolean) {

    this.blogService.getBlogs().subscribe( (res) => {

      this.blogs = res;

      if (isTrigger)

        this.dtTrigger.next();
        
    })

  }

  removeBlogs(id: number):void {

   let model = new Blog(id);

   this.blogService.deleteBlog(model).subscribe( (res) => {

     this.getBlogs(false);

   });

  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ngEditorOptions } from 'src/app/app.constants';
import { Blog } from 'src/app/models/blog.model';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css']
})
export class NewsDetailComponent implements OnInit {

  blog: Blog = new Blog();
  editorConfig: any;
  blogId: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.blogId = +params['id'];

      if (this.blogId > 0) {
        // this.productService.getProductAdmin(this.productId).subscribe((res) => {
        //   this.productModel = res;
        //   console.log(this.productModel);
        //   this.getProductGroups();
        // })
      }
      else {
        // this.getProductGroups();
      }

    })

    this.editorConfig = ngEditorOptions;
  }

}

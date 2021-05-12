import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ngEditorOptions } from 'src/app/app.constants';
import { Blog } from 'src/app/models/blog.model';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css']
})
export class NewsDetailComponent implements OnInit {

  blog: Blog = new Blog();
  editorConfig: any;
  blogId: any;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private blogSerice: BlogService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.blogId = +params['id'];

      if (this.blogId > 0) {
        this.blogSerice.getBlogById(this.blogId).subscribe((res) => {
          this.blog = res;
        })
      }

    })

    this.editorConfig = ngEditorOptions;
  }

  onChangeBlogImage(event: any) {
    const filesUpload: File = event.target.files[0];
    const reader= new FileReader();
    reader.readAsDataURL(filesUpload);
    this.blog.imageUploaded = filesUpload;
  }

  addBlog(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.blogSerice.addEditBlog(this.blog).subscribe((res)=> {
      this.router.navigate(['/admin/admin-news']);
    });

  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { FotografiasService } from 'src/app/services/fotografias.service';
import { AuthService } from 'src/app/services/auth.service';
import { UploadService } from 'src/app/services/upload.service';
import { GLOBAL } from 'src/app/services/global';

@Component({
  selector: 'app-editar-fotografia',
  templateUrl: './editar-fotografia.component.html',
  styleUrls: ['./editar-fotografia.component.css']
})
export class EditarFotografiaComponent implements OnInit {
  public fotografia:any={};
  public token:string;
  public url:string;

  constructor(
    private _route:ActivatedRoute,
    private _serviceFotografias:FotografiasService,
    private _auth:AuthService,
    private _upload:UploadService,
    private _router:Router
  ) { 
    this.token=this._auth.getToken();
    this.url=GLOBAL.url;
  }

  ngOnInit() {
    this.getFotografia();
  }

  getFotografia(){
    this._route.params.forEach((params:Params)=>{
      this._serviceFotografias.getFotografiasById(params['id'])
      .then(response=>{
        this.fotografia=response.fotografia;
        this.image_selected=response.fotografia.imagen;
      })
      .catch(error=>{
        console.log(error);
      })
    })
  }

  editar(){
    this._serviceFotografias.update(this.fotografia.id, this.fotografia, this.token)
    .then(response=>{

      if(this.filesToUpload){
        this._upload.upload(this.url + 'upload-fotografia/' + response.fotografia.id,this.filesToUpload,this.token)
        .then(fotografias=>{
          this._router.navigate(['/admin/list']);
        })
        .catch(error=>{
          this._router.navigate(['/admin/list']);
          console.log(error);
        })
      }else{
        this._router.navigate(['/admin/list']);
      }
      
    })
    .catch(error=>{
      console.log(error);
    })
  }

  public filesToUpload:Array<File>;
  public image_selected:string;
  fileChangeEvent(fileInput:any){
    this.filesToUpload=fileInput.target.files.length>0?<Array<File>>fileInput.target.files:null;
    this.image_selected=this.filesToUpload?fileInput.target.files[0].name:'';
  }

}

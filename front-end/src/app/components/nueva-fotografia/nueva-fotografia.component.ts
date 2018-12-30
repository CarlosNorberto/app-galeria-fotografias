import { Component, OnInit } from '@angular/core';
import { FotografiasService } from 'src/app/services/fotografias.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { UploadService } from 'src/app/services/upload.service';
import { GLOBAL } from 'src/app/services/global';

@Component({
  selector: 'app-nueva-fotografia',
  templateUrl: './nueva-fotografia.component.html',
  styleUrls: ['./nueva-fotografia.component.css']
})
export class NuevaFotografiaComponent implements OnInit {
  public fotografia:any={};
  public token:string;
  public identity:any;
  public url:string;

  constructor(
    private _serviceFotografias:FotografiasService,
    private _auth:AuthService,
    private _router:Router,
    private _upload:UploadService
  ) { 
    this.token=this._auth.getToken();
    this.identity=this._auth.getIdentity();
    this.url=GLOBAL.url;
    this.fotografia.activo=true;
  }

  ngOnInit() {
  }

  agregar(){
    this.fotografia.usuario_creacion=this.identity.usuario;
    this._serviceFotografias.save(this.fotografia, this.token)
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

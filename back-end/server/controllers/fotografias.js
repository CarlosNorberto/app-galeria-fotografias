const fotografias=require('../models').fotografias;
const fs=require('fs');
const thumb=require('node-thumbnail').thumb;
const path=require('path');

function create(req,res){
    var body=req.body;

    fotografias.create(body)
    .then(fotografia=>{
        res.status(200).send({fotografia});
    })
    .catch(err=>{
        res.status(500).send({message:"Ocurrió error al guardar la fotografía"});
    });
}

function update(req,res){
    var id=req.params.id;
    var body=req.body;

    fotografias.findById(id)
    .then(fotografia=>{
        fotografia.update(body)
        .then(()=>{
            res.status(200).send({fotografia});
        })
        .catch(err=>{
            res.status(500).send({message:"Ocurrió un error al actualizar la fotografía."});
        })
    })
    .catch(err=>{
        res.status(500).send({message:"Ocurrió un error al buscar la fotografía."});
    });
}

function uploadFotografia(req,res){
    var id=req.params.id;

    if(req.files){
        var file_path=req.files.foto.path;
        var file_split=file_path.split('\\');
        var file_name=file_split[3];
        var ext_split=file_name.split('\.');
        var file_ext=ext_split[1];
        if(file_ext=='jpg'){
            var foto={};
            foto.imagen=file_name;

            fotografias.findById(id)
            .then(fotografia=>{
                fotografia.update(foto)
                .then(()=>{
                    var newPath='./server/uploads/fotografias/' + file_name;
                    var thumbPath='./server/uploads/fotografias/thumbs';

                    thumb({
                        source:path.resolve(newPath),
                        destination:path.resolve(thumbPath),
                        width:200,
                        suffix:''
                    }).then(()=>{
                        res.status(200).send({fotografia});
                    }).catch(err=>{
                        res.status(500).send({message:"Ocurrió un error al crear el thumbnail."});
                    });
                    
                })
                .catch(err=>{
                    fs.unlink(file_path,(err)=>{
                        if(err){
                            res.status(500).send({message:"Ocurrió un error al eliminar el archivo."});
                        }                    
                    })
                    res.status(500).send({message:"Ocurrió un error al actualizar la fotografía."});
                });
            })
            .catch(err=>{
                fs.unlink(file_path,(err)=>{
                    if(err){
                        res.status(500).send({message:"Ocurrió un error al eliminar el archivo."});
                    }                    
                })
                res.status(500).send({message:"Ocurrió un error al buscar la fotografía."});
            });
        }else{
            fs.unlink(file_path,(err)=>{
                if(err){
                    res.status(500).send({message:"Ocurrió un error al eliminar el archivo."});
                }                    
            })
            res.status(500).send({message:"La extensión no es válida."});
        }
    }else{
        res.status(400).send({message:"Debe seleccionar una fotografía."});
    }
}

function getFotografia(req,res){
    var fotografia=req.params.fotografia;
    var thumb=req.params.thumb;
    
    if(thumb=="false")
        var path_foto='./server/uploads/fotografias/' + fotografia;
    else if(thumb=="true")
        var path_foto='./server/uploads/fotografias/thumbs/' + fotografia;

    fs.exists(path_foto,(exists)=>{
        if(exists){
            res.sendFile(path.resolve(path_foto));
        }
        else{
            res.status(404).send({message:"No se encuentra la fotografía."});
        }
    })
}

function getAll(req,res){
    fotografias.all({
        where:{
            activo:true
        },
        order:[
            ['numero','ASC']
        ]
    })
    .then(fotografias=>{
        res.status(200).send({fotografias});
    })
    .catch(err=>{
        res.status(500).send({message:"Ocurrió un error al buscar las fotografías."});
    })
}

function getAllAdmin(req,res){
    fotografias.all({
        order:[
            ['numero','ASC']
        ]
    })
    .then(fotografias=>{
        res.status(200).send({fotografias});
    })
    .catch(err=>{
        res.status(500).send({message:"Ocurrió un error al buscar las fotografías."});
    })
}

function getById(req,res){
    var id=req.params.id;

    fotografias.findById(id)
    .then(fotografia=>{
        res.status(200).send({fotografia});
    })
    .catch(err=>{
        res.status(500).send({message:"Ocurrió un error al buscar una fotografía."});
    })
}

module.exports={
    create,
    update,
    uploadFotografia,
    getFotografia,
    getAll,
    getAllAdmin,
    getById
}
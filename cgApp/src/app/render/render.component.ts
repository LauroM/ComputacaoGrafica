import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

@Component({
  selector: 'app-render',
  templateUrl: './render.component.html',
  styleUrls: ['./render.component.css']
})
export class RenderComponent implements OnInit {

  toggled:boolean = false;
  scene = new THREE.Scene();
  stateOptions:any[];
  renderer = new THREE.WebGLRenderer();
  camera:any;
  value1: string = "off";
  myfile: any[] = [];
  public loader = new GLTFLoader();
  // public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});


  constructor() { 
    this.stateOptions = [
      { label: "Dark", value: "off" },
      { label: "Light", value: "on" }
    ];
  }

  ngOnInit(): void {
    this.createCanvas();
  }


  public createCanvas(){

    this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    
    //var renderer = new THREE.WebGLRenderer();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( this.renderer.domElement );
    
    var geometry = new THREE.BoxGeometry();
    var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    var cube = new THREE.Mesh( geometry, material );
    this.scene.add( cube );

    this.camera.position.z = 5;
    
    var animate = () =>{
        requestAnimationFrame( animate );
    
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
    
        this.renderer.render( this.scene, this.camera );
    };
    animate();
  }

  animate(cube:any){
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    this.renderer.render( this.scene, this.camera );
  }

  public toggleBackground(){

  
    var color;
    (this.toggled)? color = new THREE.Color(0x000000):
                        color = new THREE.Color(0xffffff);
    this.toggled = !this.toggled;

    this.scene.background = color;
    console.log(this.scene);

    this.renderer.render(this.scene,this.camera);
    
  }


  public myUploader() {
        
    this.loader.load( 'src/assets/obj/WAVEFRONT.obj', ( gltf )=> {

      this.scene.add( gltf.scene );
    
    }, undefined, function ( error ) {
    
      console.error( error );
    
    } );
  }

  
  
}

import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


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
  cube:any=null;
  // public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});
  controls:any = null;
  mesh:any = null;
  light:any = null;




  constructor() { 
    this.stateOptions = [
      { label: "Dark", value: "off" },
      { label: "Light", value: "on" }
    ];
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    this.controls = new OrbitControls(this.camera,this.renderer.domElement);   
  }

  ngOnInit(): void {
    this.createCanvas();
    //this.configCamera()
  }

  ngAfterViewInit(){
    this.configControls();
    //this.createMesh();
    this.createLight();
  }

  public createCanvas(){

    
    //var renderer = new THREE.WebGLRenderer();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( this.renderer.domElement );
    
    var geometry = new THREE.BoxGeometry();
    var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    this.cube = new THREE.Mesh( geometry, material );
    this.scene.add( this.cube );

    this.camera.position.z = 5;
    
    var animate = () =>{
        requestAnimationFrame( animate );
    
        // cube.rotation.x += 0.01;
        // cube.rotation.y += 0.01;
    
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
    


    // ../../assets/obj/christma_bell_glTF.glb'
    //file://home/oliveira/git/ComputacaoGrafica/cgApp/src/assets/obj/
    var path = 'https://github.com/LauroM/ComputacaoGrafica/blob/master/cgApp/src/assets/obj/';

    var objLoader = new OBJLoader();

    objLoader.load( `${path}cube.obj`, ( gltf )=> {

      this.scene.add( gltf );
      this.renderer.render(this.scene,this.camera);
    
    }, undefined, function ( error ) {
    
      console.error( error );
    
    } );

  }

  configControls() {
    //this.controls.autoRotate = true;
    this.controls.enableZoom = false;
    this.controls.enablePan  = false;
    this.controls.update();
  }
  
  // parametro
  createMesh(): void {
    const geometry = new THREE.BoxGeometry(1,1,1);
    const material = new THREE.MeshLambertMaterial({ color: 0x000000 });
    this.mesh = new THREE.Mesh(geometry, material);
    this.scene.add(this.mesh);
  }

  createLight(): void {
    this.light = new THREE.PointLight( 0xffffff );
	  this.light.position.set( -10, 10, 10 );
	  this.scene.add( this.light );
  }

  configCamera(): void {
    this.camera.aspect = this.calculateAspectRatio();
    this.camera.updateProjectionMatrix();
	  this.camera.position.set( -15, 10, 15 );
	  this.camera.lookAt( this.scene.position );
  }

  private calculateAspectRatio(): number {
    
    const height = window.innerHeight;
    if (height === 0) {
      return 0;
    }
    return window.innerWidth / window.innerHeight;
  }

}

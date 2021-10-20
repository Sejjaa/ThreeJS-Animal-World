import * as THREE from 'three';
import $ from 'jquery';
import {PointerLockControls} from 'three/examples/jsm/controls/PointerLockControls.js';
import {FBXLoader} from 'three/examples/jsm/loaders/FBXLoader.js';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import Stats from 'three/examples/jsm/libs/stats.module';
import ArreyPosition from'Aaaaa/TreesPosition.js';
var scene = new THREE.Scene();

var Arrayx=ArreyPosition.Arrayx;
var Arrayz=ArreyPosition.Arrayz;
///Camera
var camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,40000);

///Renderer
var renderer=new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
var game=$('#game');
game.append(renderer.domElement);

var loader=new THREE.TextureLoader();
var envnx=loader.load('./env/nx.png');
var envny=loader.load('./env/ny.png');
var envnz=loader.load('./env/nz.png');
var envpx=loader.load('./env/px.png');
var envpy=loader.load('./env/py.png');
var envpz=loader.load('./env/pz.png');

///Envi Map Creating Map Cube
//Creating wiew

var geo1=new THREE.BoxBufferGeometry(40000,20000,40000);
var mapboxmaterial=[

new THREE.MeshPhongMaterial({map:envpx, side:THREE.DoubleSide}),
new THREE.MeshPhongMaterial({map:envnx, side:THREE.DoubleSide}),
new THREE.MeshPhongMaterial({map:envpy, side:THREE.DoubleSide}),
new THREE.MeshPhongMaterial({map:envny, side:THREE.DoubleSide}),
new THREE.MeshPhongMaterial({map:envpz, side:THREE.DoubleSide}),
new THREE.MeshPhongMaterial({map:envnz, side:THREE.DoubleSide}),
];

var mat1=new THREE.MeshFaceMaterial(mapboxmaterial);

var Cube=new THREE.Mesh(geo1,mat1);
scene.add(Cube);

//Plane
var geo2=new THREE.PlaneBufferGeometry(40000,40000);
var mat2=new THREE.MeshPhongMaterial({map:envny});
var Plane=new THREE.Mesh(geo2,mat2);
Plane.rotation.x=-Math.PI/2;
Plane.position.y=-1020;
scene.add(Plane);
envny.repeat.set(100,100);
//da se ponavlja na ovim axis
envny.wrapS=THREE.RepeatWrapping;
envny.wrapT=THREE.RepeatWrapping;



///Add Animals

const gltfloader = new GLTFLoader();

var AllRinho=[];
var AllBirds=[];
var AllButtfly=[];
var AllDino1=[];
var AllDino2=[];
var AllDino3=[];
var AllRex=[];
///All Loaded animals
var rinho1;
var bird1;
var buttfly1;


gltfloader.load(
    './3D gltf animals/rinho1/source/scene.gltf',
    function ( gltf ) {
        

////Cloning function creating clone object for gltf         
var clone;
for(let i=0;i<6;i++){

  const cloneGltf = (gltf) => {
    
  clone = {
    animations: gltf.animations,
    scene: gltf.scene.clone(true)
  };

  const skinnedMeshes = {};

  gltf.scene.traverse(node => {
    if (node.isSkinnedMesh) {
      skinnedMeshes[node.name] = node;
    }
  });

  const cloneBones = {};
  const cloneSkinnedMeshes = {};

  clone.scene.traverse(node => {
    if (node.isBone) {
      cloneBones[node.name] = node;
    }

    if (node.isSkinnedMesh) {
      cloneSkinnedMeshes[node.name] = node;
    }
  });

  for (let name in skinnedMeshes) {
    const skinnedMesh = skinnedMeshes[name];
    const skeleton = skinnedMesh.skeleton;
    const cloneSkinnedMesh = cloneSkinnedMeshes[name];

    const orderedCloneBones = [];

    for (let i = 0; i < skeleton.bones.length; ++i) {
      const cloneBone = cloneBones[skeleton.bones[i].name];
      orderedCloneBones.push(cloneBone);
    }

    cloneSkinnedMesh.bind(
        new THREE.Skeleton(orderedCloneBones, skeleton.boneInverses),
        cloneSkinnedMesh.matrixWorld);
  }
  return clone;

}


cloneGltf(gltf); 

AllRinho.push(clone);

}

    });


for(let i=0;i<30;i++){
   gltfloader.load(
    './3D gltf animals/bird1/scene.gltf',
    function ( gltf ) {

        bird1=gltf;
        AllBirds.push(bird1);
    });    
   

}




for(let i=0;i<15;i++){
gltfloader.load(
    './3D gltf animals/bug1/scene.gltf',
    function ( gltf ) {

        buttfly1=gltf;
        AllButtfly.push(buttfly1);

        

    });

}

var test;
var test1;
gltfloader.load(
    './3D gltf animals/drake1/scene.gltf',
    function ( gltf ) {

        scene.add(gltf.scene);
        gltf.scene.position.set(13900,-1020,0);
        gltf.scene.scale.set(25,25,25);
        gltf.scene.rotation.y=-Math.PI/2;
        test = new THREE.AnimationMixer(gltf.scene);
        var Animation2=test.clipAction(gltf.animations[0]);
        Animation2.play();

});  



gltfloader.load(
    './3D gltf animals/dino1/scene.gltf',
    function ( gltf ) {

var clone;
for(let i=0;i<6;i++){

  const cloneGltf = (gltf) => {
    
  clone = {
    animations: gltf.animations,
    scene: gltf.scene.clone(true)
  };

  const skinnedMeshes = {};

  gltf.scene.traverse(node => {
    if (node.isSkinnedMesh) {
      skinnedMeshes[node.name] = node;
    }
  });

  const cloneBones = {};
  const cloneSkinnedMeshes = {};

  clone.scene.traverse(node => {
    if (node.isBone) {
      cloneBones[node.name] = node;
    }

    if (node.isSkinnedMesh) {
      cloneSkinnedMeshes[node.name] = node;
    }
  });

  for (let name in skinnedMeshes) {
    const skinnedMesh = skinnedMeshes[name];
    const skeleton = skinnedMesh.skeleton;
    const cloneSkinnedMesh = cloneSkinnedMeshes[name];

    const orderedCloneBones = [];

    for (let i = 0; i < skeleton.bones.length; ++i) {
      const cloneBone = cloneBones[skeleton.bones[i].name];
      orderedCloneBones.push(cloneBone);
    }

    cloneSkinnedMesh.bind(
        new THREE.Skeleton(orderedCloneBones, skeleton.boneInverses),
        cloneSkinnedMesh.matrixWorld);
  }
  return clone;

}


cloneGltf(gltf); 
AllDino1.push(clone);

}
         

}); 


gltfloader.load(
    './3D gltf animals/dino2/scene.gltf',
    function ( gltf ) {
        
    var clone;
for(let i=0;i<2;i++){

  const cloneGltf = (gltf) => {
    
  clone = {
    animations: gltf.animations,
    scene: gltf.scene.clone(true)
  };

  const skinnedMeshes = {};

  gltf.scene.traverse(node => {
    if (node.isSkinnedMesh) {
      skinnedMeshes[node.name] = node;
    }
  });

  const cloneBones = {};
  const cloneSkinnedMeshes = {};

  clone.scene.traverse(node => {
    if (node.isBone) {
      cloneBones[node.name] = node;
    }

    if (node.isSkinnedMesh) {
      cloneSkinnedMeshes[node.name] = node;
    }
  });

  for (let name in skinnedMeshes) {
    const skinnedMesh = skinnedMeshes[name];
    const skeleton = skinnedMesh.skeleton;
    const cloneSkinnedMesh = cloneSkinnedMeshes[name];

    const orderedCloneBones = [];

    for (let i = 0; i < skeleton.bones.length; ++i) {
      const cloneBone = cloneBones[skeleton.bones[i].name];
      orderedCloneBones.push(cloneBone);
    }

    cloneSkinnedMesh.bind(
        new THREE.Skeleton(orderedCloneBones, skeleton.boneInverses),
        cloneSkinnedMesh.matrixWorld);
  }
  return clone;

}


cloneGltf(gltf); 
AllDino2.push(clone);

}    


game.append('<button id="starter">Run Game</button>');
var Start=$('#starter');
Start.css({ position:'absolute',width:'200px',height:'200px',left:'35%',top:'35%' });


Start.on('click',()=>{

$(Start).remove();
RandomizeAnimals();
MakeTrees();


})



}); 







gltfloader.load(
    './3D gltf animals/rex1/scene.gltf',
    function ( gltf ) {
       
        var Rex=gltf;
        AllRex.push(Rex);
     
}); 


gltfloader.load(
    './3D gltf animals/dino4/scene.gltf',
    function ( gltf ) {

var clone;
for(let i=0;i<2;i++){

  const cloneGltf = (gltf) => {
    
  clone = {
    animations: gltf.animations,
    scene: gltf.scene.clone(true)
  };

  const skinnedMeshes = {};

  gltf.scene.traverse(node => {
    if (node.isSkinnedMesh) {
      skinnedMeshes[node.name] = node;
    }
  });

  const cloneBones = {};
  const cloneSkinnedMeshes = {};

  clone.scene.traverse(node => {
    if (node.isBone) {
      cloneBones[node.name] = node;
    }

    if (node.isSkinnedMesh) {
      cloneSkinnedMeshes[node.name] = node;
    }
  });

  for (let name in skinnedMeshes) {
    const skinnedMesh = skinnedMeshes[name];
    const skeleton = skinnedMesh.skeleton;
    const cloneSkinnedMesh = cloneSkinnedMeshes[name];

    const orderedCloneBones = [];

    for (let i = 0; i < skeleton.bones.length; ++i) {
      const cloneBone = cloneBones[skeleton.bones[i].name];
      orderedCloneBones.push(cloneBone);
    }

    cloneSkinnedMesh.bind(
        new THREE.Skeleton(orderedCloneBones, skeleton.boneInverses),
        cloneSkinnedMesh.matrixWorld);
  }
  return clone;

}


cloneGltf(gltf); 
AllDino3.push(clone);

}




}); 

///Add animals animations
var ArreyRinhoMixer=[];
var ArreyBirdMixer=[];
var ArreyBirdMixerAnimation=[];
var ArreyButtflyMixer=[];
var ArreyButtflyMixerAnimation=[];
var ArreyDino1Mixer=[];
var ArreyDino2Mixer=[];
var ArreyDino3Mixer=[];
////Randomize Animals

function RandomizeAnimals(){

///Bird1 Adding and Editing Done

    

       for(let i=0;i<AllRinho.length;i++){
       scene.add(AllRinho[i].scene);
       let angle=Math.random()*Math.PI *2;
       let radius=2000+Math.random()*18000;
       let x=Math.sin(angle)*radius;
       let z=Math.cos(angle)*radius;
       AllRinho[i].scene.position.set(x,-1020,z);
       AllRinho[i].scene.scale.set(12,12,12)

       }

       for(let i=0;i<AllBirds.length;i++){
       scene.add(AllBirds[i].scene);
       let angle=Math.random()*Math.PI *2;
       let radius=5000+Math.random()*19000;
       let height=4000+Math.random()*3500;
       let x=Math.sin(angle)*radius;
       let z=Math.cos(angle)*radius;
       AllBirds[i].scene.position.set(x,height,z);
       // AllBirds[i].scene.position.set(0,-1000,0);
       AllBirds[i].scene.scale.set(6,6,6)

       }


      
      for(let i=0;i<AllButtfly.length;i++){
       scene.add(AllButtfly[i].scene);
       let angle=Math.random()*Math.PI *2;
       let radius=5000+Math.random()*19000;
       let height=-600+Math.random()*1500;
       let x=Math.sin(angle)*radius;
       let z=Math.cos(angle)*radius;
       AllButtfly[i].scene.position.set(x,height,z);
       // AllButtfly[i].scene.position.set(0,-500,0);
       AllButtfly[i].scene.scale.set(42,42,42)

       }
       

       for(let i=0;i<AllDino1.length;i++){
       scene.add(AllDino1[i].scene);
       let angle=Math.random()*Math.PI *2;
       let radius=2000+Math.random()*18000;
       let x=Math.sin(angle)*radius;
       let z=Math.cos(angle)*radius;
       AllDino1[i].scene.position.set(x,-1020,z);

       let xscale=300+Math.random()*250;
       let yscale=300+Math.random()*250;
       let zscale=300+Math.random()*250;
       AllDino1[i].scene.scale.set(xscale,yscale,zscale)

       }

   

    for(let i=0;i<AllDino2.length;i++){
       scene.add(AllDino2[i].scene);
       let angle=Math.random()*Math.PI *2;
       let radius=2000+Math.random()*18000;
       let x=Math.sin(angle)*radius;
       let z=Math.cos(angle)*radius;
       AllDino2[i].scene.position.set(x,-1020,z);

       let xscale=1.5+Math.random()*3;
       let yscale=0.8+Math.random()*3;
       let zscale=1.5+Math.random()*3;
       AllDino2[i].scene.scale.set(xscale,yscale,zscale)
       }

    for(let i=0;i<AllDino3.length;i++){
       scene.add(AllDino3[i].scene);
       let angle=Math.random()*Math.PI *2;
       let radius=2000+Math.random()*18000;
       let x=Math.sin(angle)*radius;
       let z=Math.cos(angle)*radius;
       AllDino3[i].scene.position.set(x,-1020,z);

       let xscale=1.5+Math.random()*3;
       let yscale=0.8+Math.random()*3;
       let zscale=1.5+Math.random()*3;
       AllDino3[i].scene.scale.set(2.5,2.5,2.5)

       }


    for(let i=0;i<AllRex.length;i++){
       scene.add(AllRex[i].scene);
       let angle=Math.random()*Math.PI *2;
       let radius=2000+Math.random()*18000;
       let x=Math.sin(angle)*radius;
       let z=Math.cos(angle)*radius;
       AllRex[i].scene.position.set(x,-1020,z);
       AllRex[i].scene.scale.set(500,500,500)

       }   



////Animal Animations Create for all Animal

///Rinho mixer
for(let i=0;i<AllRinho.length;i++){
    var mixer = new THREE.AnimationMixer(AllRinho[i].scene);
    ArreyRinhoMixer.push(mixer);
    var Animation=mixer.clipAction(AllRinho[i].animations[0]);
    Animation.play();
}

///Bird Mixer
for(let i=0;i<AllBirds.length;i++){
    var mixer = new THREE.AnimationMixer(AllBirds[i].scene);
    ArreyBirdMixer.push(mixer);
    var Animation=mixer.clipAction(AllBirds[i].animations[0]);
    Animation.play();
}


///Leptir mixer
for(let i=0;i<AllButtfly.length;i++){
    var mixer = new THREE.AnimationMixer(AllButtfly[i].scene);
    ArreyButtflyMixer.push(mixer);
    var Animation1=mixer.clipAction(AllButtfly[i].animations[0]);
    Animation1.play();
}

///Dino1 mixer
for(let i=0;i<AllDino1.length;i++){
    var mixer = new THREE.AnimationMixer(AllDino1[i].scene);
    ArreyDino1Mixer.push(mixer);
    var Animation1=mixer.clipAction(AllDino1[i].animations[0]);
    Animation1.play();
}


///Dino2 mixer
for(let i=0;i<AllDino2.length;i++){
    var mixer = new THREE.AnimationMixer(AllDino2[i].scene);
    ArreyDino2Mixer.push(mixer);
    var Animation1=mixer.clipAction(AllDino2[i].animations[0]);
    Animation1.play();
}


///Dino3 mixer
for(let i=0;i<AllDino3.length;i++){
    var mixer = new THREE.AnimationMixer(AllDino3[i].scene);
    ArreyDino3Mixer.push(mixer);
    var Animation1=mixer.clipAction(AllDino3[i].animations[0]);
    Animation1.play();
}



test1 = new THREE.AnimationMixer(AllRex[0].scene);
var Animation4=test1.clipAction(AllRex[0].animations[0]);
Animation4.play();



}

////Walking Animals in World
 var RinhoRot=0.0002;
 var RinhoRot1=0.0002;    
 var BirdRot=0.001;
 var BirdRot1=0.001;
 var ButtflyRot=0.001;
 var ButtflyRot1=0.001
 var Dino1Rot=0.001;
 var Dino1Rot1=0.001;
 var Dino2Rot=0.001;
 var Dino2Rot1=0.001;
 var RexRot=0.001;
 var RexRot1=0.001;

function AddAnimalWorldWalking(){

    /////Rinho
       let rand1=Math.floor(Math.random()*4);
       var RinhoSpeed=rand1; 
       for(let i=0;i<AllRinho.length;i++){     
     
       if(i<3){
       AllRinho[i].scene.rotation.y += RinhoRot;
       AllRinho[i].scene.position.z-=RinhoSpeed * Math.sin(AllRinho[i].scene.rotation.y);
       AllRinho[i].scene.position.x+=RinhoSpeed * Math.cos(AllRinho[i].scene.rotation.y);

     
       }if(i>2){
       AllRinho[i].scene.rotation.y += RinhoRot1;
       AllRinho[i].scene.position.z-=RinhoSpeed * Math.sin(AllRinho[i].scene.rotation.y);
       AllRinho[i].scene.position.x+=RinhoSpeed * Math.cos(AllRinho[i].scene.rotation.y);
       }

  }

  ///Birds 1 flaying DOne

       let rand2=Math.floor(Math.random()*6); 
       var BirdSpeed=rand2; 
       for(let i=0;i<AllBirds.length;i++){     
     
       if(i<15){
       AllBirds[i].scene.rotation.y += BirdRot;
       AllBirds[i].scene.position.z-=BirdSpeed * Math.sin(AllBirds[i].scene.rotation.y);
       AllBirds[i].scene.position.x+=BirdSpeed * Math.cos(AllBirds[i].scene.rotation.y);
     
       }if(i>14){
       AllBirds[i].scene.rotation.y += BirdRot1;
       AllBirds[i].scene.position.z-=BirdSpeed * Math.sin(AllBirds[i].scene.rotation.y);
       AllBirds[i].scene.position.x+=BirdSpeed * Math.cos(AllBirds[i].scene.rotation.y);
       }

  }
      


/////Leptiri done
       let rand3=Math.floor(Math.random()*4); 
       var ButtflySpeed=rand3; 
       for(let i=0;i<AllButtfly.length;i++){     
     
       if(i<15){
       AllButtfly[i].scene.rotation.y += ButtflyRot;
       AllButtfly[i].scene.position.z-=ButtflySpeed * Math.cos(AllButtfly[i].scene.rotation.y);
       AllButtfly[i].scene.position.x-=ButtflySpeed * Math.sin(AllButtfly[i].scene.rotation.y);
     
       }if(i>14){
       AllButtfly[i].scene.rotation.y += ButtflyRot1;
       AllButtfly[i].scene.position.z-=ButtflySpeed * Math.cos(AllButtfly[i].scene.rotation.y);
       AllButtfly[i].scene.position.x-=ButtflySpeed * Math.sin(AllButtfly[i].scene.rotation.y);
       }

  }


    ///Dino1 movent

       let rand4=Math.floor(Math.random()*4)+5; 
       var Dino1Speed=rand4; 
       for(let i=0;i<AllDino1.length;i++){     
     
       if(i<3){
       AllDino1[i].scene.rotation.y += Dino1Rot;
       AllDino1[i].scene.position.z+=Dino1Speed * Math.cos(AllDino1[i].scene.rotation.y);
       AllDino1[i].scene.position.x+=Dino1Speed * Math.sin(AllDino1[i].scene.rotation.y);
     
       }if(i>2){
       AllDino1[i].scene.rotation.y += Dino1Rot1;
       AllDino1[i].scene.position.z+=Dino1Speed * Math.cos(AllDino1[i].scene.rotation.y);
       AllDino1[i].scene.position.x+=Dino1Speed * Math.sin(AllDino1[i].scene.rotation.y);
       }

  }

 

    ///Dino2 movent

       let rand5=Math.floor(Math.random()*4); 
       var Dino2Speed=rand5; 
       for(let i=0;i<AllDino2.length;i++){     
     
       if(i<3){
       AllDino2[i].scene.rotation.y += Dino2Rot;
       AllDino2[i].scene.position.z+=Dino2Speed * Math.cos(AllDino2[i].scene.rotation.y);
       AllDino2[i].scene.position.x+=Dino2Speed * Math.sin(AllDino2[i].scene.rotation.y);
     
       }if(i>2){
       AllDino2[i].scene.rotation.y += Dino2Rot1;
       AllDino2[i].scene.position.z+=Dino2Speed * Math.cos(AllDino2[i].scene.rotation.y);
       AllDino2[i].scene.position.x+=Dino2Speed * Math.sin(AllDino2[i].scene.rotation.y);
       }

  }


 
       var Rexpeed=5;     
       AllRex[0].scene.rotation.y += RexRot;
       AllRex[0].scene.position.z+=Rexpeed * Math.cos(AllRex[0].scene.rotation.y);
       AllRex[0].scene.position.x+=Rexpeed * Math.sin(AllRex[0].scene.rotation.y);

}
var ll=0;

//Cursor Changer they will move diffrent Birds
function ChangingBirdCursor(){


let rand=Math.floor(Math.random()*3);

if(rand==0){
  BirdRot=-0.002;
  BirdRot1=0.002;
  ButtflyRot=-0.002;
  ButtflyRot1=0.002;    
}if(rand==1){
  BirdRot=0.002;
  BirdRot1=-0.002;
  ButtflyRot=0.002;
  ButtflyRot1=-0.002;      
}if(rand==2){
  BirdRot=0;
  BirdRot1=0.001;
  ButtflyRot=0;
  ButtflyRot1=0.001;      
}         


let rand1=Math.floor(Math.random()*3);
if(rand1==0){
  RinhoRot=0.003;  
  RinhoRot1=-0.003;
}if(rand1==1){
  RinhoRot=-0.003;  
  RinhoRot1=0.003;    
}if(rand1==2){
  RinhoRot=0.0005;  
  RinhoRot1=-0.0005;     
} 


let rand2=Math.floor(Math.random()*3);
if(rand2==0){
  Dino1Rot=0.003;  
  Dino1Rot1=-0.003;
}if(rand2==1){
  Dino1Rot=-0.003;  
  Dino1Rot1=0.003;    
}if(rand2==2){
  Dino1Rot=0.0005;  
  Dino1Rot1=-0.0005;     
} 

let rand3=Math.floor(Math.random()*3);
if(rand3==0){
  Dino2Rot=0.003; 
  RexRot=0.003; 
  Dino2Rot1=-0.003;
}if(rand3==1){
  Dino2Rot=-0.003;  
  Dino2Rot1=0.003;
  RexRot=-0.003;    
}if(rand3==2){
  Dino2Rot=0.0005;  
  Dino2Rot1=-0.0005; 
  RexRot=0.003;    
} 





setTimeout(ChangingBirdCursor,10000);

}

/// load Trees

var Treefir1;
var Treefir2;
var Treefir3;
var Pine1;
var RoseTree1;

///Create and Randomize WOrld
  
var AllTrees=[];


var fbxLoader = new FBXLoader();

fbxLoader.load(
    './Trees/tree1/3DPaz_fir-tree_01.FBX',
    (object) => {
        Treefir1=object;       
        
    });
          
fbxLoader.load(
    './Trees/tree1/3DPaz_fir-tree_02.FBX',
    (object) => {
        Treefir2=object;
    });

fbxLoader.load(
    './Trees/tree1/3DPaz_fir-tree_03.FBX',
    (object) => {
        Treefir3=object;
    });

fbxLoader.load(
    './Trees/tree2/FBX format/conifer_macedonian_pine.fbx',
    (object) => {
         Pine1=object;
         Pine1.rotation.x=-Math.PI/2;
    });

fbxLoader.load(
    './Trees/tree3/Prunus_Pendula_FBX/Prunus_Pendula.fbx',
    (object) => {    
        RoseTree1=object;
        
    });


function MakeTrees(){

    for(let i=0;i<25;i++){
      var Trees1=Treefir1.clone();
      var Trees2=Treefir2.clone();
      var Trees3=Treefir3.clone();
      AllTrees.push(Trees1,Trees2,Trees3);  
    }


     for(let i=0;i<35;i++){
      var Trees4=Pine1.clone();
      AllTrees.push(Trees4);  
    }


    for(let i=0;i<10;i++){
      var Trees5=RoseTree1.clone();
      AllTrees.push(Trees5);  
    }

Randomize()

}



///This is done

function Randomize(){


    for(let i=0;i<75;i++){
        scene.add(AllTrees[i]);
        AllTrees[i].position.set(Arrayx[i],-1020,Arrayz[i]);
        let randx=200+Math.random()*230;
        let randz=200+Math.random()*230;
        let randy=180+Math.random()*300;
        AllTrees[i].scale.set(randx,randy,randz);
        
    }


    for(let i=75;i<110;i++){
        scene.add(AllTrees[i]);
        AllTrees[i].position.set(Arrayx[i],-1020,Arrayz[i]);
        let randx=2.2+Math.random()*2;
        let randz=2.2+Math.random()*2;
        let randy=1+Math.random()*2;
        AllTrees[i].scale.set(randx,randz,randy);
    }



        for(let i=110;i<AllTrees.length;i++){
        scene.add(AllTrees[i]);
        AllTrees[i].position.set(Arrayx[i],-1020,Arrayz[i]);
        AllTrees[i].scale.set(0.3,0.4,0.3);
    }


///After Install all word run Frame and Cursor
    setTimeout( ()=>{
            Frames();
            ChangingBirdCursor();///Cursor Changer for Birds

            CheckingAllObjPositions();///Chening position if they exit

        },500 );

}








///Light

const AmbientLight = new THREE.AmbientLight(0x404040,3); // soft white light
scene.add( AmbientLight );

const directionalLight = new THREE.DirectionalLight( 0xffffff,3 );
scene.add( directionalLight );

directionalLight.position.y=8000;
directionalLight.castShadow=true;
//fixing that we need to see things
directionalLight.shadow.camera.top=21000;
directionalLight.shadow.camera.bottom=-21000;
directionalLight.shadow.camera.left=-21000;
directionalLight.shadow.camera.right=21000;


////global variables
const clock = new THREE.Clock();
var previousTime=0;
var soundTracerLoop=0;
var deltaTime;

camera.position.x=0;
camera.position.z=0;
camera.position.y=-900;

///FPS time update


//Controls
const controls = new PointerLockControls(camera, renderer.domElement)
window.addEventListener('click',()=>{
controls.lock();

})


var PlayerMovingSound=new Audio('Game Sound Effect1/walking.wav');

const onKeyDown = function (event) {
    PlayerMovingSound.play();
    PlayerMovingSound.volume=0.6;
    switch (event.code) {
        case "KeyW":
            controls.moveForward(20)
            break
        case "KeyA":
            controls.moveRight(-20)
            break
        case "KeyS":
            controls.moveForward(-20)
            break
        case "KeyD":
            controls.moveRight(20)
            break
    }
}
document.addEventListener('keydown', onKeyDown, false);

document.addEventListener('keyup',()=>{

setTimeout( ()=>{
PlayerMovingSound.pause();

},200 )


});


function FPS(){

    const elapsedTime = clock.getElapsedTime()
    deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    
   ///Adding only 1 time sound
    if(soundTracerLoop==0){
      soundTracerLoop++; 
      GameMainSound(); 
    }

}





///Sound add into game

///Add Sound Effects

function GameMainSound(){

var MainAudio =  new Audio('Game Sound Effect1/forest2.wav');
MainAudio.play();

MainAudio.addEventListener('ended',()=>{
      MainAudio.play(); 

      let r=Math.floor(Math.random()*5);

      if(r==1){
       Wind.play();
       Wind.volume = 0.2;
      }if(r==2){
       Jungle.play();
       Jungle.volume = 0.7;
      }if(r==3){
       Bird.play();
      }if(r==4){
       Bird1.play();
      }
} ) 


var Wind = new Audio('Game Sound Effect1/forest1.wav');//Wind
var Jungle =new Audio('Game Sound Effect1/zapsplat_forest.mp3');//Jungle sound of forest
var Bird = new Audio('Game Sound Effect1/forest3.wav');//Bird1
var Bird1 = new Audio('Game Sound Effect1/forest4.wav');//Bord2


}


function Frames(){
    renderer.render(scene,camera);
    FPS();
  
    ///Updateing Animals Walk in World
    AddAnimalWorldWalking();
    
    ////AddAnimationstoAnimal
    AnimalAnimations();
    requestAnimationFrame(Frames);
  
}

function AnimalAnimations(){

    for(let i=0;i<ArreyBirdMixer.length;i++){
       ArreyBirdMixer[i].update(deltaTime); 
    }



    for(let i=0;i<ArreyButtflyMixer.length;i++){
       ArreyButtflyMixer[i].update(deltaTime); 
    }


    for(let i=0;i<ArreyRinhoMixer.length;i++){
       ArreyRinhoMixer[i].update(deltaTime); 
    }


    for(let i=0;i<ArreyDino1Mixer.length;i++){
       ArreyDino1Mixer[i].update(deltaTime); 
    }

    for(let i=0;i<ArreyDino2Mixer.length;i++){
       ArreyDino2Mixer[i].update(deltaTime); 
    }
   

    for(let i=0;i<ArreyDino3Mixer.length;i++){
       ArreyDino3Mixer[i].update(deltaTime); 
    }

    test.update(deltaTime);
    test1.update(deltaTime);
}

var sond=0;

var envSound1=new Audio('./Game Sound Effect1/dinosaur1.wav');
var envSound2=new Audio('./Game Sound Effect1/drakeroar1.wav');
var envSound3=new Audio('./Game Sound Effect1/roar1.wav');


function CheckingAllObjPositions(){


for(let i=0;i<AllRinho.length;i++){

    let posx=AllRinho[i].scene.position.x
    let posz=AllRinho[i].scene.position.z

    if(posx>21000 || posx<-21000){

        AllRinho[i].scene.position.set(0,-1020,0);

    }if(posz>21000 || posz<-21000){
        AllRinho[i].scene.position.set(0,-1020,0);
    }

}

   
    for(let i=0;i<AllBirds.length;i++){

    let posx=AllBirds[i].scene.position.x
    let posz=AllBirds[i].scene.position.z

    if(posx>21000 || posx<-21000){

        AllBirds[i].scene.position.x=0;

    }if(posz>21000 || posz<-21000){
        AllBirds[i].scene.position.z=0;
    }

}


for(let i=0;i<AllButtfly.length;i++){

    let posx=AllButtfly[i].scene.position.x
    let posz=AllButtfly[i].scene.position.z

    if(posx>21000 || posx<-21000){

        AllButtfly[i].scene.position.x=0;

    }if(posz>21000 || posz<-21000){
        AllButtfly[i].scene.position.z=0;
    }

}


for(let i=0;i<AllDino1.length;i++){

    let posx=AllDino1[i].scene.position.x
    let posz=AllDino1[i].scene.position.z

    if(posx>21000 || posx<-21000){

        AllDino1[i].scene.position.set(0,-1020,0);

    }if(posz>21000 || posz<-21000){
        AllDino1[i].scene.position.set(0,-1020,0);
    }

}

for(let i=0;i<AllDino2.length;i++){

    let posx=AllDino2[i].scene.position.x
    let posz=AllDino2[i].scene.position.z

    if(posx>21000 || posx<-21000){

        AllDino2[i].scene.position.set(0,-1020,0);

    }if(posz>21000 || posz<-21000){
        AllDino2[i].scene.position.set(0,-1020,0);
    }

}


for(let i=0;i<AllRex.length;i++){

    let posx=AllRex[i].scene.position.x
    let posz=AllRex[i].scene.position.z

    if(posx>21000 || posx<-21000){

        AllRex[i].scene.position.set(0,-1020,0);

    }if(posz>21000 || posz<-21000){
        AllRex[i].scene.position.set(0,-1020,0);
    }

}


if(sond>1){

let rr=Math.floor(Math.random()*4   );


if(rr==1){
    envSound1.play();
    envSound1.volume=0.1;
}if(rr==2){
    envSound2.play();
    envSound2.volume=0.1;
}if(rr==3){
    envSound3.play();
    envSound3.volume=0.1;
}


}

sond++;

 setTimeout(CheckingAllObjPositions,20000);   
}

# Udacity Course: Interactive 3D Graphics with WebGl and three.js

[wiki](https://www.udacity.com/wiki/cs291?nocache#!#five-great-tips)

## Leeson 1: Introduction

* to render is to create an image
* interactive is to be able to affect whats shown in the screen

### WebGL Setup

* chrome supports it
* linux has issues with hw support
* test support in (webgl)[https://get.webgl.org/]

### Core Ideas

* refresh rate, fps
* the eye, pinhole camera, view frustrum
* light: physical and virtual
* the graphics pipeline
* painter's algorithm | z-buffer

### Interacifvity and FPS

* physical 60fps, smooth 30fps, acceptable 6fps
* movies 24fps w/ motion blur
* tvs 60hz if 10fps => 6reps of image
* EU tv 50hz , 20ms p. frame

### CPU Cycles

* 2.8 gHz = 2.8*10^9 * 0,02s = 56*10^6 cycles p. frame
* if 100000 px per frame = 56 cycles p.pixel p.frame!
* GPU offer parallelism


### The Pinhole Camera

* pinhole camera is like the eye, its like an image captured on film reversed as light passes thtough aperture

### Eye vs camera

*  eye sees correct side up but lense sees upside down

### View Frustrum

* frustum is a pyramid with the tip chopped off. it is the cone between the actual object  and the image. with the tip of the cone between image and camera chopped.
* it is the sum of photons from the obejct reflected ion the image

### Screen Door

* if we overlay a grid on a photo we see the concept of pixels of different color making the phto frame
* our screen is a window to a 3d world
* if i change my head position in the real world the window view does not change on screen

###  3D Scene

* our computer renders a 3d scene
* the scene is composed by 3d objects and a description that determines how light interacts with it. objects also can animate over time
* a camera is also defined in the scene that controls perspective

### Light and Rendering

* the phtons from a light source reflect on surface pixels and enter into the camera aperture to form an image

### Reversing the Process

* we need to compute only the photons that reach the camera
* we start from camera casting a ray. for simplification we caN assume there is no reflection but this is unrealistic

### Simple Materials

* non reflective materials (do not reflect other objects)

### Jog down the pipeline

* graphics are rendered by a GPU with rasterization or scan conversion
* the steps are Application -> camera & model transform -> rasterization
* conversion of object surface in a collection of triangles
* application decides which triangles to set to the pipeline
* see if the object is in the view frustum. camera and model transform decides the tposition of each triangle on screen.
* the three points of the triangle are passed in  aprocess of rasterization. if a point is off screen its clipped.rasterization fills the triangle with pixels

### Pipeline Parallelism

* each pipeline step is atomic and steps can run in parallel for multiple obejects harneshing GPU parallelism
* having 2 processors for a simple task cuts time in half if we split the action i half

### Parallelism

* GPUs are design to optimize for multiple pipelines doing the exact same task

### Bottleneck

* the slowest atomic action determines the throughput

### Stalling and Starving

* slowest step causes starving to faster steps after it. as the others are waiting him to finish to get data
* it causes stalling to faster steps before it as they finished but cannot pass ahead their data as next step is busy

### Painters Algorithm

* in simplified pipeline a triangle goes down the pipeline to be put on image and be filled. what if we have 2 triangles overlaying.
* we use th e painteers algorithm where we draw the most distant object from the camera moving progressively toward the camera and drawing objects
* the flaw of this algorithm is that it can end up in vicious cycle where objects are overlapping eachoteher

###  Z- Buffer

* z is the distance from the camera
* in an image apart from storing the pixel color we store a z index 0.0 to 1.0 to specify its distance from the camera
* the default z -index for a pixelis 1.0 (far). if an object has z-index 0.6 and its triaangle wraps the pixel  then the pixel gets ffilled with its color . if another object has z-index of 0.3 and contains the pixel the pixel takes its color. if another object has z-index 0.8 and conatins the pixel it is ignored fro the pixel coloring .

### Z-buffer optimization

* if takes 1 cycle per action.(read z ind, write z-indez, add color) then we should draw objects from front to back

### WebGL and three.js

* webGL is an API based on OPenGL ES based on OpenGL
* webGl is raw with fine grain control over gpu but is code extensive. 
* three.jl help us use less code

### 3 rendering options

* option 1: change of camera/view angle
* option 2: two objects render coreclty based o view angle . one not its z-index is always lower (close to camera) overlaping others> fixed order
* option3: messed up draws front to back

## Lesson 2 - Problem Set

### Frame Skipping

* if our fps iof the screen is 60fps then he have 16.6ms to render each frame. if we take 12ms we dfont skip frames. if we do 21ms we show one every 2 frame so our frame rate is 30fps (frame skipping). 
* if we need more thatn 1/30th of second we miss 2 frame updates of 60fps and we update every 3rd frame so fps drops to 20

### FPS vs ms 

* to average fps we convert to ms anfd then average it dividing with frames

### Rendering

* shadows cost a lot of computation

### Firefly

* if our camera is the source of ligfht. no shadows can be seen , are dimmer the further they are

### Light field dimensions

* radiance gives perspective = lightfield(5 variables) 3 for location and 2 for direction. lightfield is the  calculation of light coming fromany source antwgere

### Final Problem -Programming Errors

* npm init in project repo
* launch live-server
* open consdole
* fix typos
* see cube on screen

## Lesson 3 - Interview: #D Modelling and Printing

* RAPID PROTOTYPING
*  sculpteo based in france prints 3d models
* intgerviewd in autodesk sf jesse harrington au
* 3d printing shortens product development lifecycle. model it -> 3d print it (at home or to a provider e.g shapewaves. review it. go to mass production
* use support material in gaps and wash it off after
* limits design contstrains
* helps make good design
* materials: bronze, metal all plastics
* printers take stl or obj files
* EXPENSIVE TO SCALE
* high res are slow

## Lesson 4 - Points - Vectors and Meshes

### Coordinate System

* in computer graphics we use points and vectors
* in 2d the point is defined by x,y 

### Cartesian Coordinates

* in 3d graphics we use the cartesian coordinate system one point of reference (0,0,0) and 3 direction vectors x,y,z
* the points position is defined by (x,y,z)
* 3d vectors are described by a similar coordinate system. but the origin is not needed
* a vector represents a motion which is describved by 3 numbers. it describes how far to move to get from one point to another. the movement is not bound to any position in space
* distance or duration represents vector

### Left hand vs right handed

* coordinate systems have orientation
* we have left handed and right handed system. the default is right handed with z axis pointing upward (thumb point to x + direction, index to y axis + direction and middle finger to z axis + direction)
* in left handed system the z axis + direction is downwards
* long/lat/alt is a right hand system as longitude increases left(east) and latitude increases north (up)

### The sun also rises

* minecraft as an example. in beta version x pointed south, z pointed west y pointed up (this is a assumption because the sun rised in the east)
* in final release x axis now points east z points south , y points up (sun rizes in south)
* both are right handed systems

### Which way is up

* there is no definite answer. 
* in tterms of actual world engineering xy is the surface and z is up. so in terms of screen it would be x left to right, z bottom to top and y towards the inside of the screen.
* web developers use the following ccordinates. x left to right, y bottom to top, z towards the viewer
* these 2 systems differ by a rotation of 90deg along to the x axis

* experts say negative y up (towards viewer) so like the engineering approach or z up
* coordinates transformation is tricky we need the drawing

### Points and Lines

* 3 basic primitives in graphics processing: points , lines, triangles. 
* triangles the most important. everything you see in a computer game is a triangle
* we touch points and lines briefly to focus on triangles 
* a point is defines by (x,y,z) and a line by 2 points of 3 coordinates each.

### Triangles

* a triangle is defined by 3 points of x,y,z coordinates
* point has 0 dimensions, line has 1 dimension , triangle has 2 dimensions
* in 3d graphics light reflection matters so surface, not whats inside the surface, the volume.

### Creating Geometry in three.js

* in three.js we create a geometry object and add vertices to it.

```
// define geometry
var triangleGeometry. new THREE.Geometry();
// vertices
triangleGeometry.vertices.push(new THREE.Vector3(1,1,0));
triangleGeometry.vertices.push(new THREE.Vector3(3,1,0));
triangleGeometry.vertices.push(new THREE.Vector3(3,3,0));
// add a face
triangleGeometry.faces.push(new THREE.Face3(0,1,2)); // add vertices to face based on their index on vertix array
```

* the code above defines a triangle as an array of 3 vertex points with 3 dimensions and adds a face to it (surface)
* it is a questiion why a point is defined as a Vector3 object

###  Create a square

* to show an objedct on screen we need geometry and material, then put them on a mesh and add it to screen. so to show the former triamngle geometry on screen we need to add

```
// set the material
var triangleMaterial = new THREE.MeshBasicMaterial({
	color: 0x2685AA,
	side: THREE.DoubleSide
	});
// combine geometry and material to a mesh
var triangleMesh = new THREE.Mesh(triangleGeometry, triangleMaterial);
// add mesh to the scene
scene.add(TriangleMesh);
```

### Quiz. Create a Square 

* in this excersize we implement a function to set the geometry for a square

```
function drawSquare(x1, y1, x2, y2) {

	var square = new THREE.Geometry();
	// Your code goes here
	square.vertices.push( new THREE.Vector3(x1,y1,0));
	square.vertices.push( new THREE.Vector3(x2,y1,0));
	square.vertices.push( new THREE.Vector3(x2,y2,0));
	square.vertices.push( new THREE.Vector3(x1,y2,0));
	square.faces.push(new THREE.Face3(0,1,2));
	square.faces.push(new THREE.Face3(0,3,2));
	// don't forget to return the geometry!	The following line is required!
	return square;
}
```

* three.js library supports a 4 point face for squares `square.faces.push(new THREE.Face4(0,1,2,3));`

### Triangulation and Tesseletaion

* tessellate: from greek word for mosaic. is breaking an object in polygons of any sort
* triangulation: is to breake an object in triangles. usually we use the same vertices despite if we do triangulation or tesselation
* triangulation is a subset of tesselation
* gpus are optimized for triangulation and triangles as a triangle is always in the same plane
* a hexagon is minimum represented by 4 triangles without adding vertices
* a rule is that for a polygon of n edges we need n-2 triangles to represent it.
* high concavities reduce or eliminate the triangulation options for a polygon (without adding vertices)

### Vertex Ordering and Culling

* 3-D Computer Graphics uses an interesting concept to speed up object display. Backface Culling
* if we look towards a box only the sides of the box that facve towards us need to be rendered as they are visible. the backfaces of the box dont need rendering as they are not visible. Backface culling can throw away about half the face of the object so it speeds up rendering
* how the GPU decides whats backface and whgats frontface. in WebGl this is determined by the order of the triangle points. if the order is clockwise it is backfacing. if it is counterclockwise it is frontfacing. this rule is called right hand rule (right thumb up)

### Quiz. Return of the Square.

* in three.js backface dulling is enabled by the *MeshBasicMaterial* config object property *side:* setiing its value to *THREE.FronSide*
* in this exercise backface culling hides one of the 2 triangles so we dont see the square. we fix that by correcting the vertex order (right hand rule)

* the fix is changing the order `geometry.faces.push( new THREE.Face3( 2, 0, 3 ) );` to `geometry.faces.push( new THREE.Face3( 2, 3, 0 ) );` using the right hand rule

### Model Creation

* manual creating triangles is a pain. a common way to create geometric objects is with 3d modelling software (like 3D studio max)
* models can be acquired by laser scanners
* these programs output a mesh of triangles.
* in WebGL and three.js there is a process where we can take a mesh in a 3D file format and convert it to a form that WebGL can read.

## Lesson 5 - Problem Set

## 1. Quiz. Polygon Creator
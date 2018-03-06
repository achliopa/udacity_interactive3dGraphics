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

* if our camera is the source of ligfht. no shadows can be seen , objects are dimmer the further they are

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

* write a regular polygon creator, a regular polygon around the axis origin.
* we have a function that generates the vertices based on the angle around the center
* draw a polygon wiki [canvas](http://wp.storminthecastle.com/2013/07/24/how-you-can-draw-regular-polygons-with-the-html5-canvas-api/)
* our code 

```
		// YOUR CODE HERE
		//Save the vertex location - fill in the code
		geo.vertices[pt] = new THREE.Vector3(x,y,0.0);
	}
	// YOUR CODE HERE
	// Write the code to generate minimum number of faces for the polygon.
	for (var face = 0; face<sides-2;face++ ) {
		geo.faces.push(new THREE.Face3(0,face+1,face+2));
	}
```

* our code is parametrical and takes polygon sides count as a pram.

### 2. Quiz. Polygon Location

* location will be the center of the polygon and passed as a THREE.Vector3(x,y,z). 
* we can access its values to be used in the calculations as location.x location.y ...
* its easy . we add location.x and y to our polygon vertices coordinates

```
geo.vertices.push( new THREE.Vector3( x+location.x, y+location.y, 0.0 ) );

// or


		var x = Math.cos( angle ) + location.x;
		var y = Math.sin( angle ) + location.y;
```


### 3. Quiz. Polygon Radius

* we pass a3rd parameter to our Polygon Geometry function . radius.  as the ya re 1 by default

```
		var x = Math.cos(angle)*radius + location.x;
		var y = Math.sin(angle)*radius + location.y;
```


### 4. Quiz. Build a Staircase

* we will use the THREE.CubeGeometry() method to create 2 pieces per step . the vertical and the horizontal.. 


* the params passed are (width, height, depth) or x,y,z

```
var stepVertical = new THREE.CubeGeometry(stepWidth, verticalStepHeight, stepThickness);
var stepHorizontal = new THREE.CubeGeometry(stepWidth, stepThickness, horizontalStepDepth);
```

* it generates triangles for us
* once w have this object we can use it multiple times to create 3JS meshes.. each of which consists of geometry and material

```
var stepMesh

// make and position the vertical part of the step
stepMesh = new THREE.mesh(stepVertical, stepMaterialVerical);
// the position is where the center of the block will be
// we can define possition as THREE.Vector3(x,y,z) or
const {x,y,z} = stepMesh.position; x = 0; y=verticalStepHeight/2; z = 0; //ES6 obejct destructuring, x=centereda t origin, y half of height: above ground plane, zcentered at origin
scene.add(stepMesh);
// make and position the horizontal part of the step
stepMesh = new THREE.mesh(stepHorizontal, stepMaterialHorizontal);
// the position is where the center of the block will be
// we can define possition as THREE.Vector3(x,y,z) or
const {x,y,z} = stepMesh.position; x = 0; y=verticalStepHeight + stepThickness/2; z = horizontalStepDepth - stepThickness/2; //ES6 obejct destructuring,
scene.add(stepMesh);
```

* we use plane grids to help us understand geometry. the lines are every 100 units
* the solution is 

```
	for(var i=0 ; i<6 ; i++) {
		// Make and position the vertical part of the step
		stepMesh = new THREE.Mesh( stepVertical, stepMaterialVertical );
		// The position is where the center of the block will be put.
		// You can define position as THREE.Vector3(x, y, z) or in the following way:
		stepMesh.position.x = 0;			// centered at origin
		stepMesh.position.y = verticalStepHeight/2 + (verticalStepHeight + stepThickness)*i;	// half of height: put it above ground plane
		stepMesh.position.z = (horizontalStepDepth - stepThickness)*i;// centered at origin
		scene.add( stepMesh );
		
		// Make and position the horizontal part
		stepMesh = new THREE.Mesh( stepHorizontal, stepMaterialHorizontal );
		stepMesh.position.x = 0;
		// Push up by half of horizontal step's height, plus vertical step's height
		stepMesh.position.y = (stepThickness/2 + verticalStepHeight) + (verticalStepHeight + stepThickness)*i;
		// Push step forward by half the depth, minus half the vertical step's thickness
		stepMesh.position.z = (horizontalStepDepth/2 - stepHalfThickness) + (horizontalStepDepth - stepThickness)*i;
		scene.add( stepMesh );
	}
```

### 5. Quiz: Drinking Bird

* we will add a birds hat, head, neck and body.
* we have a 2d blueprnt
* axis are x=red, y=green, z=blue
* we will use 3 3d shapes.
	* `boxGeometry = new THREE.CubeGeometry(125.6 /* width */, 389.8 /* height */, 202.1 /* depth */);`
	* `sphereGeometry = new THREE.SphereGeometry(202.1 /* radius */, 32 /* segs width , tesselation across the equator */, 16 /* segs height, tesselation pole to pole );`
	* `cylinderGeometry = new THREE.CylinderGeometry(29.4 /* radius top */, 202.1 /* radius bottom */, 553.5 /* height */, 32 /* radius segments, amount of tesselation across the equator*/)`
* we will add code in 3 functions
	* createSupport() - base,legs, feet
	* createBody() - body and spine
	* createHead() - head and hat
* we follow the 2d blueprint to position shapes on axis. e.g body

```
// Body of the bird - body and the connector of body and head
function createBody() {
	var sphereMaterial = new THREE.MeshLambertMaterial( { color: 0xA00000 } );
	var cylinderMaterial = new THREE.MeshLambertMaterial( { color: 0x0000D0 } );
	// body
	var sphere = new THREE.Mesh(
	new THREE.SphereGeometry(58 ,32,16 ),sphereMaterial);
	sphere.position.x = 0;
	sphere.position.y = 160;
	sphere.position.z = 0;
	scene.add( sphere );
	// spine
	var cylinder = new THREE.Mesh(
	new THREE.CylinderGeometry(12,12,390,32 ),cylinderMaterial);
	cylinder.position.x = 0;
	cylinder.position.y = 355;
	cylinder.position.z = 0;
	scene.add( cylinder );
}
```

### 6. Quiz: Z-Fighting

* z-fighting is when 3 shapes of different material ocupy exact same surface and try to overwrite the other causing wrong visuals

## Lesson 6 - Interview:Modeling in the Real World

## Lesson 7 - Colors and materials

### Overview of the Lesson

* we will work with colors and materials. 
* app uses GPU to compute a color for each pixel and show it on screen

### The PRogrammable Pipeline

* the rendering pipeline is this: 
	* app sends a triangel to GPU
	* GPU determines where the triangles vertices are on ther screen (including z-depth)
	* each pixel inside the triangle is shaded
	* if the pixel passes the z-buffer test it is saven on the image and displayed in the end of the frame
* In modern GPUs part of the pipeline is programmable
	* the transfomed screen part done by the Vertex Shader: Vertex shader processes each vertex of the triangle. it uses info provided to it to manipulate each vertex in someway. e.g triangle color or vertices position. a standart operation of vertex shader is to output the location of the vertex on the screen.
	* the triangle setup(non programmable): triamgle setup uses 3 screen locations generated by the vertex shader for an incoming triangle. Each pixel covered by a part of the triangle has a Fragment generated for it. this is Scan Conversion. Generated Fragments are sent to the Fragment Shader. (in directX this is Pixel Shader).
	* Fragment Shader: Fragment Shader is provided info about the triangle being processed. like in vertex shader the programmer can feed any other data he desires. Fragment Shader outputs  color and z-depth value. this value is tested against the z-buffer. if surface is visible the color is saved for that pixel
* This pipeline is called shader pipeline and used to compute color for each pixel the surface covers
* The pipeline goal is to EFFICIENTLY CALCULATE color and z-depth for a pixel.

### RGB Color Definition

* color is defined as an rgb value. each color of the 3 is called a channel
* if we swap channel we get odd looking color images
* colors are defined either as floats 0.0 to 1.0 or as integer: 0 to 255

### Color Definition

* we will use floats (0.0, 0.0, 0.0) is Black and (1.0, 1.0, 1.0) is White
* in printing we use CMYK (Cyan,Magenda,Yellow,Black) which is like reversed RGB(CMYK subtrative color, RGB additive color)
* RGB is used in screens as we generate light with 1 being the maximum intensity. in Printing Colors absorb light.

### Setting the Color

* in 3JS we start by setting the material `var sphereMaterial = new THREE.MEshLambertMaterial();` as we can set a color for the material
* if we dont set a color for the material the default is white.
* the MeshLambertMaterial has several params. we can set them at constructor or later.
* one of the params is material color of type THREE.color
* we can set each channel separately

```
sphereMaterial.color.r = 1.0;
sphereMaterial.color.g = 0.0;
sphereMaterial.color.b = 0.0;

```

* we can set all channels in once `sphereMaterial.color.setRGB(0.43, 0.32, 0,12);`

* we can use hex to set a color `spherematerial.color.setHex(0x1220FF);`
* we can pass the hexvalue color at material Constructor config object `var shereMaterial = new THREE.MeshLambertMaterial({color: 0xF343A3});`

### The Color Cube

* rgb color space can be visualized as a cube where each color channel is an axis vector

### Quiz. Vertex Attributes

* apart from the x,y,z we can add more params to the vertex like r,g,b color
* we can add colors when defining a face. e.g `geometry.faces[0].vertexColors = [color1,color2, color2, color3];` where color is defined as `var color1 = new THREE.Color(0x423434);` this adds a color to each vertex of the face
* GPU interpolates the colors across the surface
* the function we iplenment is

```
function fillScene() {
	scene = new THREE.Scene();

	// Triangle Mesh
	var material, geometry, mesh;
	material = new THREE.MeshBasicMaterial( { vertexColors: THREE.VertexColors, side: THREE.DoubleSide } );
	geometry = new THREE.Geometry();

	// Student: add a colored triangle here
	geometry.vertices.push(new THREE.Vector3(100,0,0));
	geometry.vertices.push(new THREE.Vector3(0,100,0));
	geometry.vertices.push(new THREE.Vector3(0,0,100));
	var red = new THREE.Color(0xFF0000);
	var green = new THREE.Color(0x00FF00);
	var blue = new THREE.Color(0x0000FF);
	geometry.faces.push(new THREE.Face3(0,1,2));
	geometry.faces[0].vertexColors = [red, green, blue];
	mesh = new THREE.Mesh( geometry, material );

	scene.add( mesh );

}
```

* in the function we set the material to use vertexColors.
* we set 3 vertexes for the geometry of the triangle
* we add them to the face 
* we set the vertexColor property to the face passing the colors for the 3 vertices
* we pash geometry and material to a mesh and we render it.
* the vertex colors are diffused with material color. as material color is white we see no difference

### Color Interpolation

* in the previous quiz is important ot understand how triangle rasterization part of the pipeline actually interpolates acreoss the triangle. what is put on the vertex fades off across the triangle. if we color one vertex and leave others 0 (black) the color interpolates and diffuces to black going towards the other 2 vertices. this is used in materials and lighting

### The color Gamut

* the color triangle in the previous quiz gives an idea of the colors that can be displayed on a monitor
* CIE XYZ colorspace, along the curved edge are the spectral colors. the values are the wavelengths of light that produce the spectral colors.
* in the gamut there are lines or bands called mach bands. they are of special importance in computer graphics.
* monitor cannot produce pure spectral colors. each device has a color gamma. a triangle inside the gamut filled with colors it can display.
* the vertices of the color gamma are the same we used in our quiz
* better screens have larger color gamma. and priters use expensive ink to expand thir color gamma.

### A Simple Lighting Model

* If we have a red ball. how we make GPU compute how the lights in the scene and the balls material interact to make the ball look real.
* when performing interactive rendering we have different components added together: emissive, ambientdiffuse and specular.
	* Emissive: for coloring glowing objects (e.g lightbulb) has its own color and other light sources dont really affect it. it is a way to add a constant color regarless of lighting conditions.
	* Ambient: A fudge factor.something added to objects to look better especially in non directly lit areas. an ambient color value added to the fragments final color value. ambient and emissive are separate with different controls. 3JS allows setting ambient light to affect all materials with an ambient term.
	* Diffuse: a flat, matte finish. it is determined by each lights location
	* Specular: shininess of an object. it is affected by  viewers location
* our light simplified model excludes light bouncing around from surface to surface. so non directly lit areas are considered bllack. ambient light helps adding some light to there areas to look more natural

### Kiss of death

* To sum up. The surface Color is computed with emissive component + ambient component. both solid colors. 
* For each light there is a diffuce component  depending on lights direction
and a specular component depending on lights direction and view direction
* Surface Color = Emissive + Ambinet + For Each Light: Diffuse(Light) + Specular(Light,View)
* Equation: C + E + A + Σ(D(L) + S(L,V))

### Light on a Diffuse Sphere

* we keep light fixed and show the effect on a sphere. we assume light is very far so we care only about its direction and not its position. so we dont have to think about the light direction changing as the object changes position. light is on top of the sphere. light effect is at maximum on top of the sphere goes to 0 at the equator and stays that way as the bottom stays away from the light
* a diffused material is defined as one that scatters light in all directions above the plane according to the cosine law. the amount of light gathered drops off as the angle  gets steeper. The amount  of a light from a single point on a surface drops off with the cosine of the angle  of the surface compaerd to the eye
*  A balancing factor is that as the angle of the surface to the viewer icreases the area of the surface visible through the pixel proportionally increases. we see more of the surface even less light per unit area is reflected to the eye.
* combined results on the position of the viewer to not matter as only the angle of light matters. faster rendering

### Normalizing a Vector

* to shade a diffuse surface, we need the cosine of the angle between the direction to the light and the surface's normal (normalized vector)
* a vector operation called .product (εσωτερικο γινομενο διανυσματων) can be used to compute the cosine.
* First we need to normalize the surface normal and the vector to the light.
normalizing is rescaling a vetor to have a length of 1. a dot product of 2 normalized vector gives a result of -1 to 1 which is used to compute the effect of lighting.
* if ihave a THREE.Vector3(3,-4,0) it represents a  vector between (0,0,0) and the point defined. the vector length is var length=sqrt((3)^2+(-4)^2+(0)^2), by dividing each dimension x,y,z by the length we get the normalized vector

### THe dot product

* given two normalized vetors,the cosine of the angle between them  is computed by the dot product.
* given two vectors A and B the do product equals = Ax*Bx+Ay*By+Az*Bz


### The dot product in detail

* we visualize x-y coordinate system. cosine is the projection of a radius=1 circle around the 0,0 on the x axis. or of the (1,0) vector to all normalized vectors of length 1 (points on the circle)
* dot product is the projection of one normalized vector on the other.
* dot product is a cummulative operation AdotB = BdotA

### Quiz: Diffuse Material

* in this excercise we will set a diffuse material
* to object has asolid color unaffected by light. to give this object a diffused material we need to change the material from *THREE.MeshBasicmaterial* to *THREE.MEshLambertmaterial*
* The Lambert material has several color components. the equation it uses is C=AMBIENT+COLOR*Σ(NdotLi) , NdotLi is the dor product of normalized vector with lighting
* the flat color material is `material = new THREE.MeshBasicMaterial({} color: 0x00FF00, shading: THREE.FlatShading});`
* we can set color later as `material.color.setRGB()` or `var newRed = material.color.r * 0.7;` 
* we set ambient color as `material.ambient.setRGB();` in this excercise initialy it is white but we make it color dependetn and it will be color*0.4
* Since the course's release, three.js has revised their material definition. The material's ambient color is now the same as the diffuse color, with the THREE.AmbientLight being the main way to adjust its effect. This will not affect this exercise's solution, but of course will matter if you use the latest version of three.js.
* Solution

```
function createBall() {
	// Do not change the color itself, change the material and use the ambient and diffuse components.
	// var material = new THREE.MeshBasicMaterial( { color: 0x80FC66, shading: THREE.FlatShading } );
	var material = new THREE.MeshLambertMaterial({color: 0x80FC66, shading: THREE.FlatShading});
	material.ambient.setRGB(material.color.r * 0.4,material.color.g * 0.4,material.color.b * 0.4 );
	var sphere = new THREE.Mesh( new THREE.SphereGeometry( 400, 64, 32 ), material );
	return sphere;
}
```

### Shading Normal

* In the previous quiz we saw that when we did not define the shading: THREE.FlatShading the surface was smooth
* To have a tesselated surface made of triangles look smooth, we introduse the idea of shading normal (normalized perpendicular vector)
* For a tesselated sphere the geometric normal for the triangles is discrete. as each triangle has geometric normals that are all the same acros the surface. so the triangle is flat and we dont have a smooth surface
* instead of geomatric normal we can satore a shading normal at each vertex. these are computated. in a sphere the normal at each point is the vecort direction from the center
* shading normal is made up and parametrical

### Quiz: Enable Smooth Shading

* we take out shading: THREE.FlatShading 
* when we dont define shading THREE.SmoothShading is used by default
* it uses a smooth shading normal at each vertex to compute effect of light and interpolate result

### Ka, Kd and HSL

* Fragment Color = Ka*Material /* Ambient */ + Kd*Material(NdotL) /* Diffuse */ 
* Ka is the grayscale level of ambinet light , Kd modify diffuse contribution
* HSL is a different color model Hue, Saturation, Lightness. hue is the color , saturation is how much color is used, lightnes is the light scale factor ``var color = new Color(); color.setHSL(0.122, 0.433, 0.554);`

### Quiz: baking

*  one technique to save gpu processing is to bake the light effect onto surfaces
* if i can calculate the shade of the object and store this color instead of the normal color, i can save light calculations for each frame.
* we assume that light is very far way but can change direction (like the sun)
* veretex shader takes as input the position of the object , vertex location
* it also tkaes the normal and the lights to be applied on object.
* output is screen position and RGB color
* we can bake if the lights direction and object orientation do not change

### Specular material

* materials that are diffuse reflectors: wood,concrete, newspaper
* materials that are shiny or glossy are specular materials, polish metals, plastics, glass. they look different when we view them from different angles.
* we need to take into account the direction from the surface to the eye
* a way to simultate these material is blinn-phong reflection model: the full formula has a number of terms in it for self-shadowing and for a shininess factor called the fernel coeficient.
* A simplecommon form is the following: Specular = MAX(NdotH,O)^s, maximum of NdotH or NdotH whichever is larger raised to a power. 
* N is the surface normal
* H is the half angle vector
* If we have a surface, a light source direction, and a viewr angle. half angle is the normalized vector of a mirror that would reflet the light source directly to the eye. H vector splits the angle between the light source and the eye in half . so the angle between the half angle vector and the view angle is the same as angle between the half angle vectort ant the light source
* if surface normal matches the half angle then the surface acts like a mirror and the dot product is 1. if N and H angle is 90o the dot product is 0
* S factor is the shininess or specular power and has a power from 1 to infinity. 100 and above lrooks the same.
* a fraction to a power is a smaller number . shineness effect increases the smaller the number.
* the half angle represents the distribution of microfacets on a surface
* microfacet is a way of thinking how a material reflects light. a rough surface with a lot of angles reflects light with lower intencity

### Gouraud Shading

* when we compute lighting and interpolate like a column. its called gouraud shading. our eye is very good distinguishing areas where shading changes. they look like lines the mach bands. to avoid this we need to calculate shading more often , by using more triangles (increase teesselation)

### Phong Shading

* increasing tesselation makes lighting look better
* even then increased shiness creates problems.
* the number of triangle is larger across the edges of the shape, so increasing them stresses the GPU.
* another approach is t oevaluate the reflection model of each pixel.
* instead of interpolating rgb values that result from computing the effects of lighting, we calculate anything we need in the reflection model. in this case all we have to interpolate is the shading normal
* on the GPU we input in the VErtex Shader the position normal and in the output we have the screen position and instead of an RGB computed from the reflection calculation, we put transformed normal. so vertex normals are interpolated per pixel
* this interpolated normal is input to the fragment shader which then evaluates the reflection model and  computes the RGB value to be displayed
* the per pixel interpolated normals will not be normalized
* each normal should be normalized before using it in the lighting computation
* when we interpolate normals and calculate the reflection model at each pixel, this is called per pixel shading or phong shading
* PHONG inventer the phong reflection model which gives a spectral highlight or a shingin spot. and phong shading which we discussed here
* in GOuraud shading color is computed at vertex and interpolated between the two

### Quiz Material Calculations

* 100 triangle * 3 vertex/triangle = 300 vertices / 5 triangles share a verte = 60 evals in Gouraud Shading
* 100 triangle * 60 pixels = 6000 evals in phong so 100/1

### Introduction to Transparency

* up to now we were focusing on opaque materials where light hits the surface and bounces off
* in trasparent materials, light refracts and changes direction when it hits a transparent surface, it makes an object in the material look bent.
* transparency also changes light distribution on a surface (lense effect) focusing the light in spots
* these bright spots are called caustics
* color and intensity of light can be filtered by a transparent object
* the more the light travels through the object the more light gets absorbed.
* light refraction is GPU expensive
* light absorbsion throughthe material is also costy
* we will focus on light absorbsion on thin surfaces like filters and only for objecs that are behind the filter
* https://github.com/arodic/jellyfish, https://akirodic.com/about

### Blending

* one way to think of transparency is that we want to see a bit of both objects
* if we have two objects on screen, one object and a filter on top of it. one approach is to blent the two by adding one every other pixel by the filter and one every other pixel the object behind it. THis algorithm is called SCREEN-DOOR TRANSPARENCY and is a 50/50 mix.

### The Over Operator

* this is a simple way to show an object behind a transparent object. 
* the object behind is the destination and the object infront the source
* over operator is simply using opacity to blend the colors like in CSS.
* the final color is as*Cs +(1-as)*Cd . where as is the source alpha or opacity. with 1 fully opaque and 0 fully transparent. 
* this is a form of linear interpolation
* an other operation in wbGl is the add

### The Z-Buffer and Transparency

* the over operator shows a transparent effect by blending 2 objects
* but how z-buffer works when we are using transparent objects.
* z-buffer stores the depth of the object that is closer to the eye
* if we draw the further object first transparency will work.
* if we draw close object first the back object gets ignored by the z-buffer so there is no transparency

### Quiz: Solving transparent Z-buffering

* draw back to front. dr4aw opaque objects first transparent later
* however if we stack filters (transparent objects) one behind the other, if we violate the first rule the second will not solve the problem
* so our only way to solve it is back to front.

### Transparency and Three.js

* Three.js apllyes transparency by:
	* Render all opaque objects first, z-buffer on
	* turn on blending
	* render transparent objects sorted back to front
	* we still have interpenetration of transparent objects (zbbuffer and center point)

```
var movingBoxmaterial = new THREE.MeshLambertMaterial({
	color: 0xE53319, opacity: 0.4, transparent: true
});
```

	* the problem in interpenetration is as objects surfaces cross and the view angle intersects with the crossing surfaces in two lines. in one case the one surface is infront and on the othe the other. so the draw order will always be wrong for one pixel or the other depending on which object gets drawn first

	* in our example red object is rendered after yellow, and the red object is closer to the eye

### Advanced Transparency Methods

* rendering transparent objects is more complex than simply sorting objects and drawing them.
* so far we dont show backfaces of transparent objects. if we turn them on we have strange artifacts
* assume we see an object from the side with the pahses in that order, 1 back,2 top,3front,4 bottom. the object is inclined to front.
* Phase 1 draws first and 2 blends with it. phase 3 is drawn filling z-buffer and blends with phase 1. phase 4 is behind phase 3 so is invisible. only 1 has an effect on rendering.
* even with back face enabled and good sorting order, we have problem with different sized objects.
* assume a white plane and a red object resting on it. both transparent. middle of the ground plane is closer to the eye so white plane is drawn after. so to the eye it seems the white plane is above the red object.
* complex objects can have two or more surfaces overlapping a pixel. draw order determines whats drawn on the screen. we have to control the order of the riangles on a surface to make it look right. this is unrealistic
* A technique that works well for complex objects is depth peeling. the idea is to peel away each transparent layer untill all layers are processed by storing an addtional z-depth for each pixel/. e.g 1st layer are all surfaces closest to he camera, 2nd layer are 2nd closest surfaces, 3rd layer
* this algorithm requires many passes
* a demo on [depth peeling](http://www.glowscript.org/#/user/GlowScriptDemos/folder/Examples/program/Transparency/edit) [article](https://developer.nvidia.com/content/transparency-or-translucency-rendering)
* we use an a buffer for each pixel  with all the transparent fragments indexed by their depth order. we then combine the fragments in right order. it is possible in new GPUs. mobile devices use Tile-Based architecture. 
* another approach is Stochastic Transparency it is Screen-Door Transparency with randmness to get a better average
* A futere technique is ray tracing

## Lesson 8 - Problem Set

### 2.Quiz: Shiny Bird

* Shininess: Hat,Body = 100, Leg=4, foot=30, Specular Color 0.5,0.5,0.5
* use MeshPhongmaterial

```
	var hatMaterial = new THREE.MeshPhongMaterial( );
	hatMaterial.color.r = 24/255;
	hatMaterial.color.g = 38/255;
	hatMaterial.color.b = 77/255;
	hatMaterial.specular = new THREE.Color(0x7f7f7f);
	//hatMaterial.specular.setRGB(0.5,0.5,0.5);
	hatMaterial.shininess = 100;

	var bodyMaterial = new THREE.MeshPhongMaterial( );
	bodyMaterial.color.setRGB( 31/255, 86/255, 169/255 );
	bodyMaterial.specular = new THREE.Color(0x7f7f7f5);
	bodyMaterial.shininess = 100;

	var legMaterial = new THREE.MeshPhongMaterial( );
	legMaterial.color.setHex( 0xAdA79b );
	legMaterial.specular = new THREE.Color(0x7f7f7f);
	legMaterial.shininess = 4;

	var footMaterial = new THREE.MeshPhongMaterial( { color: 0x960f0b } );
	footMaterial.specular = new THREE.Color(0x7f7f7f);
	footMaterial.shininess = 30;
```

* legs and feet are beveled for shininess
* shininess look better on spherical objects

### 4.Quiz: Drinking Bird Transparency

* we need to add transparency to the bird body
* teacher added an inside object to simulate the fluid
* glass should be, 30% opaque, black regular black, specular color white.

### 5.Quiz: Paper Lantern Shading

* we have a paper lantern shading. inside and outside surfaces have the same shading, as normals have the same direction for inside and outside. this is not normal.
* a solution is to render the model twice: one with backface cull and a second with frontface cull and flip the normal

### 6.Quiz: Glass Cube

* a glass cube on a table problem. even with good techioques like depth peeling. a blue transparent cube on a wooden opaque table gives artifacts. 
* bottom of cube has z fighting with table surface

## Lesson 9 - Transforms

### Overview

* transform is an operation that changes the position, orientation, size and shape of an object.
* transforms are key parts of computer graphics
* when we set position of an object we use a type of transformation called translation.
* transformation in computer graphics is applied linear algebra. it is concerned with vector spaces

### Point and Vector Operations

* a point is a position and a vector describes a motion. 
* we can combine points and vectors in various points by adding or subtracting their coordinates from one to the other.
* if we subtract the location of point A from point B, we get a vectotr describing how we get from point A to point B. B-A = (Bx-Ax,By-Ay,Bz-Az) = V, A + V = B
* we can add and subtract vectors as well. S+T = U (e.g S,T,U are the fases of a treiangle with the vector direction S and t cccw and U cw)
* vectors can be multiplied by a scalar (its length is multiplied by the scalar)
* multiply by a negative scalar reverses direction and multiplies its length.
* multiplying a point by an number is a way to make the object look bigger.

### Coordinate Values

* points and vectors dont require numbers to be associated with them.
* if i say define a vector from a point in the universe to another it exists, but has no coordinates until I define a frame of reference.
* if in the previous example I say what are the vectors coordinated in reference to the earths latitude,longitude and altitude?. this will define a set off coordinates for the vector. these coordinates with change every second as the Earth rotates.
( if i say what are the coordinates in terms of suns location and earths path). again i will get coordinates that change but slower.
* always i need a point o f reference when i set coordinates.
* in computer graphics we use the term world space, this is a user defined frame of refrence and usually right handed, we can add units to it or have it unitless if they are not needed.

### Quiz: Point and vector sum

* we treat point as a vector in linear algebra.

### Quiz: Vector operation

* 3JS library has many vector operations available. normalize() makes the vector a normalized one (length=1)

### Translation

* translation is a way to move sthing in anew position.

```
sphere = new.THREE.Mesh(
	new THREE.SphereGeometry(104/2, 32, 16), sphereMaterial);
sphere.position.x = 0;
sphere.position.y = 540;
sphere.position.z = 0;
scene.add(sphere);
```

* translation and other transforms are built into every object. 
* we can transform manualy by setting the position coordinates to a new set of values

### Rotation

* 3JS has built in support for object roation. 

```
cube = new THREE.Mesh(
	new THREE.CubeGeometry(64,64,64), cubeMaterial);
cube.rotation.x = 70 * Math.PI/180;
```

* in 3JS the rotation happens on the axis we apply it to , it is counterclowise and gets as parameter the degree in rads

### Quiz: Roate a Clock

* we need to rotate the clock indexes to point to 2 and 8 o clock `cube.rotation.y = 2* Math.PI / 3;`

### Euler Angles

* We note that there a re 3 rotation angles on the 3JS object. we can rotate along the x, y or z axis
* when controling a plane x-rotation is known as PITCH (head up and down), y-rotation as YAW/HEAD (left right) and z-rotation as ROLL
* these angles are called EULER angles
* combining these 3 rotation we change the frame of rotation as the frame of rotation is the current orientation of the object like in a robot arm.
* euler angles are use in flight simes, robotics and mobile devices as they can describe the mobile device orientation
* they suffer from the gimbal effect. if i rotate say 90deg the x and y rotation have the same effect, we lose a degree of freedom

### Rigid body Transforms vs Scaling

* to scale sthing is to make it larger or smaller. 
* rotation and translation are rigid body transformation as do not change objects body shape or volume.
* scaling `balloon.scale = new THREE.Vector3(3,3,3);` *uniform scaling
* scale is done in respect to an origin. as it it uses the Vector3
* we can do per axis scaling `cube.scale.x = 1;` *non-uniform scaling*

### QUiz: Scale a sphere

* our aim is to sqeeze and elongate a sphere of radius 10 to look like a clock index (60 units long, 4 units wide and high). be careful that overall dimension is diameter so scale to 2r

```
	sphere.scale.x = 3;
	sphere.scale.y = 0.2;
	sphere.scale.z = 0.2;
	sphere.rotation.y = Math.PI/6
```

### Scale Rotate Translate

* up to this point we have been ignoring the order of operations.
* we didnt care what need to be done before the orther
* order matters whenb rotations and scales are involved.
* 3JS does it in the followin order: Scale->Rotate-> Translate.
* it doesnt matter what is the order in the code . the execution order is the one mandated by 3JS.

### Rotate then Scale

* if we rotated the clock index and then scaled, the rotation would have no effect. as rotating a spere nas no effect
* 3js interactive scene editor [editor](https://threejs.org/editor/)

### Quiz.build a Snowman.

* move the stick and place it as arms. center must be placed 50 units up

```
	cylinder.rotation.x = Math.PI/2
	cylinder.position.x = 0;
	cylinder.position.y = 50;
	cylinder.position.z = 0;
```
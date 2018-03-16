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

### Rotate then translate

* in the previous example if we first translated to the new position and then rotated then the stick would be on the ground far from the snowman. this is because rotation is arount hte axis so a distance from the axis messes things up. when we rotate and translate the object is on the axis => gets rotated => moves to its final position

### Object3D

* we ve seen that 3JS doesnt let us easily position and rotate the hand of a clock. it rotates and positions when we want to do it in reverse order.
* a way to solve this is is to use Object3D to make a new object that contains our clock hand

```
var block = new THREE.MEsh(
	new THREE.CubeGeometry(100,4,4), clockhandMaterial
);

var clockHand = new THREE.Object3D();
clockHand.add(block);

clockHand.rrotation.y = -70 * Math.Pi/180;
scene.add(clockHand);
```

* the block is nested in the object3D clockHand object.
* the transition moves the block so that one end is over the centter of the clockface so that the hand will rotate around the clock properly
* no we have 6 available transformation 3 from block and 3 from Obkect3D wrapper. so we can overcome the order.    <=TcRcScTbRbSbO we can pick whichoune to use following the order (b = block, c = object3d container) TRS is the order.

### Quiz: 2 Clock Hands

```
	cube = new THREE.Mesh(
		new THREE.CubeGeometry( 70, 4, 4 ), minuteHandMaterial );
	cube.position.y = 14;
	cube.position.x = 70/2 - 10;
	var clockHand1 = new THREE.Object3D();
	clockHand1.add(cube);
	clockHand1.rotation.y = -60 * Math.PI/180;
	scene.add( clockHand1 );

	var sphere = new THREE.Mesh(
	new THREE.SphereGeometry( 0.5, 32, 16 ), hourHandMaterial );
	sphere.scale.x = 50;
	sphere.scale.y = 4;
	sphere.scale.z = 4;
	sphere.position.y = 18;	// move the hand above the other hand
	sphere.position.x = 50/2 - 10;
	var clockHand2 = new THREE.Object3D();
	clockHand2.add(sphere);
	clockHand2.rotation.y = 30 * Math.PI/180;
	scene.add( clockHand2 );
```

### Hierarchy of Objects

* Parent -> CHild -> GFrandChild (Tree)
* we ve used object3D to give us access to more transformation combinations
* object3D was created for a more important reason. to create a parent-child relationship between 2 objects.
* when a child is connected to the parent. it is affected to what happens to the parent
* this is called sceen graph hierarchy
* we can make a car made of parts and move them all by translating the parent
* we think the transformations we want to apply and move step by step
* once we apply a transformation we forget about it
* draw a picture if it helps.
* undo the transformation if we are not moving  to our goal.

### Quiz:Instancing 

* Instanciationg is the idea that a single geometric set of triangles can be reused again and again. e.g for a lamp we might have different transforms for each bulb but htte bulbs all have the same mesh.

* e.g reuse a cylinder

```
var lamp = new THREE.Object3d();
var cylinderGeometry = new THREE.CylinderGeometry(20,20,100,32);
for(var i = 0; i<10; i++) {
	var cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
	cylinder.rotation.x = 20*i*Math.Pi/180;
	lamp.add(cylinder);
}
```

### Robot Arm

* lets see how hierarchy  works in practice. we'll make a robot with two parts to its arm. forearm and upperarm. 
* forearm is made of 6 pieces.

```
forearm = new THREE.Object3D();
var faLength = 80;
createRobotExtender(forearm,faLength, robotForeammaterial);
scene.add(forearm);
```

* createRobotExtender adds the geometry
* upper arm is created in the same way to rotate around the origin
* we are interestec on how these 2 parts hook together so that forearm is the child of forearm

```
forearm = new THREE.Object3D();
var faLength = 80;
createRobotExtender(forearm,faLength, robotForeammaterial);
arm = new THREE.Object3D();
var uaLength = 120;
createRobotCrane(arm,uaLength, robotUpperArmMaterial);
// move the forearm to the end of the ipperArm
forearm.position.y = uaLength;
// attach it to a parent/child hierarchy
arm.add(forearm);
scene.add(arm);
```

* when we rotate the arm, the forearm gets rotated
* forearm has its own transforms independent

## Lesson 10 - Problem Set

### 1.Quiz: Extended Robot Arm

* in this exercise we will add a body to the robot. this is done by the createRobotBody func

```
	// Move the forearm itself to the end of the upper arm.
	forearm.position.y = uaLength;
	arm.add( forearm );
	// scene.add( arm );
	// YOUR CODE HERE
	body = new THREE.Object3D();
	var bodyLength = 60;
	// Add robot body here, put arm at top.
	// Note that "body" is already declared at top of this code.
	// Here's the call to create the body itself:
	// createRobotBody( body, bodyLength, robotBodyMaterial );
	// ALSO CHECK OUT GUI CONTROLS FOR BODY
	// IN THE FUNCTIONS setupGUI() and render()
	// Note you'll have to add the body to the scene to get it to display.

	createRobotBody(body,bodyLength,robotBodyMaterial);
	arm.position.y = bodyLength;
	body.add( arm);
	scene.add(body);
```

### 2.Quiz: Robot hand

* we finish the robot adding a hand (a second hand)

```
	handRight = new THREE.Object3D();
	createRobotGrabber( handRight, handLength, robotHandRightMaterial );
	handRight.position.y = faLength;
	forearm.add( handRight );

	handRight.rotation.z = effectController.hz * Math.PI/180;	// yaw
	handRight.position.z = - effectController.htz;	// translate

```

### 3.Quiz:Series of Transforms

* Normally matrix order matters. If I rotate, then translate an object, I'll
get different result than if I transalte then rotate. However there are exceptions.

* translation, scale  and translate/rotate along the same axis

### 5.Quiz: Make a Flower

* reusable code

```
var color1 = new THREE.Color(0xF08000); //orange
var color2 = new THREE.Color(0x808000); //olive
var color3 = new THREE.Color(0x0982FF); //bright blue

geometry.fases[0].vertexColors = [color1, color2, color3];

sphere = new THREE.Mesh(
new THREE.SphereGeometry( 104/2, 32, 16), sphereMaterial);
sphere.position.x = 0;
sphere.position.y = 540;
sphere.position.z = 0;
scene.add(sphere);
```

* solution (we must put Mesh in the loop)

```
	for(var i=0; i<24; i++) {
		var cylinder = new THREE.Mesh( cylGeom, petalMaterial );
		cylinder.rotation.x = Math.PI/2;
		cylinder.position.z = petalLength/2;
		cylinder.position.y = flowerHeight;
		var petal = new THREE.Object3D();
		petal.add( cylinder );
		petal.rotation.y = 15*i*Math.PI/180;
		flower.add( petal );
	}
```

### 6.Quiz: Improved Petals

```
	for(var i=0; i<24; i++) {
		var cylinder = new THREE.Mesh( cylGeom, petalMaterial );
		cylinder.scale.x = 0.25;
		cylinder.position.y = petalLength/2;
		var petal = new THREE.Object3D();
		petal.add( cylinder );
		petal.rotation.y = 15*i*Math.PI/180;
		petal.rotation.z = 70*Math.PI/180;
		petal.position.y = flowerHeight;

		flower.add( petal );
	}
```

## Lesson 11: Matrices

### Matrix math

* we now have a good ovverview of the trasformation offered by 3js. 3js does not offer additional trasformations. we need to know their innerworks and code if we want to program and parametrize the vertex and pixel shaders in the pipeline
* using the chrome debugger isf we look into an Object3D object we will see a parameter called matrix.
* it is of typoe Matrix4 with a lot of numbers in it.
* this matrix holds the transform that changes the shapes shape,orientation and location. these changes are stoned in this array.
* we can multiply a coordinate represented by a pointer vector, by multiplying the mattrix. ang get a new coordinate.
* ANY OBJECT WE MAKE is represented by a bunch of points. 
* these points are in the objects own sort of space
* if we make a cube with cube geometry it is centered around a point(position). we can transform the cube points by a transfer matrix to move, rotate and scale as we desire.
* a transform matrix is a 4x4 matrix. almost noone uses the Matrix3
* 4x4 matrix is preferred by the GPU.
* we can multiply a coordinate by a matrix: D = NC, D=[D1,D2,D3,D4], C=[C1,C2,C3,C4], N[4][4] = [N11,N21,N31,N41,N12...N44]
* `D1 = N11*C1 + N21*C2+N31*C3+N41*C4; D2 = N12*C1+N22*C2+N32*C3+N42*C4; ...`

### Points and Vectors Coordinates

* points and vectors are mathematical entities representing locations and movements. 
* when we give them coordinates we define where they are or where they move in comparison with a frame of reference. 
* we use 3 coordinate values (x,y,z) for both point or vector.
* till now if a set of coordinates represeneted a vector or a point was conceptual

### The 4th Coordinate.

* when using matrices, the way we differentiate points from vectors is by putting a 1 (point) or 0 (vector) to the 4th coordinate
* this is an operation check when we use vector or point math.
* V+V=V (0+0=0), V-V=V (0-0=0),P+V=P (1+0=1), P-P=V (1-1=0), P=P=ILLEGAL, V-P=ILLEGAL, 

### Identity Matrix

* the usual default setting for aq matrix is what is called the identity matrix. it has 1s in the diagonal and zeros everywhere. it is represented by I and it has the following property D=IC D=C. if we multiply a coordinate by this matrix we get  the same coordinate back.
* when we create a matrix in 3js by this call `var mtx = new THREE.Matrix4();` is an identity matrix
* if during our code run we wnat to reset the matrix to identoity we call `mtx.identity()`

### Translation Matrix

* if we want to change the location of a point, we use a translation matrix. 
* this matrix has the translation movement put in the top three positions of the last column. the rest of the matrix is an identioty matrix. the multiplication that gives the new coordinates for the point are `Dx=Cx+Tx,Dy=Cy+Ty, Dz=Cz+Tz`
* if we multiply a vector by this matrix we get the same vector back. a vector has no location and cannot be translated
* the matrix notation we use is column-major form, there is also the row major form wehre points and vectors are rows and the translation matrix coordinates are storen in last row.
* directx uses row major form , webGL uses column major form.
* in memory matrices are stored in the same way (column after column for webgl, row after row in directx)
* applying multiple translation matrices. the tranlation coordinates are added.

### Using a matrix

* to set a Matrix4 at constructor , we can pass ther values as arguments (16values) row by row. it is easier to the eye to align them to look like a coulmn major form matrix, 3JS as we said stores them in memory in its own way (column by column) and we can confirm that with the debugger
* if we hust want to set a translation to the matrix we can use `mtx.makeTranslation(x,y,z);`
* to apply a Matrix4 to an Object3D set the matrix property of Object3D = to he matrix already set as Matrix4. we also need to set matrixAutoUpdate property to falso to disable the Object3D build in transform (Posisition,Rotation and Scale)

```
var mtx = new THREE.Matrix4(); //identity matrix
mtx.makeTranslation(x,y,z); 
forearm.matrix = mtx;
forearm.matrixAutoUpdate = false;
```

### Rotation Matrix

* there are many ways to form rotation matrices. 
* arotation around the Z-axis is done by adding to an identity matrix the cosθ and sinθ in the first column top positions and -sinθ and cosθ in the second column top poisitions. z coordinate is left untouched as we rotate around z. the rotation is ccw. we can understand it as rotating the point vecor by θ or by turning the frame of reference by θ and calculating the new x, y so that the point vector has length of 1
* the dot product of the point coordinates and the rotation axis gives the new location
* 1st ew rotate the point and see its new coordinates.2nd we rotate the axis and see the points coordinates to the new axis (dot product of point vector and axis vectror)

### Dot Product

* the whole definition for the dot product is the following. AdotB = (cos of angle between A and B)x(Length of A)x(Length of B). this is the dot product for non-normalized vectors
* we can think of a coordinate as moving due to the rotation or staying still and being recalculated for a new set of axes. the 3 coordinate axes are called the basis

### Quiz: Axis of Rotation

* there is a easy way to add axis/angle rotation to a Matrix4 using `mtx.makeRotationAxis(axis, theta)`
* our cube has faces of length=2 and is centred on the frame od reference. we want the cylinders on the diagonals of the cube. step  1, find out around which axis to rotate, step b define the angle,
* the answer is -x and z

### Angle of Rotation

* i have my angle of rotation, its -x,z
* i need the angle of rotation and the cylinders lengt
* the 3js code to calculate the length of the cylinder is

```
// get two diagonally-opposite corners of the cube
// and compute the cylinder axis direction and length
var maxCorner = new THREE.Vector3(1,1,1);
var minCorner = new THREE.Vector3(-1,-1,-1);

var cylAxis = new THREE.Vector3();
cylAxis.subVectors(maxCorner,minCorner);
var cylLength = cylAxis.length();
```

* we need the angle of rotation

```
//take dot product ofcylAxisand Up vector to get cosine of angle
cylAxis.normalize();
var theta = Math.acos(cylAxis.dot(new THREE.Vector3(0,1,0)));

//or 

var theta = Math.acos(cylAxis.y);
```

### Cross Product

* for a tilted cylinder we were able to look at and think about axis we had torotate to.
* usually this is not the case. if we have arbitrary vector and try to find quickly the axis of rotation it is imposible.
* There is a quick way to get the axis of rotation, its called the cross product. [paper](http://graphics.cs.brown.edu/~jfh/papers/Moller-EBA-1999/paper.pdf)
* in 3js its called like this

```
var rotationAxis = new THREE.Vector3();
rotationAxis.crossVectors(cylAxis, new THREE.Vector3(0,1,0));
```

* it takes 2 vectors as its inputs, and the result is put into a 3rd vector. this vector is in fact the axis of rotation or at least one of them. the direction is deetermined by the right hand rule. we wrap our hand arount the first vector (cylinder) to the second vector (the y axis). our 4fingers poin to the axis of rotation, if we swap the 2 vector we get the oposite rotation axis.
* the length of the cross product is proportional to the sin of the angle between the 2 vectors.

* if the length of the corss product is zero or close to zero. the 2 vectors point to the same direction or the opposite direction. we can use then the dot product to figure out which case is true.
* in this case the rotation axis  we get is 0,0,0 so no rotation axis at all. if they are oposite we choose arbitrarily one axis perpendicula to the vectors and use it for rotation. 

```
// special case: if rotationAxis is just about zero, set to X axis
// so that the angle can be given as 0 or PI
if(rotationAxis.length == 0) {
		rotationAxis.set(1,0,0);
}
rotationAxis.normalize();
```

* Math notation: LENGTH(A X B) =sinθ x LENGTH(A) x LENGTH(B)
* A -> (Ax,Ay,Az)
* B -> (Bx,By,Bz)
* A X B = (AyBz -AyBZ, AzBx-AxBz, AxBy-AyBx)

* in the end we have a vector that represents the axis of rotation to go from vector a to vector b
* this vector is perpendicular to these 2. we need to normalize it.

### Quiz.Make an Ornament or Caltrops

```
var cylindren = new THREE.Mesh(
 new THREE.CylinderGeometry(0.2,0.2,cylLength,32),cylinderMaterial);

var rotationAxis = new THREE.Vector3(1,0,-1);
// makeRotationAxis wants its axis normalized
rotationAxis.normalize();
// dont use position, rotation, scale
cylinder.matrixAutoUpdate = false
cylinder.matrix.makeRotationAxis(rotationAxis, theta);
```

* We implement our solution

```
// get two diagonally-opposite corners of the cube and compute the
	// cylinder axis direction and length
	var maxCorner1 = new THREE.Vector3(  1, 1, 1 );
	var minCorner1 = new THREE.Vector3( -1,-1,-1 );
	var maxCorner2 = new THREE.Vector3(1,1,-1);
	var minCorner2 = new THREE.Vector3(-1,-1,1);
 	var maxCorner3 = new THREE.Vector3(1,-1,-1);
	var minCorner3 = new THREE.Vector3(-1,1,1);
	var maxCorner4 = new THREE.Vector3(-1,1,-1);
	var minCorner4 = new THREE.Vector3(1,-1,1);
	// note how you can chain one operation on to another:
	var cylAxis1 = new THREE.Vector3().subVectors( maxCorner1, minCorner1 );
	var cylAxis2 = new THREE.Vector3().subVectors( maxCorner2, minCorner2 );
	var cylAxis3 = new THREE.Vector3().subVectors( maxCorner3, minCorner3 );
	var cylAxis4 = new THREE.Vector3().subVectors( maxCorner4, minCorner4 );
	var cylLength = cylAxis1.length();

	// take dot product of cylAxis and up vector to get cosine of angle
	cylAxis1.normalize();
	cylAxis2.normalize();
	cylAxis3.normalize();
	cylAxis4.normalize();

	var originalAxis = new THREE.Vector3(0,1,0);
	var theta1 = Math.acos( cylAxis1.dot( originalAxis ) );
	var theta2 = Math.acos( cylAxis2.dot( originalAxis ) );
	var theta3 = Math.acos( cylAxis3.dot( originalAxis ) );
	var theta4 = Math.acos( cylAxis4.dot( originalAxis ) );
	// or just simply theta = Math.acos( cylAxis.y );

	// YOUR CODE HERE
	var cylinderGeometry = new THREE.CylinderGeometry( 0.2, 0.2, cylLength, 32 );
	var cylinder1 = new THREE.Mesh(cylinderGeometry, cylinderMaterial );
	var cylinder2 = new THREE.Mesh(cylinderGeometry, cylinderMaterial );
	var cylinder3 = new THREE.Mesh(cylinderGeometry, cylinderMaterial );
	var cylinder4 = new THREE.Mesh(cylinderGeometry, cylinderMaterial );
	//var rotationAxis = new THREE.Vector3(1,0,-1);
	var rotationAxis1 = new THREE.Vector3();
	rotationAxis1.crossVectors(originalAxis,cylAxis1);
	// makeRotationAxis wants its axis normalized
	rotationAxis1.normalize();
	var rotationAxis2 = new THREE.Vector3();
	rotationAxis2.crossVectors(originalAxis,cylAxis2);
	// makeRotationAxis wants its axis normalized
	rotationAxis2.normalize();
	var rotationAxis3 = new THREE.Vector3();
	rotationAxis3.crossVectors(originalAxis,cylAxis3);
	// makeRotationAxis wants its axis normalized
	rotationAxis3.normalize();
	var rotationAxis4 = new THREE.Vector3();
	rotationAxis4.crossVectors(originalAxis,cylAxis4);
	// makeRotationAxis wants its axis normalized
	rotationAxis4.normalize();
	// don't use position, rotation, scale
	cylinder1.matrixAutoUpdate = false;
	cylinder2.matrixAutoUpdate = false;
	cylinder3.matrixAutoUpdate = false;
	cylinder4.matrixAutoUpdate = false;
	cylinder1.matrix.makeRotationAxis( rotationAxis1, theta1 );
	cylinder2.matrix.makeRotationAxis( rotationAxis2, theta2 );
	cylinder3.matrix.makeRotationAxis( rotationAxis3, theta3 );
	cylinder4.matrix.makeRotationAxis( rotationAxis4, theta4 );
	scene.add( cylinder1 );
	scene.add( cylinder2 );
	scene.add( cylinder3 );
	scene.add( cylinder4 );
```

* teachers solution

```
var cylinderGeo = new THREE.CylinderGeometry( 0.2, 0.2, cylLength, 32 );
for (var i=0;i<4;i++) {
	var cylinder = new THREE.Mesh(cylinderGeo, cylinderMaterial );
	var x = (i<2) ? -1 : 1;
	var z = (i%2) ? -1 : 1;
	var rotationAxis = new THREE.Vector3(x,0,z);
	rotationAxis.normalize();
	cylinder.matrixAutoUpdate = false;
	cylinder.matrix.makeRotationAxis( rotationAxis4, theta );
	scene.add(cylinder);
}
```

### Rotation Times Rotation

* a reason that we use a 4by4 transformation is that the matrix can hold any number of t ransformations at once.
* e.g the Object3D rotation param. in the plane example we use th code

```
airplane.rotation.x = effectController.ex * Math.PI /180;
airplane.rotation.y = effectController.ey * Math.PI /180;
airplane.rotation.z = effectController.ez * Math.PI /180;
```

* the transformation order of this code is <= RxRyRZO
* internally a Matrix4 transform matrix is made for each rotation. then they are multiplied together.
* matrix multiplication is done as follows . e.g N=AxB where all are 4by4.
* element N24 is caluclated by multiplying the 4row of A with the 2nd column of B : N24 = A14xB21+A24xB22+A34xB23+A44xB24
* this multilplication is the dot product
* so the 3 rotations are 3 matrices multiplied together in 2 steps. 
* we can multiply T or S matrices.
* the standar order of Object3D transformations  is <= TRxRyRzO = M0 M is the Matrix of object. this practice of multiplying matrices is called concatenation

### World matrix

* We can chain together aor matricces that affect an object.
* Car(Mc=TRS) has Wheel(Mw=TRS) has Hubcap (Mh=TRS)
* The World matrix of Hubcap is W=McMwMh as is the product of the Matrices of its parents and itself. world matrix is called also model matrix

### Quiz: Series of Operations

* R=RxRyRz (R is a rotation matrix itself).a product of rotation matrices is a rotation matrix.
* the product of series of translation matrices is translation matrix
* the product of series of scale matrices is scale matrix

### Frames [insight](http://www.realtimerendering.com/blog/two-ways-to-think-about-transforms/)

* In previous lessons we have seen that the order of transforms for an object is usually rotate and then translate. also the notation is TR as the transformation are writen right left
* if we first translate then rotate we get a different scene. the notation is RT.
* another way of looking at it is that every transformation changes the frame of reference. e.g rotation rotates it and translation moves it.
* first transformation changes the frame of reference that transformations to the right of it will use. then the trasformation transforms the object in relation to this frame of reference, coordinates  are always in reference to a point of reference.
* world space is the global point of reference but in out transformations we use model space and then transform it to world space.
* in a parent child relationship, child is oriented in respect to the parent and then transformed to world space
* if we put a transfromation after the orher we transform with respect of the view of the world of the previous transform,ation
* first matrix to the right of a given set of transformation matrices transfrorms the object with respect to the ranformations to the left (wtf ?!? it should be th eoposite). actually he derives this from MxMwMh so that h transforms in relation to the parents (on the left) fram of reference.
* You may want to try the Euler angle demo in Lesson 4 again to see how the X rotation controls the other two rotations, since it is applied last. By changing X, you change the frame of reference for how Y and Z rotation are applied.

### Scale matrix and normal

* A scale matrix is an identity matrix with the 1s (except the last one) multiplied by the scale factor. the 11 element is Sx factor , the 22 element the Sy factor and the 33 element the Sz factor.
* scaling can mess up normals. we are no jst transforming points with Matrices, we are transforming shading normal as well
* running normals through a traslation matrix leaves them unaffected. they are vectors. also a rotation matrix do not affect them as they are rotated to the new frame of reference.
* if we uniformally scale an object with the matrix the normals are scaled to . we need to r enormalize them before using them
* if we non-uniformalyy scale objectts the normal vector gets stretched in one direction and is not perpendicular any nmore. 
* to solve the problem we need to inverse and transpose a matrix.

### Transpose and Inverse

* Matrix Transpose (M^T) with its columns and rows flipped along the diagonal. another way to define it is that its columns become the rows of the transposed matrix.
* the inverse of the matrix has the following property: (Matrix M)(Inverse of Matrix M) = Identity Matrix (MM-1) = I
* the inverse of a transform matrix undoes its effects
* inverse of a translate matrix with Tx,Tx,Tz is the same byt with -Tx,-Ty,-Tz undoing its effect.
* for rotation matrix the inverse is the transpose matrix.
* for scale matrix the inverse is multiplicative inverse.
* the inverse of a matrix represinting various transformations is not obvious.
* all graphics libs have matrix inverse: `Matrix4.getInverse(mtx)`

### Correct Normal Transformation

* we have aproblem with transforming normal when using non-uniform scaling matrices. in that case we need to use the transpose of the inverse of the Transformation matrix (TI) or the invers of the transpse (IT)
* if thr transform matirx is transaltion we dont care as it does not affect vectors
* if it is a rotation matrix the transpose is inverse. so the transpose of the inverse so the inverse of the inverse so the same matrix. 
* for scale if it is uniform we just normalize again the normal as it will be scaled.
* the traspose of the nverse is based on contravariant and covariant vectors.

### Mirroring

* a transformation matrix worth mentioning is the mirroring matrix. it is an identity matrix where one of the diagonals is -1 and the rest 1. the object is mirrored allong the axis that is -1. another way is by `mtx.scale.z = -1;`
* a problem is that the order of faces is reversed so if we use backface culling we need to reverse it or we will have problem. if the order is ccw i nthe mirrored is cw
* so if we the original frame is right-handed the mirrored is left-handed.
* to see if an obect uses mirroring we use: `if(mtx.determinant()<0){console.log("mirror used");}`

### Quiz: Mirror Normal Transform

* what happens to normals if they transformed by the same mnirroring matrix used for transforming points? all the time

### Matrix ZOnes

* the upper left 3by3 part of the 4by4 transformation matrix contains the linear transformation (rotations and scales). multiplication and addition is preserver in the linear part
* the upper right corner (3by1 column) holds the translations. translation  values get affected by multiplications with other matrices. translations affect only points.
to extract T,R,S from a matrix in 3js we use `mtx.decompose(t,r,s)` t and s are returned as vectors, r as a quaternion ( we will learn abou it in animation). quaternion is a compact way to store the angle and axis of rotation for a rotation matrix. quaternions can be easily interpolated between tehm. to interpolate between different rotations.
* bottom row is always 0,0,0,1. the trasforms we lokked into in this chapter are affine transforms. parallel lines stay parallel when affine transformations are applied. in modeling we always use affine trasforms
* when we use perspective cameras we use the last row which we call projective transform

### Summary

* webgl and 3js are in column order
* TRSO - we apply transform matrices right to left
* frame of reference is applied left to right
* (ΤR)S=T(RS)  matrices are associative
* TR != RT marices are not (usually) commutative

## Lesson 12 - Problem Set

### 1.Quiz:Transpose of a Translation

* the transpose of a translation matrix is a projective matrix

### 3.Quiz: Cylinder Positioning

* 3JS creates canonical objects. this is when you create an object around a point of origin and use transformations to move it into position.
* for some kinds of modeling we need another apporach. id we want a chain of cones to build a tree. we need to define where the end of each cone will be located. this type of modeling when we ganerate an object with a program is called procedural moeling.
* in the cullen routine the top and bottom variables are  are Vector3 positions given the ends of the cone. we will have descriptions for other vars in the code. this function has a special case o the cross product.
* we have to create the proper length cylinder and feed this method its axis direction and center.

* my solution

```
// Dummy settings, replace with proper code:
	var length = new THREE.Vector3().subVectors(top,bottom).length();
	var cylAxis = new THREE.Vector3().subVectors(top,bottom).normalize();
	var center = new THREE.Vector3(bottom.x + (top.x-bottom.x)/2,bottom.y + (top.y-bottom.y)/2,bottom.z + (top.z-bottom.z)/2);
```

* teachers solution

```
// get cylinder height
var cylAxis = new THREE.Vector3();
cylAxis.subVectors(top,bottom)
var length = cylAxis.length();

// get cylinder center for transaltion
var center = new THREE.Vector3();
center.addVectors(top,bottom);
center.divideScalar(2.0);
```

### 4.Quiz: Capsule

* once we sorted out how to place cones and cylinders, a handy method to write is one that creates capsules (cheese logs). capsule is a cylinder with a sphere covering eachend
* we use instance. one geometry object for each end

* Mycode

```
	// YOUR CODE HERE
	// Here's a sphere's geometry. Use it to cap the cylinder if
	// openTop and/or openBottom is false. Bonus points: use instancing!
	var sphGeom = new THREE.SphereGeometry( radius, segmentsWidth, segmentsWidth/2 );
	for(var i=0;i<2;i++) {
		var sphere = new THREE.Mesh(sphGeom, material);
		if(i%2) {
			if(!openTop) {
				sphere.position = top;
				scene.add(sphere);
			}
		} else {
			if(!openBottom) {
				sphere.position = bottom;
				scene.add(sphere);
			}
		}
```

* teachers solution

```
var capsule = new THREE.Object3D();
capsule.add( cyl );
if ( !openTop || !openBottom ) {
    // instance geometry
    var sphGeom = new THREE.SphereGeometry( radius, segmentsWidth, segmentsWidth/2 );
    if ( !openTop ) {
        var sphTop = new THREE.Mesh( sphGeom, material );
        sphTop.position.set( top.x, top.y, top.z );
        capsule.add( sphTop );
    }
    if ( !openBottom ) {
        var sphBottom = new THREE.Mesh( sphGeom, material );
        sphBottom.position.set( bottom.x, bottom.y, bottom.z );
        capsule.add( sphBottom );
    }
}
return capsule;
```

### 5.Quiz:Helices

* once we have capsules in our arsenal we can make all sorts of stringy objects. 
* we have helices of spheres. our goal is to make helices of capsules
* where two capsules touch we make one sphere not 2.
* also wemake sure that both ends of helix have spheres on them.
* we should not compute both points for each capsule in each loop iteration
* its more efficient if on each iteration we compute one of the points.
* we can increase radial segment to make them smoother
* my solution

```
	var top = new THREE.Vector3();
	var prevTop = new THREE.Vector3();
	var sine_sign = clockwise ? 1 : -1;
	var capsule

	///////////////
	// YOUR CODE HERE: remove spheres, use capsules instead, going from point to point.
	//
	var sphGeom = new THREE.SphereGeometry( tube, tubularSegments, tubularSegments/2 );
	for ( var i = 0; i <= arc*radialSegments ; i++ )
	{
		prevTop.copy(top);
		// going from X to Z axis
		top.set( radius * Math.cos( i * 2*Math.PI / radialSegments ),
		height * (i/(arc*radialSegments)) - height/2,
		sine_sign * radius * Math.sin( i * 2*Math.PI / radialSegments ) );
		if(i<=0) {w
			var sphere = new THREE.Mesh( sphGeom, material );
			sphere.position.copy( top );
			helix.add( sphere );
		} else {
			console.log(top,prevTop);
			capsule = new createCapsule(material, tube, top , prevTop , tubularSegments, false, true);
			helix.add(capsule);
		}
	}

```

* teacher solution

```
var helix = new THREE.Object3D();
var bottom = new THREE.Vector3();
var top = new THREE.Vector3();
var openBottom = false;
var openTop = false;
var sine_sign = clockwise ? 1 : -1;
bottom.set( radius, -height/2, 0 );
for ( var i = 1; i <= arc*radialSegments ; i++ )
{
    // going from X to Z axis
    top.set( radius * Math.cos( i * 2*Math.PI / radialSegments ),
        height * (i/(arc*radialSegments)) - height/2,
        sine_sign * radius * Math.sin( i * 2*Math.PI / radialSegments ) );
    var capsule = createCapsule( material, tube, top, bottom, tubularSegments, openTop, openBottom );
    helix.add( capsule );
    // after first capsule is laid down, don't need to draw sphere for bottom.
    openBottom = true;
    // make top of previous capsule the bottom of the next one
    bottom.copy( top );
}
return helix;
```

* note that we cannot just copy points with = as this copies memory position. we must use `newpoint.copy(oldPoint)` 

### 6.Quiz:Revisiting the Drinking Bird

* add eyes , nose and crossbar to the bird

```
	// YOUR CODE HERE
	// Add a crossbar support, a nose, and eyes.
	// Crossbar: use crossbarMaterial and
	//   THREE.CylinderGeometry( XX, XX, XX, 32 ) for the tessellation.
	//   The cylinder should have a radius of 5, length 200 and be at height Y=360
	//   and rotated 90 degrees into position.
	cylinder = new THREE.Mesh(
		new THREE.CylinderGeometry(5,5,200,32), crossbarMaterial);
	cylinder.position.y = 360;
	cylinder.rotation.x = Math.PI/2;
	scene.add(cylinder);
	// Nose: use headMaterial and
	//   THREE.CylinderGeometry( XX, XX, XX, 32 ) for the tessellation.
	//   The cone should have a radius of 6 at the tip, 14 at the bottom, height 70
	//   It should be rotated 90 degrees and put into position at -70, 530.
	cylinder = new THREE.Mesh(
		new THREE.CylinderGeometry(6,14,70,32),headMaterial);
	cylinder.rotation.z = Math.PI/2;
	cylinder.position.x = -70;
	cylinder.position.y = 530;
	scene.add(cylinder);
	// Eyes: use eyeMaterial and
	//   THREE.SphereGeometry( XX, 32, 16 ) for the tessellation.
	//   Each sphere should have radius of 10 and be moved to X=-48, Y=560,
	//   then rotated 20 degrees left and right to make a pair.
	var spherGeom = new THREE.SphereGeometry( 10, 32, 16 );
	for(var i=0;i<2;i++)  {
		sphere = new THREE.Mesh(spherGeom,eyeMaterial);
		sphere.position.x=-48;
		sphere.position.y= 560;
		var eye = new THREE.Object3D()
		eye.add(sphere);
		(i%2)? eye.rotation.y = Math.PI/9:eye.rotation.y = -Math.PI/9;
		scene.add(eye);
	}
```

* remember that to twist the order of trasformation we must use OBject3D wrapper

## Lesson 13 - Lights

### Photons as Particles

* photons are emitted by light source, are reflected or absorbed on surfaces and are ariving to the eye. 
* even mirror does not reflect 100% the photons. only 90,95%
* light is absorbed in its way by water drops, dust, particles in the air
* a simple light model ignores effects like polarization or fluorescence.
* we allow light filters to alter the color.

### Directional Lights

* light emitters can have any form as the effect of light is computed invertex or fragment shading.
* the simplest form of light is the directional light.
* this type of light is described only by the direction vector
* a real directional light is the sun. it is considered infinite far away and the direction to the sun is the same for every object on earth.
* in 3js the directional light is a light point we can move around. in reallity we change the direction vector not the location of the light.
* in some libraries we can set negative value to light intensity as it absorbs light from objects
* in 3JS we use light intesity between 0 and 1. over 1 is acceptable but beyond monitor abilities.

### Directional Lights in Three.JS

* a sample code to add a directional light

```
var light = new THREE.DirectionalLight(0xFFFAAD, 0.7); //set light color and intensity
light.position.set(200,500,600); // set light position in scene in realtion to frame of reference, actually the light direction vector from position to origin (0,0,0)
scene.add(light);
```

### Quiz: Set Directional Light

```
	var light = new THREE.DirectionalLight(0xFFFFFF, 1.5); 
	light.position.set(-200, 200, -400); 
	scene.add(light);
```

### A point light

* for a point light we define a position in space and it emmits light in all directions. we set color and intensity like directional light
* its different from real world light as dsistance does not affect brightness. attenuation is not done for sake of vision. its easier to see a scene with point lights if there is no drop off with distance.
* we can use equations for how light is attenuated with distance.
* 3JS supports only one drop off mode, defien maximum distance. it turns light o zero

### Ambient Lighting

* ambient light in reality drops off at the square of the distance. we dont use that as in artificial scene light doesnt bounces off , only lights what it hits.
* in 3js scen we create artificial indirect illuminations with ambinet light `scene.add(new THREE.AmbientLight(0x222222);` . this is a fudge factor
* the ambient color is blended with the materials ambient color to give a solid fill color

```
var someMaterial = new THREE.MeshLambertMaterial();
someMaterial.color.setRGB(0.8,0.2,0.1);
someMaterial.ambient.copy(someMaterial.color);
```

* if dont add ambient color to matrial the default is white and scene ambient will add grey to the object.
* its better if material ambient color matches the diffure color.

### Quiz:Head Light

* replace the ambient light in drinking bird scene with poiint light

```
var light = new THREE.PointLight(0xFFFFFF, 1.0);
light.position.set(1000,1000,1000);
scene.add(light);
```

* we want to place the pointlight at camera position (like miner's light)
* the function below is called every time a new image is to be rendered(e.g when we move the camera)
* both camera and light derive from Object3D. so we copy position before render. `headlight.position.copy(camera.position);`

```
function render() {
	var delta = clock.getDelta();
	cameraControls.update(delta);
	renderer.render(scene,camera);
}
```

### Spot Light

* in 3js a spotlight is similar to real world. you shine this type of light on sthing to make it the center of attention.
* it is like apoint light because it has a position. 
* it is like directional like because it points somewhere.
* its difference is the cone of light it forms. the control parameter in3js is the angle where the cone ends (spotlight). also there is a fall off exponent like a specular light. as we increase it the light gets tighter
* id 3dstudio max spotlight it has a double cone with inner cone called hotspot.
* in 3js there only 1 ambient light but as many spotlights,pointlights and directional lights we want.

### Quiz: SpotLight in 3JS

* replace drinking biird scene directional with a spotlight: (color: full white, intesity: 1.5, location: -400,1200,300 , angle: 20deg, expo: 1, target position: 0,200,0)
* 

```
	var light = new THREE.SpotLight( 0xFFFFFF, 1.5);
	light.position.set( -400, 1200, 300 );
	light.angle = Math.PI/9;
	light.exponent = 1;
	light.target.position.set(0,200,0);
	scene.add( light );
```

### Deferred Rendering

* having more and more lights takes a toll the GPU. each light must be evaluated for surface shading. 
* a solution to it is deferred rendering
* normally we render a surface, and the fragment color for each pixel is stored, if its the closest visible object. this is forward rendering.
* in deferreed rendering we store data of some sort in each pixel.
* there are variations with nameslike defered shading or defered lighting.
* a variation stores position,normal, material color and shininess at each pixel. we also draw in the z-buffer
* with defered buffering every point light has an upper limit of how far its light goes. this forms a sphere around the light
* each surface that is in the sphere is affected by the light. other shapes are used too,

### Shadow mapping

* an objects shadow established its location in respect to surroundings
* rasterization focuses on triangles rendered from the eye. we have to eork to generate shadows
* a technique is shadow mapping. the scene gets rendered from the point of view of the light. what the light sees is lit. if the light doesnt see the surface it is in shadow.
* in 3js the only lights capable of casting shadows are spotlights and directiona lights. for directional lights we specify how the light extends.

### Quiz: ShadowBuffer Characteistics.

* Shadow map algorithm creates a shadow image of a scene from the lights view called shadow buffer. the image is like a z-buffer

### Shadows in 3JS

* to enable shadows in 3jS. we enable shadow map in render and tell spotlight to cas shadows. for each object we have choice to cast or not shadow. and receive or not shadows from other objects. 
* this has to be done on each geometry/mesh not on the parent element (e.g Object3D)
* 3JS has traversal method to go through an object and its children and enable them in batch

```
renderer.shadowMapEnabled = true; 
spotlight.castShadow = true;
cube.castShadow = true;
cube.receiveShadow = true;

bbird.traverse(function (object) {
	object.castShadow = true;
	object.receiveShadow = true;
});

// better traverese
bbird.traverse(function (object) {
	if(object instanceof THREE.Mesh) {
		object.castShadow = true;
		object.receiveShadow = true;
	}
});
```

* its a good practice for testing to render the light source.
* solution:  add this line of code after creating the renderer in init(): renderer.shadowMapEnabled = true; In fillScene(), add this line after creating the spotlight: spotlight.castShadow = true; And add this line after creating solidGround: solidGround.receiveShadow = true;

### Shadow Buffer Limitations

* [summary](http://resources.mpi-inf.mpg.de/ShadowCourse/)
* [techniques](http://codeflow.org/webgl/shadow-mapping/)
* with shadows we see patterns on the objects which are intense when the light is brighter.
* shadow mapping algo works by seeing the world by the lights point of view. the depth image form is then checked  during normal rendering. the depth of the surface visible at a point is compared with the transformed depth  of the shadow map buffer holds. this creates trouble.
* the pixels of the  lights view don match entirely with the camera view.
* this creates surface acne (black patches on a surface)
* the ligh view says the surdface is 3.8m away of the light, the camera view says the surface is 3.81m away from light, as 3.81>3.8 the surface is considered in shadow
* a solution is shadow bias. this has a peter pan effect with the object detaching from its shadow.

### Ray Tracing

* so far we have implemented local illumination models where the object is affected by light and the result is sent to the eye. light comes only from light sources, no loght is reflected from other objects.
* there are many more light tracks that can be tracked.
* a rendering technique that simulates this is called ray tracing.
* [demo](http://hoxxep.github.io/webgl-ray-tracing-demo/)
* we saw how GPU sent each triangle to screen and rasterizes it.
* ray tracing fires rays from the eye through each pixel. objects are tested against each ray. the closest object found across the rays path is the one used to compute the ray color contribution.
* we can think of each ray from the eye as rendering one by one pixel.
* to find the closest object to this pixel is to send every triangle to the pipeline and try to rasterize it and use z-buffer fro finding closest object. this is SLOW.
* reaserch tried to optimize finding the closest object along the ray
* rasterization is fast because each triangle covers many pixels.
* in its simplest form ray tracing is similar to rasterization. ech ray finds the losest object along it. the effect of ligh on the surface s computed, result is displayed. for light to pass we assume that other objects dont block or reflect light
* to add shadows with ray tracing we shoot  a ray from object to the light. if it finds an object blocking light is ignored. 
* ray tracing enables to create true reflection in glass effects. for shining surfaces we spawn a ray in the direction of light reflection, what his ray hits is whats reflected in the surface. we spawn rays untill we hit a limit (WTF?!?)

### Ray Tracing history and limit

* many algorithms, paul herbert, [256byte tube](http://www.pouet.net/prod.php?which=3397) [mr.doob interview](http://www.realtimerendering.com/blog/interview-with-three-js-creator/)

### Quiz:What is missing

* ligt->object-diffuse object, light->mirror->object

### Path Tracing

* one way to track the various ways the light can take to reach the eye, is to shoot more rays per pixel, bounce them around in hope of finding light sources. this is called path tracing.
* it is noisy to begin with but gives good results given the time.
* [demo](http://madebyevan.com/webgl-path-tracing/)[wiki](https://en.wikipedia.org/wiki/Path_tracing)
* this demo uses progressive rendering, shooting more and more rays and blending the result.
* [photon mapping](https://en.wikipedia.org/wiki/Photon_mapping)[minecraft](http://www.realtimerendering.com/erich/minecraft/public/chunky/jpegs/)
* a pure path tracer is stragihtforward. we shoot more rays in sensible directions and sum up ther light contributions found. we shoot 10^5 rays per pixel or more. the more processing the better quality. photon maPPING and bidirectional traCINGtry to get the best of both worlds. the idea is to send rays from light emitters using rays depositing radiance where rays reach. scene is retraced from acamera point of view and light is gathered. path tracing can give uparallel realism given the the time. it is an actual light simulation,

### Umbra and Penumbra

* basic shadow techiques miss how lights trully cast shadows. all lights have an area. but shadow mapping assumes that light comes from a point far away. unless light is indeed a point (no bulb diffusion)
* the real shadow behind the object is umbra. it is when the light cone between object and light area is cut by surface, the area tha is not fully lit nor shadowed is penumbra.
*  in a point of penumbra tge light that is visible correlates to how much light the location receives. so we set a vector of the point to one edge of area light and the other to the line defined by the point and object surface. this vector splits the light area in 2,. the area of light forming a cone to the point is the %

### David Larsson Intro

* developer of beast engine for games. (also in demo scene). illumination labs.

### Shadow Summary

* soft shadows are closer to reality (umbra, penumbra). when light close to ocluder more hard shadows.

### Indirect Lighting

* if you look at the shadows in this scene we see they are completely black. this is wrong., in reality nothing is completely black. we add ambient light to compensate for that. with ambient light shadows still look flat. objects are not distinguishable.
* what we see is the light from light sources reflected into our eyes. but only a fraction of the light reflected on surfaces.
* this bounced indirect lighting is important to the scene. with it simulated the scene looks realistic. light bounce from surface to surface while reflecting. with each bounce the light gets weaker.
* a surface absorbs all but the component of light of its color which gets reflecgted.

### Global illumitaion

* global illumination is when one object affects others appearancce.

### Hemisphere lights

* one light source in 3JS that attempts to simulate the surrounding bounced light in scene is the hemisphere light. it is considered as surrounding the scene lighting from every direction.
* it is like ambient light but: we assign a different color to the top and a different to the bottom.
* each objects normals determine the color light it receives from this source. any direction between top and vbottom gives a blend of the two colors. ( an  elaborate type of it is diffuse map)

### Skylighting.

* a light we take for granted and not consider it as a source is the sky. in outdoor scen it gives the ambient light.
* in simulation shadows take a blue touch. without sun sky shadow is dark blue
* in most scenes treat sun and sky as two different cointributors. sky color sets mood. 
* proper sky in interactive scenes is hard and performance expensivce

### Fog 

* a phenomenon between camera effect and light is fog. in real life fog is light absorbed and diffused by the atmosphere.
* inb 3JS we have 2 forms of fog. linear fog (min distance=fog starts, max distance = fog covers all). or exponential. we specify density particles. a demo called god rays (beams of light)
* [godrays](https://github.com/mrdoob/three.js/blob/master/examples/js/ShaderGodRays.js)
* [demo](https://threejs.org/examples/#webgl_geometry_terrain_fog)

## Lesson 14

### 1.Quiz:Omni Light

* omni light in 3JS is a point light

### 2.Quiz:Swivel Light Control

* vary the light x and z direction by the cosine and sine of the angle

```
function render() {
	var delta = clock.getDelta();
	cameraControls.update(delta);
	light.position.set( Math.cos(effectController.angle*Math.PI/180), 1, Math.sin(effectController.angle*Math.PI/180));
	scene.add( light );
	renderer.render(scene, camera);
}
```

* note we need to add a parametrical code in render that gets called when we change parameters.

### 3.Quiz:Swivel and Tilt Light COntrol

* the lights direction x^2+y^2+y^2=1   (cosθ)^2+(sinθ)^2=1
* in astronomy altitude is the vertical angle from the observerbetween horizon and star. azimuth is the horizontal angle on horizon from north to star

```
function render() {
	var delta = clock.getDelta();
	cameraControls.update(delta);
	// altitude
	light.position.y = Math.sin( effectController.altitude * Math.PI/180.0 );
	// azimuth
	var length = Math.sqrt(1 - light.position.y*light.position.y);
	light.position.x = length * Math.cos( effectController.azimuth * Math.PI/180.0 );
	light.position.z = length * Math.sin( effectController.azimuth * Math.PI/180.0 );
	scene.add( light );
	renderer.render(scene, camera);
}

```

### 4.Quiz: Ligtht Characteristics

* ambient: color
* directional: color,intensity,direction
* point (positional), color,intensity
* spot: color,intensity,direction

### 5.Quiz.Disapearing SPotlight

* in the spotlight exercise. the surface has shadow and sptlight umbra. this is a Phong material. if we change to lambert spotlight sdisapears, shadow remains. this is because spotlight is evaluated per vertex not pixel. lambert is evaluated per vertex. surface has 4 corners outside the spotlight so in lambert is skipped. we can fix that with many triangles in surface but thats process expensive

## Lesson 15 - Cameras

### Intro to cameras

* there are different ways to view the world. fisheye lens, perspective view and orthographic  projection

### Orthographic Projection

* like a 2d cad. a 3d projection in 2d. like cad views. its not like we usually percieve the world, it can create optical illusions.

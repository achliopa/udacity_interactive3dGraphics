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
* we touch points and lines briefly.
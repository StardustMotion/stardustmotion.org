import Utilities from "../utilities/Utilities.js";


// an utility class
// contains functions to generate in-game things
// such as crates, doors, etc
export default class ThingFactory{

    static seaStackMeshes = [];
    static timeCrateImpactAction = {
        
    }
    //static boatMeshes = [];

    constructor(scene, obstacles){
        this.scene = scene;
        this.obstacles = obstacles;

        // creates the asset manager ("loader"). From what I understood its purpose is to
        // load ressources, so we use it slyly before the game starts
        this.loader = new BABYLON.AssetsManager(scene);

        // we add a new task to the loader : pls load the sea stack model
        var seaStackTask = this.loader.addMeshTask("tesmochefilsdepute",
            "", "./model/", "sea_stack.obj");
       /* var boatTask = this.loader.addMeshTask("joli bato",
        "", "./model/", "boat.glb");*/

        seaStackTask.onSuccess = function (task) {
            var seaStackTexture = new BABYLON.Texture("./textures/sea_stack.png", scene);
            seaStackTexture.vScale *= 4
            seaStackTexture.uScale *= 4
            var seaStackMaterial = new BABYLON.StandardMaterial('dat_rock', scene);
            seaStackMaterial.diffuseTexture = seaStackTexture;
            
            let daMeshes = task.loadedMeshes
            for (let i = 0; i < daMeshes.length; i++) {
                let daMesh = daMeshes[i]


                

                daMesh.material = seaStackMaterial;
                daMesh.isVisible = false;
                ThingFactory.seaStackMeshes.push(daMesh);   
            }
        };

        // executes the tasks given to the loader. Needed else they can't succeed
        this.loader.load();

    };


    createTimeCrate(size, power, scene) {


        let columns = 2;
        //let rows = 1;
        let faceUV = new Array(6);

        // faceUV[i] = new BABYLON.Vector4(i / columns, 0, (i + 1) / columns, 1 / rows);
        for (var i = 0; i < 6; i++) {
            faceUV[i] = new BABYLON.Vector4(1 / columns, 0, (1 + 1) / columns, 1);
        }
        faceUV[4] = new BABYLON.Vector4(0, 0, 1 / columns, 1);
        //timeCrate.checkCollisions = true;
        let options = {
            wrap: true,
            faceUV: faceUV,
            size: size
        }

        var timeCrate = new BABYLON.MeshBuilder.CreateBox("timeCrate", options, scene);
        var timeCrateTexture = new BABYLON.Texture("./textures/crates/crate" + parseInt(power) + ".png", scene);

        var timeCrateMaterial = new BABYLON.StandardMaterial('timeCrate', scene);
        timeCrateMaterial.diffuseTexture = timeCrateTexture;
        timeCrate.material = timeCrateMaterial;
        var returnCrate = {
            mesh: timeCrate,
            size: size,
            power: power,
            isRemoved: false,
            floatVal: Math.random() * Math.PI * 2
        }
        return returnCrate;

    };

    // if linear is TRUE the gate moves with a fixed speed.
    // if FALSE the gate accelerates, then decelerate on direction switch
    // SPEED is how fast... the gate moves.
    // RANGE is how far... the gate goes.
    // The best is just to try some values until you get what you want
    createGate(size, speed, range, linear, xPos, scene) {
        let daLight = this.createCustomLight("gateLight", 0, 0, 1, scene);
        var gate = BABYLON.MeshBuilder.CreateCylinder("gate",
            { diameterTop: size, diameterBottom: size, height: size * 7, tessellation: 96 }, scene);
        // Add the particle effect to the gate
        aestheticGate(gate, scene);
        gate.material = daLight;
        gate.position.x = xPos;
        let returnGate = {
            mesh: gate,
            floatVal: Math.random() * Math.PI * 2,
            linear: linear,
            speed: speed,
            range: range,
            initialX: xPos,
            isRemoved: false
        }
        return returnGate;

    };


    // type = the mesh model
    // size = xyz scaling
    createSeaStack(type, size) {
        let newSeaStack = ThingFactory.seaStackMeshes[type-1].clone()
        newSeaStack.scaling = new BABYLON.Vector3(size, size, size);
        // naughty way of copying an object
        //let newStack = JSON.parse(JSON.stringify())
        newSeaStack.isVisible = true;
        newSeaStack.checkCollisions = true;


        // 0.8 means the hitbox is 80% as big as original model
        /*let leBonSaucissonDeNosRegions = newSeaStack.getBoundingInfo().boundingBox
        let batonDeBergerWilliamSaurin = 0.2;
        switch(type) {
            case 1:
                batonDeBergerWilliamSaurin = 0.85;
                break;
            case 2:
                batonDeBergerWilliamSaurin = 0.75;
                break;
            case 3:
                batonDeBergerWilliamSaurin = 0.82;
                break;
            case 4:
                batonDeBergerWilliamSaurin = 0.01;
                break;
            case 5:
                batonDeBergerWilliamSaurin = 0.01;
                break;
            default:
                break;
        }
        let theX = (Utilities.meshXwidth(newSeaStack)/2) * batonDeBergerWilliamSaurin
        let theZ = (Utilities.meshZwidth(newSeaStack)/2) * batonDeBergerWilliamSaurin
        leBonSaucissonDeNosRegions.maximum.x -= theX
        leBonSaucissonDeNosRegions.maximum.z -= theZ
        leBonSaucissonDeNosRegions.minimum.x += theX
        leBonSaucissonDeNosRegions.minimum.z += theZ
        newSeaStack._boundingInfo = new BABYLON.BoundingInfo(leBonSaucissonDeNosRegions.minimum, 
            leBonSaucissonDeNosRegions.maximum);

                /*
                // VERY CHEAP WAY to a bit fix the square hitbox problem
                // Scale up bounding box
                
                var bbox_before = newSeaStack.getBoundingInfo().boundingBox.minimumWorld.clone();
                
                // log into the webbrowser console
                console.log(newSeaStack.getBoundingInfo().boundingBox.minimumWorld);
                
                // Scale up bounding box
                var minimum = newSeaStack.getBoundingInfo().boundingBox.minimum.clone();
                var maximum = newSeaStack.getBoundingInfo().boundingBox.maximum.clone();
                var scaling = BABYLON.Matrix.Scaling(0.8, 0.8, 0.8);
                
                minimum = BABYLON.Vector3.TransformCoordinates(minimum, scaling);
                maximum = BABYLON.Vector3.TransformCoordinates(maximum, scaling);
                newSeaStack._boundingInfo = new BABYLON.BoundingInfo(minimum, maximum);
                newSeaStack.computeWorldMatrix(true);
                console.log(newSeaStack.getBoundingInfo().boundingBox.minimumWorld);
                            
                 */
                
                ///// !!!! show the sea stack hitbox
                 //newSeaStack.showBoundingBox = true;




        this.obstacles.push(newSeaStack);
        return newSeaStack;

        //console.log(this.seaStackMeshes);
        //return this.seaStackMeshes["rock1"]
        /*const meshTask = loader.addMeshTask("tesmochefilsdepute",
        "rock_0" + seaStackType, "./model/", "sea_stack.obj");
        let theMesh;
        
        meshTask.onSuccess = function (task) {
            theMesh = task.loadedMeshes[0];
            theMesh.checkCollisions = true;
            obstacles.push(theMesh)
        };
        console.log(theMesh)
        loader.load();
        BABYLON.OBJFileLoader.OPTIMIZE_WITH_UV = true;
        return theMesh;*/
    };


    /*
    createSeaStackPoly(scene, obstacles, stackSize, stackHeight) {
        let theObjectMaterial = new BABYLON.StandardMaterial("seastack", scene);
        theObjectMaterial.diffuseTexture = new BABYLON.Texture("./textures/sea_stack.png")

        theObjectMaterial.diffuseTexture.uScale *= 2
        theObjectMaterial.diffuseTexture.vScale *= 2

        let theObject = BABYLON.MeshBuilder.CreateBox("nicerock",
            { width: stackSize, depth: stackSize, height: stackHeight, updatable: true }, scene);
        // if the line below is removed the edges of the rock disappear
        theObject.forceSharedVertices();
        theObject.increaseVertices(80);
        theObject.applyDisplacementMap("./textures/sea_stack_hm.png", 0, 5, null, null, null, true)
         BABYLON.Mesh.CreateGroundFromHeightMap(
             "seastackHM", "./textures/sea_stack_hm.png", 
             // width and height of mesh (X and Z axis)
             200, 200, 
             // number of subdivisions (surface accuracy, bigger number = more accurate)
             300, 
             // minimum, maximum height (height is Y axis)
             1, 50, scene, false);
         theObject.rotate(BABYLON.Axis.X, Math.PI/2, BABYLON.Space.WORLD);
        theObject.material = theObjectMaterial;

        obstacles.push(theObject)

        var returnObject = {
            mesh: theObject,
            height: stackHeight
        }
        return returnObject;
    };*/



    // not really meant to be used directly... usually... or is it?
    createCustomLight(id, r, g, b, scene) {
        BABYLON.Effect.ShadersStore[id + "customVertexShader"] = 'precision highp float;  attribute vec3 position; attribute vec3 normal; attribute vec2 uv;  uniform mat4 worldViewProjection; uniform float time;  varying vec3 vPosition; varying vec3 vNormal; varying vec2 vUV;  void main(void) {     vec3 v = position;     gl_Position = worldViewProjection * vec4(v, 1.0);     vPosition = position;     vNormal = normal;     vUV = uv; }';
        BABYLON.Effect.ShadersStore[id + "customFragmentShader"] = `
                    #extension GL_OES_standard_derivatives : enable
                    precision highp float;   
                                
                    // Varying
                    varying vec3 vPosition;
                    varying vec3 vNormal;
                    varying vec2 vUV;
    
                    // Refs
                    uniform vec3 color;
                    uniform vec3 cameraPosition;
                                
                    
                    void main(void) {          
                        float x = vUV.x;
                        float y = vUV.y;
                        vec2 uv = -1. + 2. * vUV;
                        float a = 1. - smoothstep(-.9, 0.9, abs(uv.x)); //*(1.-vUV.y))*1.);
                        float b = 1. - pow(0.1, vUV.y);
                        vec3 col = vec3(`+ r + `,` + g + `,` + b + `);
                        gl_FragColor = vec4(col, 0.2);
                    }`;


        var gateLight = new BABYLON.ShaderMaterial("shader", scene, {
            vertex: id + "custom",
            fragment: id + "custom",
        },
            {
                needAlphaBlending: true,
                attributes: ["position", "normal", "uv"],
                uniforms: ["time", "worldViewProjection"]
            });

        return gateLight;
    };

}














/************** RESSOURCES USED FOR THINGFACTORY **********/





// Create a particle effect fountain. Solely made for the gates you have to enter
// Later, we should maybe avoid remaking the whole particle system for each gate, since it's the same
function aestheticGate(theGate, scene) {

    var particleSystem = new BABYLON.ParticleSystem("particles", 100, scene);
    particleSystem.particleTexture = new BABYLON.Texture("./textures/flare.png", scene);
    particleSystem.emitter = theGate;
    particleSystem.minEmitBox = new BABYLON.Vector3(50, -3, 50);
    particleSystem.maxEmitBox = new BABYLON.Vector3(-50, 200, -50);
    particleSystem.color1 = new BABYLON.Color4(0.0, 0.0, 1.0, 1.0);
    particleSystem.color2 = new BABYLON.Color4(0.3, 0.2, 0.8, 1.0);
    //particleSystem.colorDead = new BABYLON.Color4(0, 0, 0.2, 0.0);
    particleSystem.minSize = 5.0;
    particleSystem.maxSize = 12.0;
    particleSystem.minLifeTime = 1.0;
    particleSystem.maxLifeTime = 2.0;
    particleSystem.emitRate = 50;
    particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
    particleSystem.gravity = new BABYLON.Vector3(0, 0, 0);
    particleSystem.direction1 = new BABYLON.Vector3(4, 2, -4);
    particleSystem.direction2 = new BABYLON.Vector3(-4, 12, 4);
    //particleSystem.minAngularSpeed = 0;
    //particleSystem.maxAngularSpeed = Math.PI;
    //particleSystem.minEmitPower = 1;
    //particleSystem.maxEmitPower = 5;
    particleSystem.updateSpeed = 0.01;
    particleSystem.isLocal = true;
    particleSystem.start();

}
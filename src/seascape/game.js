import BabylonGUI from "./gui/BabylonGUI.js";
import GuiGame from "./gui/GuiGame.js";
import Utilities from "./utilities/Utilities.js"
import AudioManagerBabylon from "./audioManager/AudioManagerBabylon.js"
import AudioGame from "./audioManager/AudioGame.js"
import GameLogic from "./core/GameLogic.js"
import EntityBabylon from "./core/EntityBabylon.js"
import Vehicle3D from "./core/Vehicle3D.js";
import ThingFactory from "./core/ThingFactory.js"




// time IN SECONDS to finish the level
const timer = 69

var canvas = document.getElementById('renderCanvas');
var engine = new BABYLON.Engine(canvas, true)

// scene
var scene;


// target of the missiles
var pointMissiles = []
// missile
var missiles = [];
// function to launch missil in an interval of each 7 seconds
var missileInterval;
// number of missiles to launch
var numberMissiles = 2;

var map = {}


//turret
var turrets = []
var behaviorsTurret = []
// OUR BOAT is our boy
var boatEntity;
var boatHitbox; // an invisible square around the boat for collision detection
var boatHitboxSize = 25 // it's a SPHERE. this is the hitbox size (diameter).
var hitboxStamina = false; // if true, the boat hitbox is stuck in at least 1 other solid
var hitboxStaminaLastFrame = false; // same but for the previous frame (both are compared to do stuff)


/******** Create gates *******/
var gates = []
var gatesVariation; // the function which makes gates move
// the first gate's Z position :
var baseFirstGate = -2500;

//MUSIC
var audioManager;
// keypad

//collision
var collisionWithObstacle = false
// gates
var numberGates = 15
var numberGatesPassed = 0

var maxPositionGate = 600;
var timerDirection;
var timeChangeDirection = 0;

// function interval
var timerInterval;
// gui 
var babylonGUI = new BabylonGUI(BABYLON.GUI)

// gui text
var textPassed = new BABYLON.GUI.TextBlock();
var textStart = new BABYLON.GUI.TextBlock();
var textTimer = new BABYLON.GUI.TextBlock();
var panelEndGame = new BABYLON.GUI.StackPanel();

// don't touch the 3 timer variables below
var timerMin = Math.floor(timer / 60);
var timerSecs = timer % 60;
var timerCS = 0;
// the timer refreshes every : (in centiseconds)
var timeFrameInterval = 8;
// 2 cs by default
var tictock = false;

// gameLogic
var gameLogic;

// limit game

var limitZ = 3500
var limitX = 1400


// contains all the meshes which float on the water (boat is an exception, it has
// its own floating animation)
var floatingElements = []
var floatRealism; // the function which animates floating elements
var crateSize = 15;
var initialCrateHeight = crateSize / 2 - ((crateSize) / 2.5);
var frozenTime = 0;

// this is an instance of ThingFactory, which contains in-game elements
// such as crates, sea stacks, etc
var things;






var createScene = function () {

    scene = new BABYLON.Scene(engine);
    var gravityVector = new BABYLON.Vector3(0, -30, 0);
    var physicsPlugin = new BABYLON.CannonJSPlugin();
    scene.enablePhysics(gravityVector, physicsPlugin);
    scene.collisionsEnabled = true;

    audioManager = new AudioManagerBabylon(scene);    
    
    // obstacles is a list of every mesh/object in the game against which the boat would stop against
    var obstacles = []
    // load some of the stuff needed in the game, models and some other shit
    // (on the constructor call)
    things = new ThingFactory(scene, obstacles);
    gameLogic = new GameLogic(scene, audioManager, babylonGUI)


    // Parameters : name, position, scene
    var camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(0, 0, -10), scene);

    // Targets the camera to a particular position. In this case the scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // Attach the camera to the canvas
    camera.attachControl(canvas, true);

    textTimer.text = Utilities.writeTime(timerMin, timerSecs, timerCS);
    textTimer.fontSize = 24
    textTimer.color = "white"



    GuiGame.displayGUI(textPassed, babylonGUI, textStart, timer,
        numberGatesPassed, numberGates, textTimer)//, boatEntity.getMomentum())
    engine.displayLoadingUI()






    // Add the action manager of babylon to handle keypad
    scene.actionManager = new BABYLON.ActionManager(scene);

    if (scene.onPointerObservable.hasObservers()) {
        scene.onPointerObservable.add((pointerInfo) => {
            switch (pointerInfo.type) {
                case BABYLON.PointerEventTypes.POINTERDOWN:

                    BABYLON.Engine.audioEngine.unlock();
                    audioManager.play("clickSong")

                    // make the keyboard keys respond to input
                    Utilities.bindControls(map, scene);
                    textStart.dispose()
                    scene.onPointerObservable.remove(scene.onPointerObservable.observers[2])
                    timerInterval = window.setInterval(() => {
                        textTimer.text = Utilities.writeTime(timerMin, timerSecs, timerCS);
                        if (frozenTime > 0) {
                            
                            /*var style = babylonGUI.getGUI().createStyle();
                            style.fontSize = 20;
                            style.fontFamily = "Arial, Helvetica, sans-serif";
                            style.fontWeight = "bold";*/

                            textTimer.color = "cyan";
                            
                            frozenTime -= timeFrameInterval;
                            if (frozenTime < 0) {
                                timerCS + frozenTime;
                            }
                        }
                        else {
                            
                            textTimer.color = "white";
                            timerCS -= timeFrameInterval;
                            if (timerCS <= 0) {
                                timerCS = 100 + timerCS;
                                if (timerSecs <= 0) {
                                    timerSecs = 60 + timerSecs;
                                    if (!(timerMin)) {
                                        textTimer.text = Utilities.writeTime(0, 0, 0);
                                        gameOver(scene, false)
                                    }
                                    timerMin -= 1;
                                }
                                timerSecs--;
                            }

                        }

                        if (timerSecs < 10 & timerMin == 0 && !tictock) {
                            textTimer.color = "red"
                            tictock = true;
                            audioManager.play("clockSong")
                        }
                    }, timeFrameInterval * 10); // timeFrameInterval is expressed in centiseconds

                    // LAUNCH MISSIL WITH TIME INTERVAL OF 7 seconds
                    missileInterval = setInterval(() => {


                        audioManager.play("ennemySpottedSong")

                        setTimeout(() => {

                            pointMissiles = []
                            missiles = []
                            var positionZMissile = boatEntity.getMesh().position.z - 200;

                            var positionXMissile = boatEntity.getMesh().position.x + 30;
                            for (let i = 0; i < numberMissiles; i++) {
                                // setup to point the missiles need to target
                                var light2 = things.createCustomLight("idMissile", 1, 0, 0, scene)
                                var pointMissile = BABYLON.MeshBuilder.CreateCylinder("pl", { diameterTop: 60, diameterBottom: 60, height: 20, tessellation: 96 }, scene);
                                pointMissile.position.z = positionZMissile
                                pointMissile.position.x = positionXMissile
                                pointMissile.material = light2;
                                pointMissile.checkCollisions = true
                                pointMissile.actionManager = new BABYLON.ActionManager(scene);
                                pointMissiles.push(pointMissile)


                                // setup the missile
                                var materialShip = new BABYLON.StandardMaterial("shiptx1", scene);
                                materialShip.diffuseColor = new BABYLON.Color3(1, 0, 0); //Red

                                var meshMissile = BABYLON.Mesh.CreateCylinder("spaceship", 2, 0, 1, 6, 1, scene, false);
                                meshMissile.scaling = new BABYLON.Vector3(20, 20, 20)
                                var randomTurret = turrets[Utilities.getRandomInt(2)]

                                meshMissile.position.x = randomTurret.position.x
                                meshMissile.position.y = randomTurret.position.y
                                meshMissile.position.z = randomTurret.position.z

                                meshMissile.material = materialShip;
                                meshMissile.checkCollisions = true
                                meshMissile.actionManager = new BABYLON.ActionManager(scene);
                                var missile = new Vehicle3D(meshMissile)
                                missiles.push(missile)
                                audioManager.play("missileSong")

                                positionZMissile = positionZMissile - 200
                                positionXMissile = positionXMissile + 60


                            }

                            for (let i = 0; i < missiles.length; i++) {
                                missiles[i].getMesh().actionManager.registerAction(
                                    new BABYLON.ExecuteCodeAction(
                                        {
                                            trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
                                            parameter: pointMissiles[i]
                                        },
                                        function () {
                                            missiles[i].getMesh().dispose()
                                            pointMissiles[i].dispose()
                                            audioManager.stop("missileSong")
                                            audioManager.play("explosionMissileSong")
                                        }

                                    )
                                );

                                missiles[i].getMesh().actionManager.registerAction(
                                    new BABYLON.ExecuteCodeAction(
                                        {
                                            trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
                                            parameter: boatHitbox
                                        },
                                        function () {
                                            audioManager.play("ughSong")
                                            missiles[i].getMesh().dispose()
                                            pointMissiles[i].dispose()
                                            timerSecs -= 5;
                                            textTimer.color = "red"
                                            textTimer.fontSize = 30
                                            setTimeout(() => {
                                                textTimer.color = "white"
                                                textTimer.fontSize = 24
                                            }, 2000)
                                            audioManager.stop("missileSong")
                                            audioManager.play("explosionMissileSong")

                                        }

                                    )
                                );
                            }


                        }, 2000)


                    }, 4000)

            }
        });
    }


    // Light
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 1), scene);


    // Skybox
    var skybox = BABYLON.Mesh.CreateBox("skyBox", 8192, scene);
    var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("./textures/background/TropicalSunnyDay", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.disableLighting = true;
    skybox.material = skyboxMaterial;

    // Water material
    var waterMaterial = new BABYLON.WaterMaterial("waterMaterial", scene, new BABYLON.Vector2(512, 512));
    waterMaterial.bumpTexture = new BABYLON.Texture("./textures/waterbump.png", scene);
    waterMaterial.windForce = -10;
    waterMaterial.waveHeight = 0.2;
    waterMaterial.bumpHeight = 0.1;
    waterMaterial.waveLength = 0.1;
    waterMaterial.waveSpeed = 40.0;
    waterMaterial.colorBlendFactor = 0;
    waterMaterial.windDirection = new BABYLON.Vector2(1, 1);
    waterMaterial.colorBlendFactor = 0;

    // Ground
    var groundTexture = new BABYLON.Texture("./textures/sand.jpg", scene);
    groundTexture.vScale = groundTexture.uScale = 4.0;

    var groundMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
    groundMaterial.diffuseTexture = groundTexture;

    var ground = BABYLON.Mesh.CreateGround("ground", 8192, 8192, 2, scene, false);
    ground.position.y = -4;
    ground.material = groundMaterial;
    ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 1 }, scene);

    /*// TEST
    block = new BABYLON.Mesh.CreateBox("pd", 40, scene);
    block.isVisible = true;
    block.position = new BABYLON.Vector3(-150,20,2500);*/

    // Water mesh
    var waterMesh = BABYLON.Mesh.CreateGround("waterMesh", 8192, 8192, 2, scene, false);
    waterMesh.material = waterMaterial;
    waterMaterial.addToRenderList(ground);
    waterMaterial.addToRenderList(skybox);









    for (let i = 0; i < numberGates; i++) {

        var aGate = things.createGate(90, 10+Math.random()*40, 70 + Math.random()*120,
            !(Utilities.getRandomInt(4) == 3), (-limitX + 200) + 
                        Utilities.getRandomInt((limitX-200)*2), scene);
        //if (i >= 1) {
        //    aGate.mesh.position.x = Utilities.getRandomInt(maxPositionGate)
        //}

        aGate.mesh.position.z = baseFirstGate
        gates.push(aGate)
        baseFirstGate += 300

    }




    /********** HANDLE SOUND **********/


    AudioGame.addAllSongs(audioManager)

    var limitp = 0

    /****CREATE LIMITS OF THE GAME *********/


    var rockTexture = new BABYLON.Texture("./textures/rock.jpg", scene);

    var rockMaterial = new BABYLON.StandardMaterial('rockLee', scene);
    rockMaterial.diffuseTexture = rockTexture;

    var rockHeight = 150
    var rockWidth = 90
    var rockWallSize = 220
    rockTexture.vScale *= (rockWallSize / 2); // repeats the texture with a size depending on the amount of "texture blocks"
    rockTexture.uScale = rockHeight / 120
    var rockWall1 = new BABYLON.MeshBuilder.CreateBox("rockWall1", {
        height: rockHeight,
        width: rockWidth, depth: rockWidth * rockWallSize
    }, scene)
    rockWall1.material = rockMaterial;
    rockWall1.position = new BABYLON.Vector3(limitX, rockHeight / 2, limitZ);
    rockWall1.checkCollisions = true;

    let rockWall2 = rockWall1.clone();
    rockWall2.position.x = -limitX

    
    let rockWall3 = rockWall1.clone();
    rockWall3.rotate(BABYLON.Axis.Y, Math.PI/2, BABYLON.Space.WORLD);
    rockWall3.position.z + 4000
    let rockWall4 = rockWall3.clone();
    rockWall4.position.z -= 7000
    
    obstacles.push(rockWall1)
    obstacles.push(rockWall2)
    obstacles.push(rockWall3)
    obstacles.push(rockWall4)

    for (var i = 0; i < 35; i++) {
        let power = Utilities.getRandomInt(10);
        power = (power == 0 ? 3 : power<=3 ? 2 : 1)
        var timeCrate = things.createTimeCrate(crateSize, power, scene);
        timeCrate.mesh.position = new BABYLON.Vector3(
            (-limitX + 200) + Utilities.getRandomInt((limitX-200)*2),
            initialCrateHeight,
            (-3420 + 200) + Utilities.getRandomInt((3420-200)*2));
        floatingElements.push(timeCrate);
        waterMaterial.addToRenderList(timeCrate.mesh);

    }
    
    let loadSeaStackInterval = setInterval(function() {

        if (ThingFactory.seaStackMeshes.length > 0) {
            clearInterval(loadSeaStackInterval)
            for (let i = 0; i < 35; i++) { //
                let aStack = things.createSeaStack(1+Utilities.getRandomInt(4), 0.5+(Math.random()*1.0)); //
                aStack.position.x = (-limitX) + Utilities.getRandomInt((limitX)*2)
                aStack.position.y = 0 - Utilities.meshYwidth(aStack) / 4
                aStack.position.z = -3500 + Utilities.getRandomInt(3500*2);
            }
        }
    }, 20)


    if (ThingFactory.seaStackMeshes.length > 0) {
        for (let i = 0; i < 5; i++) {
            
    
            //console.log(ThingFactory.seaStackMeshes);
        }

    }









    // PLUS LE SCALE AUGMENTE
    // PLUS L'IMAGE EST RETRECIE (repeated etc)
    //rockTexture.vScale *= (1/0.2);
    //rockTexture.uScale *= 1/0.5;



    /*var cylinder = BABYLON.Mesh.CreateCylinder("rebarGrayZAxis", height1, 2, 2, 6, scene, false);
    cylinder.material = textures['Gray'];

    var cylinder = BABYLON.Mesh.CreateCylinder("rebarGrayXAxis", height2, 2, 2, 6, scene, false);
    cylinder.material = textures['Gray2'];
    */


    //var mapBorder = mapBorderBlock.clone(); new BABYLON.MeshBuilder.CreateBox("mapBorder", { height: 40, width: 40, depth: 320}, scene)
    //var limitPlane = new BABYLON.MeshBuilder.CreateBox("box", { height: 40, width: 40, depth: 40 }, scene);


    //var rockTexture = new BABYLON.Texture("./textures/rock.jpg", scene);
    //rockTexture.uScale *= (8192 / 40);
    //console.log(rockTexture.uScale)

    //var myMaterial = new BABYLON.StandardMaterial("myMaterial", scene);
    //myMaterial.diffuseTexture = rockTexture;
    //myMaterial.diffuseTexture.scale == 800
    //myMaterial.diffuseTexture.uScale == 90000;
    //myMaterial.diffuseTexture.vScale == 90000; // this prevents the texture from stretching
    // over the length of the wall
    //mapBorder.material = myMaterial;

    /*var limitPlane2 = new BABYLON.MeshBuilder.CreateBox("box", { height: 40, width: 40, depth: 40 }, scene);
    limitPlane2.position.y = 10
    limitPlane2.position.z = limitZ
    limitPlane2.position.x = -limitX
    limitPlane2.material = myMaterial
    limitPlane2.checkCollisions = true;

    var limitPlane3 = new BABYLON.MeshBuilder.CreateBox("box", { height: 40, width: 40, depth: 40 }, scene);
    limitPlane3.position.y = 10
    limitPlane3.position.z = -1000
    limitPlane3.position.x = 1000 + limitp
    limitPlane3.material = myMaterial
    limitPlane3.checkCollisions = true;*/



    //obstacles.push(mapBorderOrigin)


    limitZ -= 40
    limitp -= 40


    //}

    /**** CREATE TURRET ******/

    let turretY = 200
    let turretZ = 1500
    let turretX = 800

    for (let i = 0; i < 2; i++) {
        var turret = new BABYLON.MeshBuilder.CreateBox("box", { height: 40, width: 40, depth: 40 }, scene);
        turret.position.y = turretY
        turret.position.z = turretZ
        turret.position.x = turretX
        turret.material = new BABYLON.StandardMaterial("mat", scene);
        turret.material.diffuseColor = BABYLON.Color3.Random();
        turrets.push(turret)
        turretX = -turretX
        var behaviorTurret = new Vehicle3D(turret)
        behaviorsTurret.push(behaviorTurret)

    }



    timerDirection = setInterval(() => {
        timeChangeDirection += 1
    }, 3000)

    floatRealism = setInterval(() => {
        floatingElements.forEach(crate => {
            crate.floatVal += 0.12;
            crate.mesh.position.y = initialCrateHeight + Math.cos(crate.floatVal) * 3;
        })
    }, 50)

    gatesVariation = setInterval(() => {
        gates.forEach(someGate => {
            someGate.floatVal += someGate.speed / 500;
            let posCalc;
            if (someGate.linear) {
                posCalc = someGate.floatVal % (Math.PI * 2)
                let orientation = (posCalc < Math.PI)
                posCalc = posCalc % Math.PI
                if (orientation) {
                    posCalc = someGate.range * (posCalc / Math.PI)
                }
                else {
                    posCalc = someGate.range * (1 - (posCalc / Math.PI))
                }
            }
            else {
                posCalc = Math.cos(someGate.floatVal) * someGate.range
            }
            someGate.mesh.position.x = someGate.initialX + posCalc;
        })
    }, 25)











    /****** Import from blender other mesh ******/

    // some kind of hitbox for the boat? using impostors
    /*var boxCollider = new BABYLON.MeshBuilder.CreateBox("box", { height: 40, width: 40, depth: 40 }, scene);
    boxCollider.checkCollisions = true
    boxCollider.physicsImpostor = new BABYLON.PhysicsImpostor(boxCollider, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 1, restitution: 0 }, scene);
    boxCollider.isVisible = false
    */

    BABYLON.SceneLoader.ImportMesh("", "./model/", "boat.glb", scene, function (boatMesh) {

        scene.executeWhenReady(function () {

            scene.activeCamera.attachControl(canvas);
            boatEntity = new EntityBabylon(boatMesh[0], scene)
            boatEntity.getMesh().position = new BABYLON.Vector3.Zero();
            boatEntity.getMesh().position.z += 3000
            
                                                    // boat_albedo.jpg
            var boatWoodTexture = new BABYLON.Texture("./textures/sea_stack.png", scene);
           // boatWoodTexture.vScale *= 200
           // boatWoodTexture.uScale *= 200
            var boatWoodMaterial = new BABYLON.StandardMaterial('boatMaterial', scene);
            boatWoodMaterial.diffuseTexture = boatWoodTexture;

            boatMesh.forEach(theCurMesh => {
                try {
                    theCurMesh.material = boatWoodMaterial;
                }
                catch (err) {
                    //

                }
            })
            boatEntity.setSpinningWheels(boatMesh)
            boatEntity.checkCollisions = false;
            boatEntity.getMesh().checkCollisions = false;
            // "the hitbox of the boat is always equal to the boat's position"
            // I believe since the position is an object, and the hitbox uses the boat's position
            // object ==> the hitbox's position refreshes simultanously as the boat moves!
            boatHitbox = new BABYLON.MeshBuilder.CreateSphere("boatHitbox",
                { diameter: boatHitboxSize, updatable: true }, scene)
            boatHitbox.checkCollisions = true;
            // SET both values below to TRUE to see the boat's hitbox
            boatHitbox.isVisible = false; 
            boatHitbox.showBoundingBox = false;


            /**** HANDLE COLLISION WITH GATES *****/
            gates.forEach(curGate => {
                let gatePickupAction = new BABYLON.ExecuteCodeAction(
                    {
                        trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
                        parameter: curGate
                    },
                    function () {
                        boatEntity.getMesh().actionManager.unregisterAction(gatePickupAction);
                        curGate.mesh.dispose()
                        curGate.isRemoved = true;
                        audioManager.play("checkPointSong")
                        setTimeout(() => { audioManager.stop("checkPointSong") }, 900)
                        numberGatesPassed += 1
                        textPassed.text = "PASSED : " + numberGatesPassed + "/" + numberGates;
                        if (numberGatesPassed === numberGates) {
                            gameOver(scene, true)
                        }

                    }

                )
                boatEntity.getMesh().actionManager.registerAction(gatePickupAction);
            })
            //boxCollider.position = boatEntity.getMesh().position

            waterMaterial.addToRenderList(boatEntity.getMesh());



            /// useful? v==
            collisionWithObstacle = false;
            // HANDLE COLLISION WITH OBSTACLES

               




            scene.activeCamera.attachControl(canvas);
            engine.hideLoadingUI()
            engine.runRenderLoop(function () {
                scene.render();
            });
        });


    });

    BABYLON.Engine.audioEngine.useCustomUnlockedButton = true;


    document.addEventListener("keydown", function (e) {
        switch (e.keyCode) {
            case 90: 
                var boatSong = audioManager.find("boatSong")
                if (!boatSong.isPlaying) {
                    boatSong.play()
                }
                break;
        }

    });
    document.addEventListener("keyup", function (e) {
        switch (e.keyCode) {
            case 90:

                var boatSong = audioManager.find("boatSong")
                if (boatSong.isPlaying) {
                    boatSong.pause()
                }
                break;
        }

    });
    scene.registerAfterRender(function () {

        for (let i = 0; i < behaviorsTurret.length; i++) {
            behaviorsTurret[i].seekTurret(boatEntity.getMesh())
            behaviorsTurret[i].update()
        }

        if (missiles.length != 0) {
            for (let i = 0; i < numberMissiles; i++) {
                missiles[i].seek(pointMissiles[i])
                missiles[i].update()
                Utilities.facePoint(missiles[i].getMesh(), pointMissiles[i].position)
            }
        }





        boatEntity.handleMovement(map, boatHitbox)


        var boatPos = boatEntity.getMesh().position;
        // moves the boat hitbox to the boat's position
        boatHitbox.position = boatPos;
        //boxCollider.position.y = boatPos.y + 10
        //boxCollider.position.z = boatPos.z
        //boxCollider.position.x = boatPos.x

        var cameraX = boatPos.x - Math.sin(boatEntity.getEntityAngle()) 
                            * (-50 +  (20 * boatEntity.getSpeedRatio()));
                            //* (50 - (20 * boatEntity.getSpeedRatio()));
        var cameraZ = boatPos.z + Math.cos(boatEntity.getEntityAngle())
                            * (50 - (20 * boatEntity.getSpeedRatio()));


        boatEntity.getMesh().material.alpha = 1- (0.66 * boatEntity.getSpeedRatio())
        camera.position = new BABYLON.Vector3(
            cameraX,
            boatPos.y + 26 - (boatEntity.getSpeedRatio() * 30),
            cameraZ)
        //camera.position.copyFrom(boatPos.subtract(boatEntity.getMesh().forward.scale(48)).add(new BABYLON.Vector3(0, 1.7, 0)))

        camera.setTarget(boatPos);
        camera.position.y += 18

        if (boatEntity.currentCrashDuration > 0) {
            var violence = boatEntity.getCrashIntensity();
            var violenceRange = violence * 2;
            camera.position = new BABYLON.Vector3(camera.position.x + (-violence + Utilities.getRandomInt(violenceRange)),
                camera.position.y + (-violence + Utilities.getRandomInt(violenceRange)),
                camera.position.z + (-violence + Utilities.getRandomInt(violenceRange)));
        }

        hitboxStaminaLastFrame = hitboxStamina;
        hitboxStamina = false;
        var i = 0;
        var obstacleLength = obstacles.length;
        while (i < obstacleLength) {
            if (boatHitbox.intersectsMesh(obstacles[i], false)) {
                boatHitbox.checkCollisions = false;
                // we could have different crashing power depending on obstacles later on
                hitboxStamina = true;
                boatCrash(audioManager)
                // no need to check for the other obstacles if there's at least one which struck the boat
                i = obstacleLength
            }
            i++;
        }
        for (i = 0; i < floatingElements.length; i++) {
            let curElm = floatingElements[i];
            // might want to use a register/unregister intersect action event later on, more clean
            if (boatHitbox.intersectsMesh(curElm.mesh, false) && !(curElm.isRemoved)) {
                frozenTime += curElm.power * 100
                audioManager.play("crateBreak");
                //curElm.mesh.dispose();
                curElm.isRemoved = true;
                
                // this sets up and play the quick time crate animation when intersected into
                let timeCrateGone = setInterval(() => {
                    let m = curElm.mesh;
                    if (m.scaling.x >= 3.5) {
                        m.dispose();
                        clearInterval(timeCrateGone);
                    }
                    m.material.alpha -= 0.08
                    m.scaling = new BABYLON.Vector3(m.scaling.x+0.5, m.scaling.y+0.5, m.scaling.z+0.5)
                    //console.log("tete que ta connard")
                }, 1)

                //curElm = null;
            }

        };



        //obstacles.forEach(i_Obstacle => {  
        // })


        //block.rotation.y += 0.2;



    });

    return scene;
}



var scene = createScene();
window.addEventListener('resize', function () {
    engine.resize();
});

const gameOver = (scene, winner) => {
    boatEntity.setControls(false);
    clearInterval(timerInterval)
    clearInterval(missileInterval)
    clearInterval(timerDirection)
    timeChangeDirection = 0
    missiles = []
    pointMissiles = []

    gameLogic.gameOver(winner, panelEndGame, numberGatesPassed, textTimer, limitZ)

    let buttonRestart = panelEndGame.getChildByName("gameOver")
    buttonRestart.onPointerClickObservable.add(() => {
        scene.dispose()
        scene = undefined
        timer = 0
        textTimer.color = "yellow"
        numberGatesPassed = 0
        limitZ = 3500
        babylonGUI.destroy()
        scene = createScene()
    });

    gameLogic.restart()


}


var boatCrash = function (audioManager) {
    if (!(hitboxStaminaLastFrame) && (hitboxStamina)) {
        boatEntity.crashRecoil();
        audioManager.find("crashSong").play()
        //timer += 2 // NERF HAMMER

    }
    else if (hitboxStaminaLastFrame && !(hitboxStamina)) {
        boatHitbox.checkCollisions = true;
    }
}





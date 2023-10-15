import Utilities from "../utilities/Utilities.js";

export default class EntityBabylon {

    preMomentum = 0; // speed on previous frame
    momentum = 0;  // speed on current frame
    decel = 0.98; // speed coefficient applied when not holding "forward" key

    // The maximum speed to boat can attain just by accelerating
    topSpeed = 24; //18 ; 50
    acceleration = this.topSpeed / 128; // why 128? i dunno. accel is automatically deducted from top speed also
    // from top speed anyway
    minSpeed = 0;
    // how slower is backtrack next to the forward speed
    backTrackratio = 1 / 3; // 33% as fast
    maxBacktrackSpeed = -(this.topSpeed * this.backTrackratio);

    // [0,1] a value whicih represents momentum/topSpeed
    speedRatio;

    // the angle of the entity (boat) is stored there
    // IN RADIAN.
    entityAngle = 0

    // guaranteed minimum angle spin per frame no matter what your current speed is
    minimumDrift = Math.PI/550 //Math.PI / 800 //Math.PI/600;

    // how violent is a crash with an obstacle
    // upon hitting an obstacle, your momentum is multiplied by the value below to determine
    // the recoil
    crashingRecoil = -(1 / 2);

    // camera twerk. While the camera shakes, controls are disabled.
    // crash shake duration minimum cap
    minCrashDuration = Math.ceil(this.topSpeed / 10);
    // procs a crash when true. don't touch this value, the game sets it up
    doCrash = false;
    // don't touch neither, crash remaining time
    currentCrashDuration = 0;
    // no toucherino. camera madness based on how violent is the impact
    crashIntensity;

    // are keyboard inputs allowed? they are disabled in game over screen and upon collision
    controls = true;

    // the animated meshes of the boat
    spinningWheels = []



    constructor(mesh, scene) {
        this.mesh = mesh
        this.scene = scene
        this.mesh.position.y = 1
        this.mesh.position.z = 3000 - 100
        this.mesh.scaling.x = 0.4
        this.mesh.scaling.y = 0.4
        this.mesh.scaling.z = 0.4
        this.mesh.actionManager = new BABYLON.ActionManager(scene);
        this.mesh.checkCollisions = true
    }

    setSpinningWheels(theMeshes) {
        theMeshes.forEach(someMesh => {
            if (someMesh.name === "Plane.000" || someMesh.name === "Plane.029" || someMesh.name === "Plane.047"
                || someMesh.name === "Plane.017" || someMesh.name === "Plane.019" || someMesh.name === "Plane.008" || someMesh.name === "Plane.035") {
                this.spinningWheels.push(someMesh);
            }

        })

    }

    getCrashState() {
        return this.doCrash
    }

    getControls() {
        return this.controls;
    }
    setControls(allowornot) {
        this.controls = allowornot;
    }

    getMesh() {
        return this.mesh;
    }
    getSpeedRatio() {
        return this.speedRatio;
    }

    getEntityAngle() {
        return this.entityAngle;
    }

    // Return the boat's current speed
    getMomentum() {
        return this.momentum;
    }

    crashRecoil() {
        this.doCrash = true;
    }

    getCrashIntensity() {
        return this.crashIntensity
    }

    handleMovement(map, hitbox) {
        this.speedRatio = this.momentum / this.topSpeed;

        //console.log("[" + this.preMomentum + ", " + this.momentum + "]")
        this.preMomentum = this.momentum;

        if (this.doCrash) {
            this.doCrash = false;
            // crash duration scales with momentum at the impact time
            this.currentCrashDuration = this.minCrashDuration + (this.speedRatio * (this.topSpeed / 1.6));
            this.crashIntensity = (this.topSpeed / 6) + (this.momentum / 3);
            // there's a minimum crashing recoil speed, else some bad hitbox things can happen
            // also a crashing can't exceed the maximum backtracking speed
            // the recoil can't exceed the backtrack speed
            this.momentum = Math.min(
                Math.max(this.momentum * this.crashingRecoil, this.maxBacktrackSpeed),
                this.maxBacktrackSpeed/3); // <== the minimum recoil power
        }
        var isBacktracking = false;
        var noDecelerate = false;
        // this.controls is disabled by game over screen for example
        if ((this.currentCrashDuration > 0) || !(this.controls)) {
            this.currentCrashDuration = Math.max(this.currentCrashDuration - 1, 0);
            
            //active collisions again when crash duration finished
            hitbox.checkCollisions = !(this.currentCrashDuration);
        }
        else {
            isBacktracking = (map["s"] || map["S"]);
            if ((map["z"] || map["Z"])) {
                // acceleration is linear
                this.momentum = Math.min(this.momentum + this.acceleration, this.topSpeed);
                noDecelerate = true;
            }
            else if (isBacktracking && (this.momentum <= 0)) {
                this.momentum = Math.max(-(this.topSpeed * this.backTrackratio),
                    this.momentum - (this.acceleration * this.backTrackratio))
                noDecelerate = true;
            }


            var drift = ((map["q"] || map["Q"]) ? -1 :
                (map["d"] || map["D"]) ? 1 : 0);
            if (drift != 0) {
                var driftAngle = (this.minimumDrift * drift) + (this.speedRatio * (drift * (Math.PI / 150))); //speedRatio*(drift*(Math.PI / 100))
                this.mesh.rotate(BABYLON.Axis.Y, driftAngle, BABYLON.Space.WORLD);
                hitbox.rotate(BABYLON.Axis.Y, driftAngle, BABYLON.Space.WORLD);
                this.entityAngle += driftAngle;
                //this.mesh.rotation.y += driftAngle;
                //console.log(driftAngle + " radians soit " + (driftAngle*(180/Math.PI)) + " degres; rad total " + this.entityAngle);
            }

        }

        // deceleration is logarithmic
        // there's a certain cap upon which the speed drops to 0. This prevents the deceleration
        // from pseudo never-ending

        // the 18 IS AN ARBITRARY BALANCE VALUE. MIGHT WANT TO MAKE IT MORE CUSTOMIZABLE
        // "Braking" which is attempting to backtrack when your speed is > 0, will just
        // decelerate on a twice as fast rate
        if (!(noDecelerate)) {
            this.momentum =
                ((this.momentum < (this.topSpeed / 18)
                    && (this.momentum > -(this.topSpeed / 18 * this.backTrackratio))) ? 0 :
                    this.momentum = this.momentum * this.decel * ((isBacktracking) ? this.decel : 1));
            //console.log(this.momentum)
        }

        //var fixAngle

        var xMove = (Math.sin(this.entityAngle)) * -(this.momentum);
        var zMove = Math.cos(this.entityAngle) * -(this.momentum);

        this.mesh.moveWithCollisions(new BABYLON.Vector3(
            xMove,
            0,
            zMove));

        //console.log([this.entityAngle, Math.cos(this.entityAngle), (Math.sin(this.entityAngle))])




        /*(new BABYLON.Vector3(
            parseFloat(parseFloat(Math.sin(this.entityAngle)) * (this.momentum)),
            0,
            parseFloat(parseFloat(Math.cos(this.entityAngle)) * -(this.momentum))));*/



        //this.mesh.rotate(BABYLON.Axis.X, Math.PI / 5000, BABYLON.Space.WORLD);

        // lift the front of the boat. The bigger the speed the higher
        this.mesh.rotate(BABYLON.Axis.X, (this.preMomentum - this.momentum) / (this.topSpeed / 16) * (Math.PI / 180),
            BABYLON.Space.LOCAL);

        // spin dem funny motor like there's no tomorro
        this.spinningWheels.forEach(element => {
            element.rotate(BABYLON.Axis.Z, this.speedRatio * 0.3, BABYLON.Space.LOCAL)            
        });

        //console.log((this.preMomentum - this.momentum) * (Math.PI / 550))

        //this.mesh.rotation.z = this.momentum;

        // }

    }



}
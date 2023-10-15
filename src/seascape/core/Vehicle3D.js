
export default class Vehicle3D {

    constructor(mesh) {
        this.mesh=mesh
        this.target = undefined
        this.position = mesh.position
        this.velocity = new BABYLON.Vector3(0.2, 0, 0)
        this.acceleration = new BABYLON.Vector3(0, 0, 0)
        this.maxSpeed = 20
        this.maxForce = 0.1

    }

    getMesh(){
        return this.mesh
    }

    applyForce(force) {
        // We could add mass here if we want A = F / M
        this.acceleration.addInPlace(force);
    }

    seek(target) {
        this.target = target
        var desired = target.position.subtract(this.position);  // A vector pointing from the position to the target
        
        // Scale to maximum speed
        desired.normalize()
        desired.multiplyInPlace(new BABYLON.Vector3(this.maxSpeed, this.maxSpeed, this.maxSpeed))
        
        // Steering = Desired minus velocity
        var steer = desired.subtract(this.velocity);
        this.applyForce(steer);
    }

    seekTurret(target){
        this.target = target
        var clonedPosition = Object.assign({}, this.position);
        clonedPosition.z+=1000
        var desired = target.position.subtract(clonedPosition);  // A vector pointing from the position to the target
        
        // Scale to maximum speed
        desired.normalize()
        desired.multiplyInPlace(new BABYLON.Vector3(0, 0, this.maxSpeed))
        
        // Steering = Desired minus velocity
        var steer = desired.subtract(this.velocity);
        this.applyForce(steer);
    }
    

    update() {

        this.velocity.addInPlace(this.acceleration);
        this.position.addInPlace(this.velocity);
        this.acceleration.multiplyInPlace(new BABYLON.Vector3(0, 0, 0));
        
    }


}
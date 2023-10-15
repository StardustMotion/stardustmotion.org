
// contains various functions which could find some use
// in various contexts

var Utilities = {


    getRandomInt : (max) => {
        return Math.floor(Math.random() * Math.floor(max));
	},
	
	// return mesh's height on Z
	meshZwidth : (someMesh) => {
		let tmp = someMesh.getBoundingInfo();
		let tagueuleConnard = Math.abs(tmp.maximum.z - tmp.minimum.z) * someMesh.scaling.z
		return tagueuleConnard
	},
	// papié collé ses enballé
	meshXwidth : (someMesh) => {
		let tmp = someMesh.getBoundingInfo();
		let tagueuleConnard = Math.abs(tmp.maximum.x - tmp.minimum.x) * someMesh.scaling.x
		return tagueuleConnard
	},
	//ses enballer ses peser ses gagner
	meshYwidth : (someMesh) => {
		let tmp = someMesh.getBoundingInfo();
		let tagueuleConnard = Math.abs(tmp.maximum.y - tmp.minimum.y) * someMesh.scaling.y
		return tagueuleConnard
	},

    // simplified face funtion
	facePoint : (rotatingObject, pointToRotateTo) => {
		// a directional vector from one object to the other one
		var direction = pointToRotateTo.subtract(rotatingObject.position);
		
		if (!rotatingObject.rotationQuaternion) {
			rotatingObject.rotationQuaternion = BABYLON.Quaternion.Identity();
		}
		
		direction.normalize();
		
		var mat = BABYLON.Matrix.Identity();
		
		var upVec = BABYLON.Vector3.Up();
		
		var xaxis = BABYLON.Vector3.Cross(direction, upVec);
		var yaxis = BABYLON.Vector3.Cross(xaxis, direction);
		
		mat.m[0] = xaxis.x;
		mat.m[1] = xaxis.y;
		mat.m[2] = xaxis.z;
		
		mat.m[4] = direction.x;
		mat.m[5] = direction.y;
		mat.m[6] = direction.z;
		
		mat.m[8] = yaxis.x;
		mat.m[9] = yaxis.y;
		mat.m[10] = yaxis.z;
		
		BABYLON.Quaternion.FromRotationMatrixToRef(mat, rotatingObject.rotationQuaternion);
		
	},

	// give a mesh which has a correctly stretched texture and another mesh which is bigger/smaller.
	// returns the correctly stretched texture mesh with a correctly stretched texture
	// !!!!!!!!!!!! UNUSED ??? !!!!!!!!!!!!!!
	textureRescale : (goodLookingMesh, stretchedMesh) => {
		toStretchTexture = goodLookingMesh.diffuseTexture.clone();
		height1 = goodLookingMesh.height;
		height2 = stretchedMesh.height;
		depth1 = goodLookingMesh.depth;
		depth2 = stretchedMesh.depth;

		toStretchTexture.vScale = height1 / height2;
		toStretchTexture.uScale = depth1 / depth2;
		stretchedMesh.diffuseTexture = toStretchTexture;
		return stretchedMesh;
	},

	
	// used upon collision or on game over screen
	/*unbindControls : function(map) {
		map["z"] = false;
		map["q"] = false;
		map["d"] = false;
		map["s"] = false;
	},*/

	bindControls : function(map, scene) {
		var actionKeyup = new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function (evt) {
			map[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";

		});
		var actionKeydown = scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function (evt) {
			map[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
		}));
		scene.actionManager.registerAction(actionKeyup)
		scene.actionManager.registerAction(actionKeydown)
	},

	// give me minutes, seconds and CS, I'll write the time correctly
	writeTime : function(min, secs, cs) {
		let minText = ((min < 10) ? "0" : "") + min; 
		let secsText = ((secs < 10) ? "0" : "") + secs; 
		let csText = ((cs < 10) ? "0" : "") + ((cs == 100) ? "00" : cs);
		return minText + ":" + secsText + ":" + csText
	}


};

export default Utilities;
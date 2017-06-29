const utils = {};

utils.getDistanceInMeters = (long1, long2, lat1, lat2) => {
    // haversine
    let R = 6371 // radius of eath in KM
    let dLat = (lat2 - lat1) * (Math.PI / 180);
    let dLng = (long2 - long1) * (Math.PI / 180);
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180)
            * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;
    return d * 1000; // Meters
}

// this returns the relative direction of the POI - for example, if user is facing south
// but the attraction is due north, then this will return 180
utils.getDirection = (long1, long2, lat1, lat2) => {
    let theta = Math.atan2(lat2 - lat1, long2 - long1);
    if (theta < 0){
        theta += (2 * (Math.PI))
    }
    theta =  theta * (180 / Math.PI);
    return theta;
}

///VERY DUMB MATH//

utils.convertToOrientation = (userDirection, thetaDirection) => {
    const absDiff = Math.abs(thetaDirection - userDirection); //is abs diff > 180?
    let relDir = absDiff;

    let left = false;
    let otherWayAround = false;

    if (absDiff > 180) otherWayAround = true;

    //is the object to the left or the right?
    if ((userDirection > thetaDirection) && (!otherWayAround) || (userDirection < thetaDirection) && (otherWayAround)) left = true;

    if (otherWayAround) {
    if (left) {
        relDir = 360 - thetaDirection + userDirection;
    }
    else {
        relDir = 360 - userDirection + thetaDirection;
    }
    }

    if (left) relDir = -relDir;

    return relDir;
}

export default utils;
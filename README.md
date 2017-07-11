# I (AR)t NY

[Christian Wentling](https://github.com/christiancw) | [Pat Hoyt](https://github.com/phoyt1) | [Danielle Westerman](https://github.com/dweste01) | [Jason Oscar](https://github.com/jhoscar1)

**I (AR)t NY** is an AR app, which functions on iOS and Android devices, that shows you New York’s public art and landmarks as you’re walking the city.

The technology stack for this application consists of a Firebase data store, a React Native front end and of course the phone itself.

We populated our Firebase database with data made public by the NYC Parks dept. Firebase real time updates and queries facilitated our dynamic features including likes / my favorites / and most popular screen.

We decided to use React Native because it gives us the ability to write mobile applications in Javascript. These applications compile to native code for both android and ios devices.

Most importantly, the app is based around the use of the phone’s hardware including the camera, geolocation and sensory features. 

Overlaying information on the camera view is a signature augmented reality concept and makes the entire application very engaging. 

The Geolocation data from the phone is what provides the cue for displaying information over the camera view. Cards display on the camera view when the user is within 300 meters of an art installation. 

Finally, the app utilizes the phone's gyroscope as well as compass heading information to render a card when a user is facing a given point of interest.
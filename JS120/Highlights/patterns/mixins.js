
//mixins

//single inheritance - in JS, objects can only inherit from one object / classes can only extend from one class - just one prototype object per object 
//works well for objects that dont have an 'is-a' relationship but rrather a 'has-a' relationshiop. When we want to add additional functionality or standalone methods to certain objects, rather than extending the functionality of an entire class of objects.
const buttons = {
    unbutton() { }
}
class Garment { }
class Shirt extends Garment { }
class ButtonDown extends Shirt { }
Object.assign(ButtonDown.prototype, buttons)
class Pants extends Garment { }
class DressPants extends Pants { }
Object.assign(DressPants.prototype, buttons)

//Object.assign copies the enumerable props from one object to another.
//the unbutton method only makes sense for some types of shirts, not all shirts. So cant add it to the Shirt function prototype or the Garment function prototype for all shirt objects to inherit. 

//can do the Object.assign inside the constructor but then each object created will include a copy of the mixin methods which is wasteful for memory. So isntead we do Object.assign on the constructor function prototype

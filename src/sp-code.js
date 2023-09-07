export function spCode() {
    return `
      let audio = input();
      let pointerDown = input();
      let size = input();
      
      setMaxIterations(500);
      let r = getRayDirection();
      let s = getSpace();

     
      let n1 = noise(r * 4 +vec3(0, audio, vec3(0, audio, audio))*.5 );
      let n = noise(s + vec3(0, 0, audio+time*.1) + n1);
      rotateX(n);
      color( normal.x, normal.y, normal.z ); 
      displace(mouse.x * 2, mouse.y * 2, 0);
      box(0.5,0.5,0.5);
      difference();
      mixGeo(pointerDown);
      sphere(.9 + n);
      expand(.2) 
      
   
    `;
}
// Original
// setMaxIterations(5);
// let s = getSpace();
// let r = getRayDirection();

// let n1 = noise(r * 4 +vec3(0, audio, vec3(0, audio, audio))*.5 );
// let n = noise(s + vec3(0, 0, audio+time*.1) + n1);

// metal(n*.5+.5);
// shine(n*.5+.5);

// color(normal * .1 + vec3(0, 0, 1));
// displace(mouse.x * 2, mouse.y * 2, 0);
// boxFrame(vec3(2), abs(n) * .1 + .04 );
// mixGeo(pointerDown);
// sphere(n * .5 + .8);

// New
// let n = noise(s * 40 +time + 10000000);
// let n = 0.1 + noise(2 * s + time);
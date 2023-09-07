export function spCode() {
  return `
      let audio = input();
      let pointerDown = input();
     
     
      
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
      expand(.2);
    `
}

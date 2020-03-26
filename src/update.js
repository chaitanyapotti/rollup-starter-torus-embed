import format from "date-fns/format";
import Torus from "@toruslabs/torus-embed";

var span = document.querySelector("#time-now");

var torusLoginBtn = document.querySelector("#torusLogin");
console.log(torusLoginBtn);

export default function update() {
  span.textContent = format(new Date(), "h:mm:ssa");
  setTimeout(update, 1000);
}

torusLoginBtn.addEventListener("click", () => {
  console.log("clicking", Torus);
  const torus = new Torus();
  torus
    .init()
    .then(() => torus.login())
    .then(() => console.log("done"));
});

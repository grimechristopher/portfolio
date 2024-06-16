
<template>
  <!-- Full Page Flipping Card-->
  <div>
    <div 
      class="container-fullscreen"
    >
      <div id="resume-container">
        <ResumeComponent />
      </div>
      <div class="center-xy">
        <div
          id="container-card"
          ref="containerCard"
          @mouseleave="mouseLeave()"
          @mousemove="mouseMove($event)"
          @click="onClick($event)"
          @touchmove="touchMove($event)"
          @touchend="mouseLeave()"
        >
          <div 
            id="card-front" 
            ref="cardFront" 
            class="card"
          >
            <CardFront />
          </div>
          <div 
            id="card-back" 
            ref="cardBack" 
            class="card"
          >
            <CardBack />
          </div>
        </div>
      </div>
      <div id="placeholder"></div>
      <div id="container-navigation">
        <Navbar />
      </div>
    </div>
    <main>
      <slot />
    </main>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'

const containerCard = ref();
const cardFront = ref();
const cardBack = ref();

const maxRotation = 10; // Max Rotation of the card in degrees.
const mobileBreakpoint = 640;

let isFlipped = false;
let windowWidth = 0;
let windowHeight = 0;
let cardWidth = 0;

let frontDegrees = 0;
let backDegrees = 180;


onMounted(() => {
  window.addEventListener('resize', onWindowResize)

  windowHeight = window.innerHeight;
  windowWidth = window.innerWidth;

  cardWidth = containerCard.value.clientWidth;
})  

function mouseMove(event: MouseEvent) {
  if (windowWidth <= mobileBreakpoint) {
    return;
  }

  const halfWidth = windowWidth / 2
  const halfHeight = windowHeight / 2 

  const yAxisRotation = (event.clientX - halfWidth) / halfWidth * 2 * maxRotation;
  const xAxisRotation = (event.clientY - halfHeight) / halfHeight * 2 * maxRotation;
  
  containerCard.value.style.transition = 'none'
  containerCard.value.style.setProperty('--rotateX', -xAxisRotation);
  containerCard.value.style.setProperty('--rotateY', yAxisRotation);

}

function mouseLeave() {
  containerCard.value.style.transition = "transform .3s 0.3s";
  containerCard.value.style.setProperty('--rotateX', 0);
  containerCard.value.style.setProperty('--rotateY', 0);

  console.log("Leaving")
}

function onClick(event: MouseEvent) {
  isFlipped = !isFlipped;

  cardFront.value.style.transition = "transform .5s 0s";
  cardBack.value.style.transition = "transform .5s 0s";
  
  if (event.clientX > windowWidth / 2) {
    frontDegrees += 180;
    backDegrees += 180;
  }
  else {
    frontDegrees -= 180;
    backDegrees -= 180;
  }
    
  if (isFlipped === true) {
    cardFront.value.style.setProperty('transform', `rotateY(${frontDegrees}deg)`); 
    cardBack.value.style.setProperty('transform', `rotateY(${backDegrees}deg)`); 
  }
  else {
    cardFront.value.style.setProperty('transform', `rotateY(${frontDegrees}deg)`); 
    cardBack.value.style.setProperty('transform', `rotateY(${backDegrees}deg)`); 
  }
}

function touchMove(event: TouchEvent) {
  const currentTouchX = event.touches[0].clientX;
  const halfWidth = cardWidth / 2
  const yAxisRotation = (currentTouchX - halfWidth) / halfWidth * maxRotation;

  containerCard.value.style.transition = 'none'
  containerCard.value.style.setProperty('--rotateY', yAxisRotation);
}

function onWindowResize() {
  windowWidth = window.innerWidth;
}

</script>
<style scoped>
body {
  margin: 0
}

.container-fullscreen {
  height: 100dvh;
  background: var(--bg);

  display: flex;
  flex-direction: column;  
}

#resume-container {
  position: absolute;
  top: 0;
  right: 0;
  padding: 0.5rem;
  z-index: 1;
}

.center-xy {
  display: flex;
  justify-content: center;
  align-items: center;

  perspective: 100vw;
  flex-grow: 1;
  flex-basis: auto;
}

/* 
  Playing Cards are 2.5in * 3.5in
  Business Cards are 2in * 3.5in
*/
#container-card {
  width: 35em;
  height: 20em;
  
  --rotateX: 0;
  --rotateY: 0;
  transform: rotateX(calc(var(--rotateX) * 1deg)) rotateY(calc(var(--rotateY) * 1deg));
}

.card {
  width: inherit;
  height: inherit;
  /* border: solid #FFFFFF 1px; */
  border-radius: 0.25rem;
  position: absolute;
  backface-visibility: hidden;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0), 0 6px 20px 0 rgba(0, 0, 0);
}

#card-front {
  /* background-color: #F0F0FC; */
  background: linear-gradient(145deg, #f9f9f9, #eaeaea);
  transform: rotateY(0deg);
}

#card-back {
  /* background-color: #F0F0FC; */
  background: linear-gradient(145deg, #f9f9f9, #eaeaea);
  transform: rotateY(180deg);
}

#placeholder {
  position: absolute;
  bottom: 42px;
}

/* Some 'mobile second' designing */
@media (max-width: 640px) {
  #container-card {
    width: 20em;
    height: 35em;
  }
}
</style>
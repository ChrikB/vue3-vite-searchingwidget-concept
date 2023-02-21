<template>
  <div class="about-view">
    <h3><span>What is this?</span></h3>
    <p>This is a small app based on Vue 3</p>

    <h3><span>What it includes?</span></h3>
   
    <ul>
      <li>-A basic HTML/CSS interface with Bootstrap 5</li>
      <li>-App with Vue 3</li>
      <li>-Vite</li>
      <li>-Vue-router for router</li>
    </ul>

    <h3><span>Vue sections</span></h3>

    <ul>
      <li>-Router with and without props</li>
      <li>-Searching/filtering functionality</li>
      <li>-Simple Async data fetching</li>    
      <li>-Passing props, data and events between Components, 
      from parent to child and vice versa </li>      
      <li>-Searching Form with nested components, autocomplete input and range input</li>
    </ul>
  </div>
</template>

<style scoped>
h3 {
  margin: 40px 0 10px;
}

ul{
  list-style-type: none;
  padding: 0;
}
ul li {display: block; }

/* heading underline animation */
h3 span{
  position:relative;
  padding-left: 50px;
  padding-right: 50px;
}
h3 span:after{
  content:'';
  width:100%;
  border-bottom:1px solid green;
  position:absolute;
  left:0;
  bottom:0;
}
h3 span:after{
  animation-name: comein;
  animation-duration: 1s;
  animation-delay: 0s;
  animation-iteration-count: 0.8;
}
@keyframes comein{
  from {transform: scale(0);}
  to {transform: scale(1);}
}

</style>

<script>
export default {
name: 'About',
props: {}
}
</script>
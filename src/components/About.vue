<template>
  <div id="about">
    <a href="https://twitter.com/cdsar626" target="blank">
      <img alt="logo Twitter" @mouseover="isT=true" @mouseleave="isT=false" class="imgAbout" src="../assets/Twitter.png">
      <div v-if="isT">{{twitter}}</div>
    </a>

    <a href="https://github.com/cdvsnp" target="blank">
      <img alt="logo github" @mouseover="isG=true" @mouseleave="isG=false" class="imgAbout" src="../assets/github-256.png">
      <div v-if="isG">{{github}}</div>
    </a>

    <a href="https://www.linkedin.com/in/cdsar626" target="blank">
      <img alt="logo LinkedIn" @mouseover="isL=true" @mouseleave="isL=false" class="imgAbout" src="../assets/linkedin.png">
      <div v-if="isL">{{linkedin}}</div>
    </a>

    <a href="mailto:cdsar626@gmail.com" target="blank">
      <img alt="logo email" @mouseover="isE=true" @mouseleave="isE=false" class="imgAbout" src="../assets/email.png">
      <div v-if="isE">{{email}}</div>
    </a>

  </div>
</template>

<script>
  export default {
    name: 'about',
    data() {
      return {
        twitter: '@cdsar626',
        isT: false,
        github: 'github.com/cdvsnp',
        isG: false,
        linkedin: '/in/cdsar626',
        isL: false,
        email: 'cdsar626@gmail.com',
        isE: false,
      };
    },
  };
</script>

<style scoped>
  #about {
    display: flex;
    justify-content: space-evenly;
    text-align: center;
  }

  a {
    text-decoration: none;
    color: white;
    max-width: 25vw;
  }

  img {
    max-height: 40vh;
    max-width: 25vw;
    transition: filter 0.1s;
  }

  img:hover {
    filter: drop-shadow(5px 10px 10px black);
  }

  img + div {
    background-color: rgb(100, 100, 100);
    margin: auto;
    margin-top: 10px;
    border-radius: 5px;
    width: fit-content;
    box-shadow: 0px 0px 10px 5px black;
  }

</style>
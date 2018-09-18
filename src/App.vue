<template>
  <div id="app">
    <nav>
      <router-link to="/" exact><img alt="logo" src="./assets/pata_black_A_furry_cd.png"></router-link>
      <ul>
        <li><router-link to="/" exact>Inicio</router-link></li>
        <li><router-link to="/files">Archivos</router-link></li>
        <li><router-link to="/upload">Upload</router-link></li>
        <li><router-link to="/about">Acerca</router-link></li>
      </ul>
    </nav>
    <main>
      <transition name="component-trans" mode="out-in">
        <keep-alive><router-view></router-view></keep-alive>
      </transition>
    </main>
    <notifications position='bottom right' width='30%' />
  </div>
</template>

<script>
// require vue-notification
export default {
  name: 'app',
  data() {
    return {
    };
  },
};
</script>

<style>
@font-face {
  font-family: 'timeburner';
  src: url('./assets/timeburnerbold.ttf');
}
@font-face {
  font-family: 'trueno';
  src: url('./assets/TruenoLt.otf');
}
html {
  background: linear-gradient(135deg, hsl(200deg,70%,70%), hsl(185deg,100%,70%), hsl(165deg,50%,50%)) no-repeat fixed;
  background-color: hsl(185deg,100%,70%);
}
body, body *{
  margin: 0;
  border: 0;
  padding: 0;
  box-sizing: border-box;
}
.router-link-active > img {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  margin: 1.3em 0;
  max-height: 80vh;
  max-width: 100vw;
}
nav {
  text-align: center;
  font-family: timeburner, trueno, sans-serif;

}
nav img {
  transition: all cubic-bezier(0.1, 1.0, 1,1) .3s;
  position: absolute;
  left: 50%;
  max-height: 7em;
  transform: translate3d(-50%, 0, 0);
  cursor: initial;
}
nav > ul {
  list-style: none;
  display: flex;
  justify-content: center;
  transition: all cubic-bezier(0.1, 1.0, 1,1) .3s;
  padding-top: 7em;
  transform: translate3d(0, 0em, -1);  /*Se muestra sobrante para acompañar img logo*/
  background-color: rgba(0,0,0,.3);
}
.router-link-active + ul {
  transform: translate3d(0, -7em, 0); /*Se oculta sobrante de arriba*/
}
nav > ul > li {
  flex-grow: 1;
}
nav > ul > li > a {
  text-decoration: none;
  display: block;
  color: black;
  font-size: 1.3em;
  width: inherit;

}
nav > ul > li > a:hover {
  background-color: rgba(255, 255, 255, 0.2);
}
main {
  font-family: trueno, sans-serif;
  margin-top: 2em;
}

.router-link-active {
  background: radial-gradient(circle at bottom, white, transparent);
}

.component-trans-enter-active, .component-trans-leave-active {
  transition: opacity .2s ease;
}
.component-trans-enter, .component-trans-leave-to
/* .component-trans-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.notif {
  font-size: 2em;
}

</style>

<template>
  <div id="upload" @drop.prevent.stop="" @dragover.prevent.stop="">
    <form method="POST" action="/upload" enctype="multipart/form-data">
      <label for="filesData">
        <div id="filesDrop" @dragover.prevent.stop="" @drop.prevent.stop="getDrop($event)" 
        @dragleave.prevent.stop="msg=msgOrig" @dragenter.prevent.stop="msgOrig=msg;msg='Vengan \\o/'">
          <img src="../assets/upload.png">
          <span>{{msg}}</span>
        </div>
      </label>
      <input id="filesData" type="file" name="filesData" multiple required @change="getSelected">
      <div id="Bar">
        <input :class="{disabled: isUploading, enabled: !isUploading}"
        type="submit" name="submitBtn" @click.prevent="startUpload">
        <div v-if="isUploading" :style="{width:progress + '%'}" id="progressBar"></div>
      </div>
    </form>
    <simplert :useRadius="true" :useIcon="true" ref="simplert"></simplert>
  </div>
</template>

<script>
/* eslint no-lonely-if: 0 */
import simplert from 'vue2-simplert';

export default {
  name: 'upload',
  data() {
    return {
      msg: 'Arrastre o Seleccione Archivos',
      msgOrig: '',
      files: {},
      progress: 0,
      isUploading: false,
    };
  },
  components: {
    simplert,
  },
  methods: {
    getDrop(ev) {
      const file = ev.dataTransfer.files;
      for (let i = 0; i < ev.dataTransfer.items.length; i++) {
        if (ev.dataTransfer.items[i].webkitGetAsEntry().isDirectory) {
          this.$refs.simplert.openSimplert({
            title: 'No soporto carpetas aún :(',
            message: '',
            type: 'error',
          });
          this.files = {};
          this.msg = 'Arrastre o Seleccione Archivo';
          return undefined;
        }
      }
      document.getElementById('filesData').value = '';
      if (file.length === 1) this.msg = file[0].name;
      else this.msg = `${file.length} elements selected`;
      this.files = file;
    },
    getSelected() {
      const file = document.getElementById('filesData').files;
      if (file.length === 1) this.msg = file[0].name;
      else this.msg = `${file.length} elements selected`;
      this.files = file;
    },
    startUpload() {
      if (this.isUploading) {
        this.$refs.simplert.openSimplert({
          title: 'Espera',
          message: 'Aun hay archivos en proceso.',
          type: 'warning',
        });
        return undefined;
      }
      if (this.files.length > 0) {
        this.upload(this.files[0], 0);
        let n = 1;
        // Revisa cada x tiempo si el archivo se completó de subir para subirlos secuencialmente
        const check = setInterval(() => {
          // Si se subieron n archivos igual a la cantidad que habia que subir
          // deja de revisar y restablece las variables.
          if (n === this.files.length) {
            clearInterval(check);
            this.files = {};
          } else {
            // Si aun faltan archivos por subir
            // Revisa si se completó el archivo anterior
            // Y manda a subir el próximo
            if (this.progress === 100) {
              this.progress = 0;
              this.upload(this.files[n], n);
              n++;
            }
          }
        }, 250);
      }
    },
    upload(file, nActual) {
      const formD = new FormData();
      const xhr = new XMLHttpRequest();
      xhr.open('POST', '/upload', true);
      xhr.upload.onloadstart = () => {
        this.isUploading = true;
      };
      /* Como debería de hacerse pero no me funciona en FF60
      xhr.upload.onloadend = () => {
        this.isUploading = false;
      }
      */
      xhr.upload.onprogress = (ev) => {
        if (ev.lengthComputable) {
          this.progress = (ev.loaded / ev.total) * 100;
          if (this.progress === 100) { // fallback de upload.onloadend ya que no me funciona en FF60
            this.isUploading = false;
            this.$notify({
              title: 'Completado',
              text: `Archivo: ${file.name}`,
              type: 'success',
              duration: -1,
            });
            this.msg = (nActual === 0) ? '1 archivo subido.' : `${nActual + 1} archivos subidos.`;
          }
        }
      };
      formD.append('filesData', file);
      xhr.send(formD);
    },
  },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#upload {
  text-align: center;
  height: 70vh;
}
label {
  display: block;
  width: fit-content;
  cursor: pointer;
  margin: 2em auto;
  min-width: 30vw;
}

#filesDrop {
  background-color: hsl(200deg, 50%, 50%);
  border-radius: 1em;
  transition: all 0.2s;
  padding: 20px 0;
}

#filesDrop:hover {
  background-color: hsl(200deg, 50%, 60%);
}

#filesDrop > span {
  position: relative;
  top: 30%;
}

#filesDrop > img {
  display: inline-block;
  height: 3em;
  margin: auto;
  vertical-align: middle;
  z-index: -1;
}

#filesData{
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  position: absolute;
  z-index: -1;
}

#Bar {
  position: relative;
  height: 3em;
  width: fit-content;
  margin: auto;
}
#progressBar {
  transition: all 0.1s;
  height: inherit;
  position: relative;
  top: -3em;
  left: 0;
  background-color: green;
  z-index: -1;
}

input[type="submit"]{
  background-color: hsl(170deg,80%,35%);
  transition: all 0.2s;
  padding: 1em 2em;
  cursor: pointer;
  background-clip: padding-box;
}
input[type="submit"].enabled:hover {
  animation: pulse 1.5s infinite;
}

input[type="submit"].enabled:active{
  transform: scale(0.9);
}

input[type="submit"].disabled {
  cursor: default;
  background-color: lightgray;
}

@keyframes pulse {
  0% {
    border-left: 0px solid linear-gradient(to left, skyblue, transparent);
    border-right: 0px solid linear-gradient(to right, skyblue, transparent);
  }
  50% {
    border-left: 0.8em solid linear-gradient(to left, skyblue, transparent);
    border-right: 0.8em solid linear-gradient(to right, skyblue, transparent);
  }
  100% {
    border-left: 1em solid transparent;
    border-right: 1em solid transparent;
  }
}


</style>

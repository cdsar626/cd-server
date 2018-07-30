<template>
  <div id="files">
    <button v-if="isLoading" :class="{isLoadingFiles: isLoading, quiet: !isLoading}" id="loadingBtn">Refresh</button>
    <button v-else :class="{isLoadingFiles: isLoading, quiet: !isLoading}" id="refreshBtn" @click="updateFileList">Refresh</button>
    <table>
      <tr class="tableHeaderRow">
        <th @click="sort === 1 ? sortInvert *= -1 : sort = 1" :class="{sortSelected: sort === 1}">Nombre<div :class="{invert: (sortInvert == -1) ? 0 : 1}"></div></th>
        <th @click="sort === 2 ? sortInvert *= -1 : sort = 2" :class="{sortSelected: sort === 2}">Tipo<div :class="{invert: (sortInvert == -1) ? 0 : 1}" ></div></th>
        <th @click="sort === 3 ? sortInvert *= -1 : sort = 3" :class="{sortSelected: sort === 3}">Tamaño<div :class="{invert: (sortInvert == -1) ? 0 : 1}"></div></th>
        <th @click="sort === 4 ? sortInvert *= -1 : sort = 4" :class="{sortSelected: sort === 4}">Modificación<div :class="{invert: (sortInvert == -1) ? 0 : 1}"></div></th>
      </tr>
      <tr :title="file.name" class="fileRow" v-for="file in sortedFileList" :key="file.name" >
        <td class="firstColumn"><a target="blank" :href="'/files/' + file.name">{{ file.name }}</a></td>
        <td><a target="blank" :href="'/files/' + file.name">{{ file.type }}</a></td>
        <td><a target="blank" :href="'/files/' + file.name">{{ file.size.toLocaleString() }}kB</a></td>
        <td class="lastColumn"><a target="blank" :href="'/files/' + file.name">{{ (new Date(file.mtime)).toLocaleString() }}</a></td>
      </tr>
    </table>
  </div>
</template>

<script>
  // require vue-resource
  export default {
    name: 'files',
    data() {
      return {
        files: [],
        sort: 4, // 1:name 2:type 3:size 4:mtime
        sortInvert: -1, // 1:yes -1:no
        isLoading: false,
      };
    },
    created() {
      this.updateFileList();
      /*
      this.$VueApp.$on('newFileUploaded', () => {
        this.updateFileList();
      });
      */
    },
    methods: {
      updateFileList() {
        this.isLoading = true;
        this.$http.get('/files').then((res) => {
          this.files = res.body;
          this.isLoading = false;
        });
      },
      sortByName() {
        this.files.sort((a, b) => {
          if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1 * this.sortInvert;
          } else if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1 * this.sortInvert;
          }
          return 0;
        });
        return this.files;
      },
      sortByType() {
        this.files.sort((a, b) => {
          if (a.type > b.type) {
            return 1 * this.sortInvert;
          } else if (a.type < b.type) {
            return -1 * this.sortInvert;
          }
          return 0;
        });
        return this.files;
      },
      sortBySize() {
        this.files.sort((a, b) => {
          if (a.size > b.size) {
            return 1 * this.sortInvert;
          } else if (a.size < b.size) {
            return -1 * this.sortInvert;
          }
          return 0;
        });
        return this.files;
      },
      sortByMtime() {
        this.files.sort((a, b) => {
          if (a.mtime > b.mtime) {
            return 1 * this.sortInvert;
          } else if (a.mtime < b.mtime) {
            return -1 * this.sortInvert;
          }
          return 0;
        });
        return this.files;
      },
    },
    computed: {
      sortedFileList() {
        switch (this.sort) {
          case 1: return this.sortByName();
          case 2: return this.sortByType();
          case 3: return this.sortBySize();
          default: return this.sortByMtime();
        }
      },
    },
  };
  
</script>

<style scoped>
#files {
  text-align: center;
}
#refreshBtn {
  transition: all 0.2s linear;
  position: absolute;
  top: 11em;
  right: 5vw;
  background: url('../assets/refresh.png') center / 100% 100%;
  width: 10vw;
  height: 10vw;
  max-width: 50px;
  max-height: 50px;
}

#loadingBtn {
  transition: all 0.2s linear;
  position: absolute;
  top: 17em;
  right: 45vw;
  background: url('../assets/refresh.png') center / 100% 100%;
  width: 10vw;
  height: 10vw;
  max-width: 50px;
  max-height: 50px;
}

#loadingBtn.isLoadingFiles {
  width: 20vw;
  height: 20vw;
  max-width: 100px;
  max-height: 100px;
  animation: spin 0.5s reverse linear infinite;
  color: transparent;
}

#refreshBtn:active {
  transform: scale(0.9);
}
#refreshBtn.quiet {
  animation: toCorner 0.5s linear 1  forwards;
}

@keyframes spin {
  0% {
    transform: rotate3d(0,0,1,180deg);
  }
  100% {
    transform: rotate3d(0,0,1,360deg);
  }
}
@keyframes toCenter {
  0% {
    transform: translate3d(0,0,0);
  }
  100% {
    transform: translate3d(-42vw,20vh,0);
  }
}
@keyframes toCorner {
  0% {
    transform: translate3d(0vw,0vh,0);
  }
  100% {
    transform: translate3d(47,-20,0);
  }
}

table {
  margin: auto;
  border-spacing: 0;
  border-radius: 10px;
  overflow: hidden;
  margin-top: 1em;
  box-shadow: rgb(73, 73, 73) 0px -5px 5px;
  min-width: 75vw;
}
tr {
  background-color: snow;
}
tr:hover {
  box-shadow: inset 1px 1px 10px 1px black;
}
tr:nth-child(2n){
  background-color: lavender;
}

tr:last-child {
  background: linear-gradient(lavender, transparent);
}

.tableHeaderRow {
  cursor: pointer;
}
th {
  border-right: 1px dashed;
}
th:last-child {
  border: none;
}

.fileRow {
  text-align: right;
}

.firstColumn, td:nth-child(1) { /* primer y 2da columna */
  text-align: left;
}
.firstColumn > a {
  max-width: 50vw;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  padding-right: 5px;
}

td > a {
  display: block;
  text-decoration: none;
  color:black;
  white-space: nowrap;
  padding: 5px 5px;
}

th > div::before{
  content: "";
  display: block;
  margin: auto;
  border-right: 2px black solid;
  border-top: 2px black solid;
  border-bottom: 0px transparent solid;
  border-left: 0px transparent solid;
  position: relative;
  height: 5px;
  width: 5px;
  transform: rotate(135deg);
  margin-bottom: 3px;
  display: none;
}
.invert {
  transform: rotate(180deg);
}
.sortSelected{
  color:gray;
  border-color: black;
}
th.sortSelected > div::before {
  border-right: 2px gray solid;
  border-top: 2px gray solid;
  display: block;
}

@media screen and (max-width: 570px) {
  td:nth-child(2), th:nth-child(2){
    display: none;
  }
}
@media screen and (max-width: 475px) {
    tr {
      font-size: 0.8em;
    }
  }
</style>
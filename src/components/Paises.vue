<template>
  <div id="paises">
    <div id="submitForm">
      <form method="post" action="/paises">
        <input type="text" placeholder="Usuario" name="user"></input>
        <input type="text" placeholder="Correo" name="mail"></input>
        <input type="text" placeholder="Pais" name="pais"></input>
        <input type="text" placeholder="Ingreso" name="ingress"></input>
        <input type="text" placeholder="Canasta" name="canasta"></input>
        <input type="text" placeholder="Bus" name="bus"></input>
        <input type="text" placeholder="Metro" name="metro"></input>
        <input type="text" placeholder="Luz" name="luz"></input>
        <input type="text" placeholder="Agua" name="agua"></input>
        <input type="text" placeholder="Gas" name="gas"></input>
        <input type="text" placeholder="Internet" name="inter"></input>
        <input type="text" placeholder="Tlf" name="tlf"></input>
        <input type="text" placeholder="Gasolina" name="gasolina"></input>
        <input type="text" placeholder="IVA (Impuesto)" name="iva"></input>
        <input type="text" placeholder="Hab Minimo" name="hmin"></input>
        <input type="text" placeholder="Hab Maximo" name="hmax"></input>
        <input type="submit" value="Enviar datos">
      </form>
    </div>
    <table>
      <tr>
        <th>Pais</th>
        <th>Ingreso Minimo</th>
        <th>Canasta Básica</th>
        <th>Bus</th>
      </tr>
      <tr v-for="paises in dataPaises" >
        <td> {{ paises.Pais }} </td>
        <td> {{ paises.IngMin }} </td>
        <td> {{ paises.Canasta }} </td>
        <td> {{ paises.Bus }} </td>
      </tr>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'paises',
    data() {
      return {
        dataPaises: {},
      };
    },
    mounted() {
      this.$http.get('/paises').then((res) => {
        this.dataPaises = res.body;
      });
    },
  };
</script>

<style>
</style>
import Vue from 'vue';
import Router from 'vue-router';
import VueResource from 'vue-resource';
import Upload from '@/components/Upload';
import Files from '@/components/Files';
import About from '@/components/About';

Vue.use(VueResource);
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      template: '',
    },
    {
      path: '/upload',
      name: 'Upload',
      component: Upload,
    },
    {
      path: '/files',
      name: 'Files',
      component: Files,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
  ],
});

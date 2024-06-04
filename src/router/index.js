import { createWebHistory, createRouter } from 'vue-router'
import Login from '../components/Login.vue'
import SignUp from '../components/SignUp.vue'
//import Main from '../components/Main.vue'
//import PublicPage from '../components/PublicPage.vue'
import CurrentSymptoms from '../components/CurrentSymptoms.vue'
import Content from '../components/Content.vue'
import ContentPublic from '../components/ContentPublic.vue'
import NotFound from '../components/NotFound.vue'
import MultipleChoice from '../components/MultipleChoice.vue'
import TwoChoice from '../components/TwoChoice.vue'
import DragMultipleChoice from '../components/DragMultipleChoice.vue'
import OrderOptions from '../components/OrderOptions.vue'
import Main2 from '../components/Main2.vue'
import BeginGame from '../components/BeginGame.vue'
import EndGame from '../components/EndGame.vue'
import UserProfile from '../components/UserProfile.vue'
import UserGeral from '../components/UserGeral.vue'
import UserStatus from '../components/UserStatus.vue'
import Scoreboard from '../components/Scoreboard.vue'



// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
    { 
      path: '/login', 
      name: 'Login',
      component: Login,
      showRoute: ['public'],
      meta: {
        hideNavbar: true,
      }
    },
    { 
      path: '/signup', 
      name: 'Sign up',
      component: SignUp,
      showRoute: ['public'],
      meta: {
        hideNavbar: true,
      }
    },
/*     { 
      path: '/main', 
      name: 'Main',
      component: Main,
      showRoute: ['private']
    }, */
/*     { 
      path: '/public', 
      name: 'Public',
      component: PublicPage,
      showRoute: ['public', 'private']
    }, */
    { 
      path: '/currentSymptoms', 
      name: 'Current Symptoms',
      component: CurrentSymptoms,
      showRoute: ['public', 'private'],
      meta: {
        hideNavbar: true,
      }
    },
    { 
      path: '/multipleChoice', 
      name: 'MultipleChoice',
      component: MultipleChoice,
      showRoute: ['public', 'private'],
      meta: {
        hideNavbar: true,
      }
    },
    { 
      path: '/twoChoice', 
      name: 'TwoChoice',
      component: TwoChoice,
      showRoute: ['public', 'private'],
      meta: {
        hideNavbar: true,
      }
    },
    { 
      path: '/dragMultipleChoice', 
      name: 'DragMultipleChoice',
      component: DragMultipleChoice,
      showRoute: ['public', 'private'],
      meta: {
        hideNavbar: true,
      }
    },
    { 
      path: '/orderOptions', 
      name: 'OrderOptions',
      component: OrderOptions,
      showRoute: ['public', 'private'],
      meta: {
        hideNavbar: true,
      }
    },
    { 
      path: '/main2', 
      name: 'Main2',
      component: Main2,
      showRoute: ['public'],
      meta: {
        hideNavbar: false,
      }
    },
    { 
      path: '/beginGame', 
      name: 'BeginGame',
      component: BeginGame,
      showRoute: ['public'],
      meta: {
        hideNavbar: true,
      }
    },
    { 
      path: '/endGame', 
      name: 'EndGame',
      component: EndGame,
      showRoute: ['public'],
      meta: {
        hideNavbar: true,
      }
    },

    { 
      path: '/userProfile', 
      name: 'UserProfile',
      component: UserProfile,
      showRoute: ['public', 'private'],
      meta: {
        hideNavbar: false,
      }
    },
    { 
      path: '/userGeral', 
      name: 'UserGeral',
      component: UserGeral,
      showRoute: ['public', 'private'],
      meta: {
        hideNavbar: false,
      }
    },
    { 
      path: '/userStatus', 
      name: 'UserStatus',
      component: UserStatus,
      showRoute: ['public', 'private'],
      meta: {
        hideNavbar: false,
      }
    },
    { 
      path: '/scoreboard', 
      name: 'Scoreboard',
      component: Scoreboard,
      showRoute: ['public', 'private'],
      meta: {
        hideNavbar: false,
      }
    },
    
    { 
      path: '/folders/:folderId', 
      name: 'Content',
      component: Content,
      showRoute: []
    },
    { 
      path: '/folders/:idFolder/:nameUser/:nameFolder/public', 
      name: 'ContentPublic',
      component: ContentPublic,
      showRoute: []
    },
    {
      path: "/:catchAll(.*)", 
      name: "Not found",
      component: NotFound,
      showRoute: []
    }
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
})

router.beforeEach((to, from, next) => {
  const publicPages = routes.filter(route => route.showRoute.includes('public')).map(route => route.path)
  const authNotRequired = publicPages.some(v => to.path.includes(v));
  const loggedIn = localStorage.getItem('user');


  // trying to access a restricted page + not logged in
  // redirect to login page
  if (!authNotRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router
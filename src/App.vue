<template>
  <div id="wrapper">
    <!-- Navbar 0 -->
    <nav class="navbar is-black">
      <div class="container">
        <div class="navbar-start">
          
        </div>

        <div class="navbar-item">          
          <form method="get" action="/search">
            <div class="field has-addons">
              <div class="control">
                <input type="text" class="input" placeholder="Que estas buscando?" name="query">
              </div>

              <div class="control">
                <button class="button is-warning">
                  <span class="icon">
                  <i class="fas fa-search"></i>
                  </span>
                </button>
              </div>
            </div>
          </form>          
        </div>      
          
        <div class="navbar-end">
          
        </div>
      </div> 
    </nav>

    
    <nav class="navbar is-black">
      <div class="container">
        <div class="navbar-brand">
          <a class="navbar-item" href="/">
            <img src="data:image/png;base64,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" alt="Logo">
            <strong style="font-family: Arial, sans-serif; margin-left: 1rem;"> Cervecerias Artesanales </strong>
          </a>

          <span class="navbar-burger" data-target="navbarMenuHeroC" aria-label="menu" aria-expanded="false" @click="showMobileMenu = !showMobileMenu">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </div>
        
        <div id="navbarMenuHeroC" class="navbar-menu" v-bind:class="{'is-active': showMobileMenu }">
          <div class="navbar-end">
            <router-link to="/summer" class="navbar-item">Lager</router-link>
            <router-link to="/winter" class="navbar-item">IPA</router-link>

            <div class="navbar-item">
              <div class="buttons">
                <template v-if="$store.state.isAuthenticated">
                  
                  <router-link to="/my-account" class="button is-black">
                    <span class="icon"><i class="fas fa-user"> </i></span>
                    <h1>Mi cuenta</h1>
                  </router-link>
                </template>

                <template v-else>
                  <router-link to="/log-in" class="button is-black">
                    <span class="icon"><i class="fas fa-user"> </i></span>
                    <h1>Entrar</h1>
                  </router-link>
                  
                </template>

                <router-link to="/cart" class="button is-warning">
                  <span class="icon"><i class="fas fa-shopping-cart"></i></span>
                  <span> ({{ cartTotalLength }})</span>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav> 

    <div>        
      <router-view/>
    </div>

    <div class="is-loading-bar has-text-centered" v-bind:class="{'is-loading': $store.state.isLoading }">
      <div class="lds-dual-ring"></div>
    </div>

    <footer class="footer">
      <p class="has-text-centered">Copyright (c) 2022 - NextLevelPlay</p>
    </footer>
    
  </div>  
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      showMobileMenu: false,
      cart: {
        items: [],
      }
    }
  },
  beforeCreate() {

    this.$store.commit('initializeStore')


    const token = this.$store.state.token
    if (token) {
        axios.defaults.headers.common['Authorization'] = "Token " + token
    } else {
        axios.defaults.headers.common['Authorization'] = ""
    }
  },

  mounted() {
    this.cart = this.$store.state.cart
  },
  methods : {
    isHome(){
      if (window.location.pathname != '/'){
        return false
      }
      return true
    }
  },
  computed: {
    cartTotalLength() {
      let totalLength = 0
      
      for (let i = 0; i < this.cart.items.length; i++) {
          totalLength += this.cart.items[i].quantity
      }
      return totalLength
    }
  },
}
</script>

<style lang="scss">
@import '../node_modules/bulma';

.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #ccc;
  border-color: #ccc transparent #ccc transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.is-loading-bar {
  height: 0;
  overflow: hidden;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  &.is-loading {
    height: 80px;
  }
}
</style>

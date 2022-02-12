<template>
  <div id="wrapper">
    <!-- Navbar 0 -->
    <nav class="navbar is-black">
      <div class="container">
        <div class="navbar-start">
          
        </div>    
        <div>
          ver alpha 1
        </div>
        <div class="navbar-end">
          
        </div>
      </div> 
    </nav>

    
    <nav class="navbar is-black">
      <div class="container">
        <div class="navbar-brand">
          <a class="navbar-item" href="/">
            <img class="max" src="https://upload.wikimedia.org/wikipedia/commons/d/dd/Coca-Cola_logo_white.png">
          </a>

          <span class="navbar-burger" data-target="navbarMenuHeroC" aria-label="menu" aria-expanded="false" @click="showMobileMenu = !showMobileMenu">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </div>
        
        <div id="navbarMenuHeroC" class="navbar-menu" style="background-color: #0a0a0a;" v-bind:class="{'is-active': showMobileMenu }">
          
          <div class="navbar-end">
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

    <div class="footers">
      <p class="has-text-centered">Copyright (c) 2022 - NextLevelPlay</p>
    </div>
    
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
.footers {
  background-color: #0a0a0a;
  padding: 3rem .5rem 6rem;
  color: white;
}

.navbar-item .max {
  max-height: 7rem;
  height: auto;
  width: auto;
  padding-bottom: 2rem;
}
</style>

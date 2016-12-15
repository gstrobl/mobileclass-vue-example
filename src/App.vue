<template>
    <div class="container">
      <!-- Static navbar -->
      <nav class="navbar navbar-default">
        <div class="container-fluid">
          <div class="navbar-header">
            <router-link class="navbar-brand" to="/">Gerald Strobl</router-link>
          </div>
          <div id="navbar" class="navbar-collapse collapse">
            <ul class="nav navbar-nav">
              <li>
                <router-link to="/">{{ $t('menu_item.home') }}</router-link>
              </li>
              <li>
                <router-link to="/portolio">{{ $t('menu_item.portfolio') }}</router-link>
              </li>
              <li>
                <router-link to="/contact">{{ $t('menu_item.contact') }}</router-link>
              </li>
              <li>
                <router-link to="/legalnotice">{{ $t('menu_item.legalnotice') }}</router-link>
              </li>
            </ul>
            <ul class="nav navbar-nav navbar-right" v-for="lang in langs">
              <li><a @click="changeLang(lang.code)">{{lang.text}}</a></li>
            </ul>
          </div><!--/.nav-collapse -->
        </div><!--/.container-fluid -->
      </nav>
      <div>
        <router-view></router-view>
      </div>
    </div>
</template>

<script>
/* globals fetch */
import Vue from 'vue'
import locales from './helpers/locales'
export default {
  data () {
    return {
      selected: '',
      langs: [
        { code: 'de', text: 'Deutsch' },
        { code: 'en', text: 'English' },
        { code: 'es', text: 'Espanol' }
      ]
    }
  },
  methods: {
    changeLang (lang) {
      console.log(lang)
      this.selected = lang
    }
  },
  created () {
    Object.keys(locales).forEach(function (lang) {
      Vue.locale(lang, locales[lang])
    })
  },
  mounted () {
    this.selected = 'de'
    Vue.config.lang = 'de'
  },
  watch: {
    selected (val, old) {
      var self = this
      if (!Vue.locale(val)) {
        Vue.locale(val, () => {
          self.loading = true
          return fetch('/locale/' + val, {
            method: 'get',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          }).then((res) => {
            return res.json()
          }).then((json) => {
            self.loading = false
            if (Object.keys(json).length === 0) {
              return Promise.reject(new Error('locale empty !!'))
            } else {
              return Promise.resolve(json)
            }
          }).catch((error) => {
            self.error = error.message
            return Promise.reject()
          })
        }, () => {
          Vue.config.lang = val
        })
      } else {
        Vue.config.lang = val
      }
    }
  }
}
</script>

import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from './lang/en'
import axios from 'axios'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'en', // 设置语言环境
  fallbackLocale: 'en',
  messages: {
    'en': messages
  } // 设置语言环境信息
})

const loadedLanguages = ['en'] // 我们的预装默认语言

function setI18nLanguage (lang) {
  i18n.locale = lang
  axios.defaults.headers.common['Accept-Language'] = lang
  document.querySelector('html').setAttribute('lang', lang)
  return lang
}

function loadLanguageAsync (lang) {
  if (i18n.locale !== lang) {
    if (!loadedLanguages.includes(lang)) {
      return import(/* webpackChunkName: "lang-[request]" */ `./lang/${lang}`).then(msgs => {
        i18n.setLocaleMessage(lang, msgs.default)
        loadedLanguages.push(lang)
        return setI18nLanguage(lang)
      })
    }
    return Promise.resolve(setI18nLanguage(lang))
  }
  return Promise.resolve(lang)
}
export {
  i18n,
  loadLanguageAsync
}

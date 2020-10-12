import store from '../store'
import ru from '../locales/ru.json'
import en from '../locales/en.json'

const locales = {
    'ru-RU': ru,
    'en-US': en
}

/**
 * Вернуть текст на определенном языке по ключу
 * @param key
 * @returns {*|string}
 */
export default function localizeFilter(key) {
    const locale = store.getters.info.locale || 'ru-RU'
    return locales[locale][key] || '[Localize error]: key ' + key + ' not found'
}
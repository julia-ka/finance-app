/**
 * Фильтр- вернуть значение в определенной валюте
 * @param value
 * @param currency
 * @returns {string}
 */
export default function currencyFilter(value, currency = 'RUB') {
    return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency
    }).format(value)
}
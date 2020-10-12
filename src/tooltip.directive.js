export default {
    /**
     * Инициализировать всплывающий блок / тултип
     * @param el
     * @param value
     */
    bind(el, {value}) {
        window.M.Tooltip.init(el, {html:value})
    },
    /**
     * Удалить инициализированные тултипы
     * @param el
     */
    unbind(el) {
        const tooltip = window.M.Tooltip.getInstance(el)

        if (tooltip && tooltip.destroy) {
            tooltip.destroy()
        }
    }
}
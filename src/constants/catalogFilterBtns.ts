export const onlyAvailableProducts = 'available'


export const catalogFilterBtns = () => {
    return [
        {
            name: 'all',
            label: 'Все товары',
        },
        {
            name: onlyAvailableProducts,
            label: 'Товары в наличие',
        }
    ]
}

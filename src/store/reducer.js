import * as actions from './actions/actions';




export const initialState = {
    products: [
        {
            _id: "asdasd",
            name: "Mobile",
            img: 'https://obamawhitehouse.archives.gov/sites/default/files/image/image_file/50-50-page-header.jpg',
            description: `Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sagittis, massa fringilla consequat blandit, mauris ligula porta nisi, non tristique enim sapien vel nisl. Suspendisse vestibulum lobortis dapibus.
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sagittis, massa fringilla consequat blandit, mauris ligula porta nisi, non tristique enim sapien vel nisl. Suspendisse vestibulum lobortis dapibus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae`,
            category: 'Mobiles',
            price: "500",
            discount: "70",
            isOnSale: true,
            paymentTypes: ['Cash On Delivery', 'Visa', 'Master Card'],
            tags: ['newTag', 'testTag']
        },
    ],
    isListingCached: false,
    selectedProduct: {},
    categories: [
        'Arts & Crafts',
        'Automotive',
        'Baby',
        'Books',
        'Eletronics',
        "Women's Fashion",
        "Men's Fashion",
        'Health & Household',
        'Home & Kitchen',
        'Military Accessories',
        'Movies & Television',
        'Sports & Outdoors',
        'Tools & Home Improvement',
        'Toys & Games'
    ]
}


const productReducer = (state = initialState, action) => {
    let newProducts = [...state.products];
    let newProduct = { ...state.selectedProduct };
    let isCached = state.isListingCached;
    switch (action.type) {
        case actions.GET_ALL_PRODUCTS:
            const { data } = { ...action.payload };
            newProducts = [...data];
            break;

        case actions.GET_PRODUCT:
            newProduct = { ...action.payload };
            break;

        case actions.ADD_PRODUCT:
            newProducts.push({ ...action.payload });
            break;

        case actions.DELETE_PRODUCT:
            const productIndex = newProducts.findIndex(p => p._id.toString() === action.payload.toString());
            if (productIndex !== -1) {

                newProducts.splice(productIndex, 1);
            }
            break;
        case action.ERROR:
            console.log(action.payload);
            break
        case action.CHACECHANGE:
            isCached = !isCached;
            break
        default:
            break;
    }
    return {
        ...state,
        products: newProducts,
        isListingCached: isCached,
        selectedProduct: newProduct
    };
}

export default productReducer;
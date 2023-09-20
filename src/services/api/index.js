const API = process.env.NEXT_PUBLIC_API_URL;
const VERSION = process.env.NEXT_PUBLIC_API_VERSION;

const endPoints = {
  auth: {
    login: `${API}/api/${VERSION}/auth/login`,
    profile: `${API}/api/${VERSION}/auth/profile`,
    recoveryPassword: `${API}/api/${VERSION}/auth/recovery`,
    changePassword: `${API}/api/${VERSION}/auth/change-password`,
  },
  products: {
    getProduct: (id) => `${API}/api/${VERSION}/products/${id}/`,
    getProducts: (limit, offset) => `${API}/api/${VERSION}/products?limit=${limit}&offset=${offset}`,
    getAllProducts: `${API}/api/${VERSION}/products/`,
    addProducts: `${API}/api/${VERSION}/products`,
    updateProducts: (id) => `${API}/api/${VERSION}/products/${id}/`,
    deleteProduct: (id) => `${API}/api/${VERSION}/products/${id}/`,
  },
  categories: {
    getCategoriesList: `${API}/api/${VERSION}/categories/`,
    getCategory: (id) => `${API}/api/${VERSION}/categories/${id}`,
    addCategory: `${API}/api/${VERSION}/categories/`,
    getCategoryItems: (id) => `${API}/api/${VERSION}/categories/${id}/products/`,
    updateCategory: (id) => `${API}/api/${VERSION}/categories/${id}/`,
    deleteCategory: (id) => `${API}/api/${VERSION}/categories/${id}/`,
  },
  users: {
    getUsers: `${API}/api/${VERSION}/users/`,
    getOneUser: (id) => `${API}/api/${VERSION}/users/${id}`,
    addUser: `${API}/api/${VERSION}/users/`,
    updateUser: (id) => `${API}/api/${VERSION}/users/${id}/`,
    deleteUser: (id) => `${API}/api/${VERSION}/users/${id}/`,
  },
  orders: {
    getAllOrders: `${API}/api/${VERSION}/orders/`,
    getOrder: (id) => `${API}/api/${VERSION}/orders/${id}/`,
    addOrder: `${API}/api/${VERSION}/orders/`,
    deleteOrder: (id) => `${API}/api/${VERSION}/orders/${id}/`,
    addItem: `${API}/api/${VERSION}/orders/add-item`,
    removeItem: `${API}/api/${VERSION}/orders/remove-item`,
    getOrderItems: (id) => `${API}/api/${VERSION}/orders/items/${id}`,
    updateOrderProduct: (id) => `${API}/api/${VERSION}/orders/items/${id}`,
  },
  colors: {
    createColor: `${API}/api/${VERSION}/colors`,
    getColors: `${API}/api/${VERSION}/colors`,
    getOneColor: (id) => `${API}/api/${VERSION}/colors/${id}`,
    updateColor: (id) => `${API}/api/${VERSION}/colors/${id}`,
    deleteColor: (id) => `${API}/api/${VERSION}/colors/${id}`,
  },
};

export default endPoints;
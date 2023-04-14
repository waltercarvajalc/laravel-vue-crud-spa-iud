const Home = () => import('./components/Home.vue')
const Contacto = () => import('./components/Contacto.vue')
//importamos los componentes para el blog
const Mostrar = () => import('./components/blog/Mostrar.vue')
const Crear = () => import('./components/blog/Crear.vue')
const Editar = () => import('./components/blog/Editar.vue')
const Show = () => import('./components/blog/Show.vue')

export const routes = [
    {
        name: 'home',
        path: '/',
        component: Home
    },
    {
        name: 'mostrarBlogs',
        path: '/blogs',
        component: Mostrar
    },
    {
        name: 'crearBlog',
        path: '/crear',
        component: Crear
    },
    {
        name: 'editarBlog',
        path: '/editar/:id',
        component: Editar
    },

    {
        name: 'showBlog',
        path: '/show/:id',
        component: Show
    },
    {
        name: 'contacto',
        path: '/contacto',
        component: Contacto
    },
    
]
<template>
    <div class="row">
        <div class="container mt-4">
        <div class="row">
            <div class="col text-center">
                <h1>Todos los <span class="badge bg-secondary">Blogs</span></h1>
            </div>
        </div>
    </div>
        <div class="col-12 mb-2">
            <!-- llamamos al componente para Crear   -->
            <router-link :to='{name:"crearBlog"}' class="btn btn-success"><i class="fas fa-plus-circle"></i></router-link>
        </div>
        <div class="col-12">             
                    <div class="table-responsive">
                        <table class="table table-bordered">
                            <thead class="bg-primary text-white">
                                <tr>
                                    <th>ID</th>
                                    <th>Título</th>
                                    <th>Contenido</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="blog in blogs.data" :key="blog.id">
                                    <td>{{ blog.id }}</td>
                                    <td>{{ blog.titulo }}</td>
                                    <td>{{ blog.contenido }}</td>
                                    <td>                                   
                                        <!-- llamamos al componente para Editar     -->
                                        <router-link :to='{name:"editarBlog",params:{id:blog.id}}' ><abbr title="Editar"><i class="fas fa-edit fa"></i></abbr></router-link>
                                        <a type="button" @click="borrarBlog(blog.id)" ><abbr title="Eliminar"><i class="fas fa-trash fa" style="color: red"></i></abbr></a>
                                        <!-- llamamos al componente para Show     -->
                                        <router-link :to='{name:"showBlog",params:{id:blog.id}}' ><abbr title="Ver"><i class="fas fa-eye fa" style="color: green"></i></abbr></router-link>                                        
                                    </td>
                                </tr>
                            </tbody>                            
                        </table>

                        <!--paginacion-->
                        <div class="row">
                            <div class="col-3 md-3 text-right text-primary">
                                {{ blogs.from }} - {{ blogs.to }} total:{{ blogs.total }}
                            </div>
                            <div class="col-2 md-2">
                                <select class="form-select" v-model="pagination.per_page" @change="mostrarBlogs();">
                                    <option value="3">3</option>
                                    <option value="5">5</option>
                                    <option value="8">8</option>
                                </select>
                            </div>
                            <div class="col-6 md-6">
                                <nav>
                                    <ul class="pagination">
                                        <li class="page-item" :class="{disabled:pagination.page==1}"><a href="#" class="page-link" @click="pagination.page=1; mostrarBlogs();">&laquo</a></li>
                                        <li class="page-item" :class="{disabled:pagination.page==1}"><a href="#" class="page-link" @click="pagination.page--; mostrarBlogs();">&lt</a></li>
                                        <li class="page-item" v-for="n in paginas" :key="n" :class="{active:pagination.page==n}"><a href="#" class="page-link" @click="pagination.page=n; mostrarBlogs();">{{n}}</a></li>
                                        <li class="page-item" :class="{disabled:pagination.page==blogs.last_page}"><a href="#" class="page-link" @click="pagination.page++; mostrarBlogs();">&gt</a></li>
                                        <li class="page-item" :class="{disabled:pagination.page==blogs.last_page}"><a href="#" class="page-link" @click="pagination.page=blogs.last_page; mostrarBlogs();">&raquo</a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>                          
        </div>
    </div>
</template>

<script>
export default {
    name:"blogs",
    data(){
        return {
            blogs:[],
            pagination:{
                page:1,
                per_page:3,
            },
            paginas:[],
        }
    },
    mounted(){
        this.mostrarBlogs()
    },
    methods:{
        async mostrarBlogs(){
            await this.axios.get('/api/blog',{params: this.pagination}).then(response=>{
                this.blogs = response.data
            }).catch(error=>{
                console.log(error)
                this.blogs = []
            })
            this.listarPaginas();
        },

        listarPaginas(){
            const n=2
            let arrayN=[]
            let ini = this.pagination.page -2
            if(ini<1){
                ini=1
            }
            let fin = this.pagination.page +2
            if(fin>this.blogs.last_page){
                fin=this.blogs.last_page
            }
            for(let i=ini; i<=fin; i++){
                arrayN.push(i)
            }
            this.paginas=arrayN
        },

        borrarBlog(id){
            if(confirm("¿Confirma eliminar el registro?")){
                this.axios.delete(`/api/blog/${id}`).then(response=>{
                    this.$swal('Blog eliminado!');
                    this.mostrarBlogs()
                }).catch(error=>{
                    this.$swal({ icon: 'warning', title: 'Ocurrió un error'});
                    console.log(error)
                })
            }
        }
    }
}
</script>
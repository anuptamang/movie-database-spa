let Error404 = {

    render: async () => {
        let view = `
            <section class="container py-5">
                <h1 class="text-center text-white"> 404 Error </h1>
            </section>
        `
        return view
    }
    , after_render: async () => {
    }
}
export default Error404;
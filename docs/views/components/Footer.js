const Bottombar = {
    render: async () => {
        const view = `
        <div class="bg-dark text-white text-center">
            <div class="container py-5">
               <img
                width="100"
                height="100"
                src="https://cdn3.iconfinder.com/data/icons/cloud-computing-3-3/49/131-512.png"
                alt=""
            /> 
            <div className="copyright pt-4">&copy; Movie Database APP 2019</div>
            </div>
        </div>
        `
        return view
    },
    after_render: async () => { }

}

export default Bottombar;
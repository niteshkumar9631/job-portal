const Footer = () => {
    return (
        <footer className='bg-gray-800 text-white mt-10'>
            <div className='max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center gap-4'>
                <div>
                    <h2 className='text-xl font-bold'>
                        Job<span className='text-purple-400'>Portal</span>
                    </h2>
                    <p className='text-gray-400 text-sm mt-1'>Find your dream job today</p>
                </div>
                <p className='text-gray-400 text-sm'>
                    © 2024 JobPortal. All rights reserved.
                </p>
            </div>
        </footer>
    )
}

export default Footer
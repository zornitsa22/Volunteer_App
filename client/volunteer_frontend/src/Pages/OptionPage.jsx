
import patrick from "../assets/patrick.png"
import cars from "../assets/cars.png"

const OptionPage = () => {
return (
    <div >
        <div className='max-w-[1000px] mx-auto px-4 py-12  flex flex-col justify-center w-full h-full'>
                <h2 className='text-black font-bold text-4xl text-center py-12'>Welcome! Choose an option:</h2>
        <div className="grid sm:grid-cols-2 gap-8">
        
            <div style={{backgroundImage: `url(${patrick})`}}
                className="shadow-lg shadow-[#040c16] bg-black-80 group container rounded-md flex justify-center items-center mx-auto content-div">

                    {/**Hover effects */}
                    <div className='opacity-0 group-hover:opacity-100 '>
                        <span className='text-4xl font-bold text-orange-800 py-12 tracking-wider'>
                        Are you a Volunteer?
                        </span>
                        <div className='pt-8 text-center'>
                            <a href="/register/volunteer">
                                <button className='text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg'>
                                    Register 
                                </button>
                            </a>
                            <a href="/login/volunteer">
                                <button className='text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg'>
                                    Login
                                </button>
                            </a>
                        </div>
                    </div>
                </div>

                <div style={{backgroundImage: `url(${cars})`}}
                className="shadow-lg shadow-[#040c16] bg-black/80 group container rounded-md flex justify-center items-center mx-auto content-div">
                {/**Hover effects */}
                                <div className='opacity-0 group-hover:opacity-100 '>
                        <span className='text-4xl font-bold text-blue-800 py-12 tracking-wider'>
                        Are you an organization?
                        </span>
                        <div className='pt-8 text-center'>
                            <a href="/register/organization">
                                <button className='text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg'>
                                    Register 
                                </button>
                            </a>
                            <a href="/login/organization">
                                <button className='text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg'>
                                    Login
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
);
};

export default OptionPage;

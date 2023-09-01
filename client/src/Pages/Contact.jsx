import donations from "../assets/donations.png";

const Contact = () => {
    return (
        <div className="bg-gray-100 py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/2 mb-10 lg:mb-0">
                <img
                  src={donations}
                  alt="Team"
                  className="w-full h-auto rounded-lg shadow-md"
                />
              </div>
              <div className="lg:w-1/2 lg:pl-16">
                <h2 className="text-3xl font-semibold mb-4">Your Support Makes a World of Difference: Contact Us to Get Involved</h2>
                <h3 className="text-xl font-semibold mb-4">Submit the form below</h3>
                <div  className= 'w-full h-screen flex justify-center items-center p-4'>
                <form method='POST' action="https://getform.io/f/88c9cffa-be1d-4e63-8483-c894ca735f2f" className='flex flex-col max-w-[600px] w-full'>
                    <input className='bg-[#ccd6f6] p-2' type="text" placeholder='name' name='name'/>
                    <input className='my-4 p-2 bg-[#ccd6f6]' type="email" placeholder='Email' name='email'/>
                    <textarea className='bg-[#ccd6f6]' name="message"  rows="10" placeholder='Message'></textarea>
                    <button className="text-black border-2 hover:bg-pink-600 hover:border-pink-600 px-4 py-3 my-8 mx-auto flex items-center">Let's Collaborate </button>
                </form>
                 </div>
    
              </div>
            </div>
          </div>
        </div>
      );
    };

export default Contact

import contactImage from "../assets/contact.jpg";

const Contact = () => {
  return (
    <div
      className="bg-[url_to_your_image] bg-cover bg-center bg-no-repeat bg-opacity-50 py-16"
      style={{
        backgroundImage: `url(${contactImage})`,
      }}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-gray-800 font-bold py-12 text-4xl text-center">
          Be the Change: Get in Touch to Make a Difference
        </h2>
        <div className="lg:w-1/2 lg:pr-8 mb-8 mx-auto">
          <h3 className="text-green-800 font-bold py-12 text-4xl text-center">
            Submit the form below
          </h3>
          <form
            method="POST"
            action="https://getform.io/f/88c9cffa-be1d-4e63-8483-c894ca735f2f"
            className="flex flex-col max-w-[600px] mx-auto"
          >
            <label className="text-gray-500">Name:</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Name"
              name="name"
            />
            <label className="text-gray-500">Email:</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              placeholder="Email"
              name="email"
            />
            <label className="text-gray-500">Message:</label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="message"
              rows="5"
              placeholder="Message"
            ></textarea>
            <button className="bg-[#A9BE93] hover:bg-[#2A4434] text-white py-3 rounded-md mt-4 transition-colors">
              Let's Collaborate
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;

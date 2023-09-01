const causesData = [
  {
    title: "Environmental Conservation",
    description:
      "Volunteering for environmental conservation involves activities such as tree planting, beach cleanups, wildlife habitat restoration, and promoting sustainable practices to protect our planet's ecosystems.",
  },
  {
    title: "Homeless Shelter Support",
    description:
      "Volunteering at homeless shelters includes helping with meal services, distributing clothing, providing emotional support, and assisting with finding resources to help individuals experiencing homelessness.",
  },
  {
    title: "Youth Education and Mentorship",
    description:
      "Volunteering for youth education and mentorship involves tutoring, leading workshops, and offering guidance to children and teenagers to help them achieve academic success and personal growth.",
  },
];

const Causes = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          Join Us on the Journey <br /> Choose a Cause to Support
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {causesData.map((cause, index) => (
            <div
              key={index}
              className="relative p-6 rounded-lg shadow-md bg-white overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 bottom-0 bg-green-500 transform skew-y-6 origin-top-left"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-center w-20 h-20 bg-green-500 text-white rounded-full mb-4">
                  {/* icon or image here */}
                </div>
                <h2 className="text-xl font-semibold mb-2">{cause.title}</h2>
                <p className="text-gray-700">{cause.description}</p>
                <button className="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Causes;

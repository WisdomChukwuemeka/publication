"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

// Text data in an array
const highlights = [
  {
    title: "Championing Global Knowledge Sharing",
    description:
      "Journivo is committed to creating a world where knowledge flows freely. By removing barriers to research access, it empowers scholars globally to share discoveries, exchange ideas, and inspire innovation across diverse academic communities.",
  },
  {
    title: "Advancing Research Through Open Access",
    description:
      "Journivo strengthens academic excellence through its open access platform. By making groundbreaking research freely available, it supports the advancement of science, innovation, and education while ensuring equal opportunities for learning, growth, and discovery worldwide.",
  },
  {
    title: "Where Scholarship Meets Accessibility",
    description:
      "Journivo closes the gap between scholarship and society by promoting accessibility. Through open access publishing, it guarantees that knowledge transcends financial barriers, making academic research available to students, educators, and researchers everywhere in the world.",
  },
  {
    title: "Empowering Voices in Academia",
    description:
      "Journivo amplifies academic voices by valuing inclusivity and diversity. It provides equal opportunities for emerging and established researchers, enabling meaningful contributions, fostering equity, and promoting collaborative growth within the global academic and scholarly publishing community.",
  },
  {
    title: "Innovating the Future of Academic Publishing",
    description:
      "Journivo leads innovation in academic publishing by embracing digital platforms. Its mission is to maximize impact, extend reach, and ensure that research flows across borders, disciplines, and communities without restrictions, obstacles, or unnecessary academic limitations.",
  },
  {
    title: "Breaking Barriers, Building Knowledge",
    description:
      "Journivo challenges outdated restrictions by promoting open access publishing. Through this approach, it transforms how knowledge is shared, enabling unrestricted academic engagement, supporting intellectual equity, and contributing toward the advancement of education and humanity everywhere.",
  },
  {
    title: "A Trusted Hub for Scholarly Excellence",
    description:
      "Journivo upholds credibility, transparency, and integrity in research publishing. By maintaining strong editorial standards and ethical practices, it ensures that every published work enriches the global knowledge base, fostering scholarly trust, excellence, and academic advancement.",
  },
  {
    title: "Making Research Universally Accessible",
    description:
      "Journivo’s mission is universal accessibility. By eliminating copyright and cost barriers, it ensures that academic contributions reach wider audiences, empowering students, educators, policymakers, and researchers worldwide with meaningful opportunities for shared learning and intellectual growth.",
  },
];

const sections = [
  {
    title: "Thorough Evaluation",
    description: "We adhere to a meticulous review process to confirm the article's scientific accuracy and logical outcomes",
    icon: "bi-star",
  },
  {
    title: "Prompt Publishing",
    description: "We recognize that swift editorial review and publication are crucial for scientific progress",
    icon: "bi-clock",
  },
  {
    title: "Connect with Readers",
    description: "We assist in expanding your online presence, nurturing it, and ensuring your research is easily found",
    icon: "bi-people",
  },
  {
    title: "Ethical Publishing Guidelines",
    description: "We commit to collaborating with transparency and integrity to provide high-quality publications",
    icon: "bi-file-earmark-text",
  },
];

 // Card animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    hover: { scale: 1.03, boxShadow: "0px 8px 20px rgba(0,0,0,0.15)" },
  };

const articles = [
    {
      id: 1,
      title:
        "Factors affecting implementation of small-scale irrigation projects: the case of Ada'a district irrigation construction and scheme administration, East Showa, Oromia, Ethiopia",
      author: "Megersa Tolera",
      image: "/education/greenone.png", // replace with real image path
    },
    {
      id: 2,
      title:
        "Enhancing Environmental Education through Game-Based Learning: A Literature Review and Experimental Study",
      author: "Nissaf Sleimi, Ines Sahtout Gaha",
      image: "/education/green.png", // replace with real image path
    },
     {
    id: 3,
    title:
      "The Role of Guidance and Counselling in Enhancing Students’ Self-Esteem: A Case Study of Obio-Akpor Local Government Area",
    author: "Wisdom Chukwuemeka",
    image: "/education/greenthree.png", // replace with real image path
  },
  {
    id: 4,
    title:
      "Digital Transformation in Higher Education: Opportunities and Challenges for E-Learning Adoption",
    author: "Fatima Al-Hassan, David O. Adewale",
    image: "/education/greenfour.png",
  },
  {
    id: 5,
    title:
      "Climate Change Adaptation Strategies for Smallholder Farmers in Sub-Saharan Africa",
    author: "Joseph Mwangi, Grace Ndlovu",
    image: "/education/greensix.png",
  },
  {
    id: 6,
    title:
      "Artificial Intelligence in Education: A Framework for Personalized Learning Systems",
    author: "Aisha Bello, Mark Johnson",
    image: "/education/greenfive.png",
  },
  ];


// Animation variants
const slideVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 1 } },
  exit: { opacity: 0, x: -100, transition: { duration: 1 } },
};

const editorialBoard = [
  {
    name: "Surender Vaswani",
    title: "Editor-in-Chief",
    description: "Scholars Medicine and Health Science...",
    image: "/doctor/doctor.png",
  },
  {
    name: "Vinodkumar Kantilal Satyapal",
    title: "Editor-in-Chief",
    description: "Scholars International Journal of Case...",
    image: "/doctor/teacher.png",
  },
  {
    name: "Ajay K Khanna",
    title: "Editor-in-Chief",
    description: "Scholars Surgery and Surgical Reports...",
    image: "/doctor/surgon.png",
  },
  {
    name: "María del Pilar Sosa",
    title: "Editor-in-Chief",
    description: "Scholars Nursing and Healthcare...",
    image: "/doctor/nurse.png",
  },
  // Add more members...
];


export const HomePage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto change highlight every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % highlights.length);
    }, 10000); // 10 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* First Section */}
      <section className="relative h-[400px] flex items-center justify-center">
        <Image
          src="/logo/book.png"
          alt="Background"
          fill
          priority
          className="object-cover "
        />
        <div className="absolute inset-0 bg-black/80"></div>
        <div className="relative text-center text-white">
          <h1 className="text-4xl font-bold text-blue-600">Publications</h1>
          <p className="mt-2 text">
            We make publishing your work super easy from the comfort of home.
          </p>
        </div>
      </section>

      {/* Second Section */}
      <section className="bg-white grid grid-cols-1 md:grid-cols-2 gap-5 items-center px-6 md:px-16 py-12">
        {/* Left Images */}
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <Image
              src="/library/bookfour.png"
              alt="Open Book"
              width={500}
              height={500}
              className="rounded-lg shadow-md w-full h-auto"
            />
          </div>
          <div>
            <Image
              src="/library/booktwo.png"
              alt="Lab Experiment"
              width={250}
              height={250}
              className="rounded-lg shadow-md w-full h-auto"
            />
          </div>
          <div>
            <Image
              src="/library/bookthree.png"
              alt="Molecular Research"
              width={250}
              height={250}
              className="rounded-lg shadow-md w-full h-auto"
            />
          </div>
        </div>

        {/* Right Text (slideshow with animation) */}
        <div className="space-y-2 flex flex-col items-center w-fit overflow-hidden">
          <section className="relative px-6 md:px-0 py-12 min-h-[250px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="w-full pb-0 flex flex-col items-center justify-center space-y-4 text-center"
              >
                <h2 className="text-2xl font-bold text-gray-800 text-center">
                {highlights[currentIndex].title}
                </h2>
                <p className="text-gray-600">
                  {highlights[currentIndex].description}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Buttons */}
          <div className="absolute bottom-0 flex gap-4 pt-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition">
              Submit Article
            </button>
            <button className="border border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white px-6 py-2 rounded-md transition">
              View All Journals
            </button>
          </div>
          </section>      
        </div>
      </section>

      {/* Recent Publications */}
       <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Heading */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold text-blue-900">
            Recent Articles
          </h2>
          <div className="flex items-center gap-6 text-sm text-blue-700">
            <button className="flex items-center gap-1 hover:underline">
              <i className="bi bi-arrow-left"></i> Previous
            </button>
            <button className="hover:underline">View All</button>
            <button className="flex items-center gap-1 hover:underline">
              Next <i className="bi bi-arrow-right"></i>
            </button>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((article, index) => (
            <motion.div
              key={article.id}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              {/* Thumbnail */}
              <div className="w-full h-48 relative">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col justify-between">
                <h3 className="text-lg font-semibold text-blue-900 leading-snug mb-3">
                  {article.title}
                </h3>
                <p className="text-gray-700 font-medium mb-4">
                  {article.author}
                </p>
                <button className="px-4 py-2 text-sm border border-blue-600 text-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition self-start">
                  VIEW FULL ARTICLE
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section>
  <div className="w-full bg-white py-8 px-4 md:px-8">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {sections.map((section, index) => (
          <div
            key={index}
            className="bg-white/30 p-6 border-b-2 border-blue-400 rounded-lg shadow-sm 
                       flex flex-col items-start 
                       transition-transform duration-300 ease-in-out 
                       hover:scale-105 hover:shadow-lg"
          >
            <i
              className={`${section.icon} text-3xl text-gray-600 mb-4 flex-shrink-0`}
              style={{ fontSize: "2rem" }}
            ></i>
            <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">
              {section.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed flex-grow">
              {section.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

<section className="bg-gray-50 py-12 overflow-hidden">
      <h2 className="text-center text-2xl font-bold text-blue-900 mb-8">
        Editorial Board
      </h2>

      <div className="relative w-full overflow-hidden">
        {/* Sliding container */}
        <div className="marquee space-x-6">
          {/* Duplicate array for smooth infinite loop */}
          {[...editorialBoard, ...editorialBoard].map((member, idx) => (
            <div
              key={idx}
              className="min-w-[250px] bg-white rounded-xl shadow-md p-4 flex flex-col items-center"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-28 h-28 rounded-full object-cover mb-4"
              />
              <h3 className="text-red-600 font-semibold">{member.name}</h3>
              <p className="text-blue-900 font-bold">{member.title}</p>
              <p className="text-gray-600 text-sm text-center mt-2">
                {member.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>

    </>
  );
};

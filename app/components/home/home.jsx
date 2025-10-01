"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

// Text data in an array
const highlights = [
  {
    title: "Championing Global Knowledge Sharing",
    description:
      "Journivo is dedicated to fostering a culture of open knowledge exchange. By removing barriers to access, it empowers researchers worldwide to share discoveries, ideas, and innovations freely, ensuring that scholarship reaches every corner of the globe.",
  },
  {
    title: "Advancing Research Through Open Access",
    description:
      "With a strong commitment to academic excellence, Journivo provides a dynamic platform where groundbreaking research is freely accessible. It supports the advancement of science, education, and innovation by making knowledge open to all.",
  },
  {
    title: "Where Scholarship Meets Accessibility",
    description:
      "Journivo bridges the gap between research and readership. By embracing open access, it ensures that academic work is not limited by financial walls but reaches students, educators, and researchers across the world.",
  },
  {
    title: "Empowering Voices in Academia",
    description:
      "Recognized for its inclusive vision, Journivo offers opportunities for scholars from diverse backgrounds to publish their work. It values both established academics and emerging researchers, giving equal space for their contributions.",
  },
  {
    title: "Innovating the Future of Academic Publishing",
    description:
      "At the forefront of publishing innovation, Journivo leverages digital platforms to maximize reach and impact. Its mission is to make knowledge flow seamlessly across disciplines and borders.",
  },
  {
    title: "Breaking Barriers, Building Knowledge",
    description:
      "Journivo challenges traditional restrictions in academic publishing. Through its open access model, it transforms the way knowledge is shared, enabling free and unrestricted access for the advancement of humanity.",
  },
  {
    title: "A Trusted Hub for Scholarly Excellence",
    description:
      "Journivo upholds high editorial and ethical standards, ensuring that every published work contributes meaningfully to the global body of knowledge. Its credibility makes it a trusted partner in academic publishing.",
  },
  {
    title: "Making Research Universally Accessible",
    description:
      "With a mission rooted in accessibility, Journivo believes that research should serve society as a whole. By removing cost and copyright restrictions, it ensures that valuable academic contributions are available to everyone, everywhere.",
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
      image: "/education/green.png", // replace with real image path
    },
    {
      id: 2,
      title:
        "Enhancing Environmental Education through Game-Based Learning: A Literature Review and Experimental Study",
      author: "Nissaf Sleimi, Ines Sahtout Gaha",
      image: "/education/greenone.png", // replace with real image path
    },
  ];


// Animation variants
const slideVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 1 } },
  exit: { opacity: 0, x: -100, transition: { duration: 1 } },
};

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
      <section className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center px-6 md:px-16 py-12">
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
        <div className="space-y-2 flex flex-col items-center">
          <section className="px-6 md:px-16 py-12 min-h-[250px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-2"
              >
                <h2 className="text-2xl font-bold text-gray-800 text-center">
                {highlights[currentIndex].title}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {highlights[currentIndex].description}
                </p>
              </motion.div>
            </AnimatePresence>
          </section>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition">
              Submit Article
            </button>
            <button className="border border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white px-6 py-2 rounded-md transition">
              View All Journals
            </button>
          </div>
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
                <h3 className="text-lg font-semibold text-black leading-snug mb-3">
                  {article.title}
                </h3>
                <p className="text-gray-700 font-medium mb-4">
                  {article.author}
                </p>
                <button className="px-4 py-2 text-sm border border-orange-600 text-orange-600 rounded-md hover:bg-orange-600 hover:text-white transition self-start">
                  VIEW FULL ARTICLE
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    </>
  );
};

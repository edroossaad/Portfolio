"use client";
import React from "react";
import { motion } from "framer-motion";
import { Linkedin, Github, Mail } from "lucide-react";

// ProfileCard Component
function ProfileCard({ name, role, pictureUrl, bio, socials }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-sm bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden relative hover:scale-105 transform transition-all duration-300"
    >
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-amber-400"></div>

      {/* Profile Picture */}
      <div className="pt-10 flex justify-center">
        <motion.img
          src={pictureUrl}
          alt={`${name} profile`}
          className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-900 shadow-lg"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 260, damping: 20 }}
        />
      </div>

      {/* Name & Role */}
      <div className="text-center px-6 py-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          {name}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{role}</p>
      </div>

      {/* Bio */}
      <div className="px-6 pb-6">
        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
          {bio}
        </p>
      </div>

      {/* Socials */}
      <div className="px-6 pb-6 flex justify-center space-x-4">
        {socials.linkedin && (
          <a
            href={socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <Linkedin size={24} />
          </a>
        )}
        {socials.github && (
          <a
            href={socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <Github size={24} />
          </a>
        )}
        {socials.email && (
          <a
            href={`mailto:${socials.email}`}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <Mail size={24} />
          </a>
        )}
      </div>
    </motion.div>
  );
}

// Full AboutMe Section
export default function AboutMeSection() {
  const skills = ["React", "Next.js", "TypeScript", "TailwindCSS", "Node.js"];

  return (
    <section className="py-16 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Profile Card */}
        <ProfileCard
          name="Saad Edroos"
          role="Full-Stack Web Developer"
          pictureUrl="https://api.dicebear.com/6.x/identicon/svg?seed=Saad"
          bio="I’m a passionate developer who loves crafting beautiful, fast, and accessible web applications. My focus is on building modern digital experiences with clean code and thoughtful design."
          socials={{
            linkedin: "https://linkedin.com",
            github: "https://github.com",
            email: "hello@saadedroos.com",
          }}
        />

        {/* About Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="space-y-6"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            About Me
          </h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            With several years of experience in web development, I specialize in
            creating applications that combine performance, scalability, and
            great user experience. I enjoy solving challenging problems and
            constantly learning new technologies to stay ahead of the curve.
          </p>

          <div>
            <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Core Skills
            </h4>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 text-sm rounded-full bg-slate-200 dark:bg-slate-700 text-gray-800 dark:text-gray-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05 }}
            className="inline-block px-6 py-3 rounded-xl bg-amber-400 text-white font-semibold shadow-md hover:bg-amber-500 transition"
          >
            View My Work
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

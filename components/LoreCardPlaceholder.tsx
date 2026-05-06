"use client";

import { motion } from "framer-motion";

interface LoreCardPlaceholderProps {
  title: string;
  description: string;
}

export default function LoreCardPlaceholder({ title, description }: LoreCardPlaceholderProps) {
  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="bg-[#1a1a1a] border border-[#333] rounded-xl p-6 cursor-pointer shadow-lg hover:border-neutral-500 transition-colors"
    >
      <div className="h-40 bg-[#252525] rounded-md mb-4 flex items-center justify-center text-neutral-600 text-sm">
        Image Placeholder
      </div>
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-sm text-neutral-400 line-clamp-3">{description}</p>
    </motion.div>
  );
}

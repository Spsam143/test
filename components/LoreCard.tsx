"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import LoreModal from "./LoreModal";

interface LoreCardProps {
  title: string;
  content: string;
  categoryName: string;
  imageUrl?: string | null;
}

export default function LoreCard({ title, content, categoryName, imageUrl }: LoreCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.div
        onClick={() => setIsModalOpen(true)}
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
        className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden cursor-pointer shadow-lg hover:border-zinc-500 transition-colors flex flex-col h-full"
      >
        <div className="h-48 w-full bg-zinc-800/50 relative">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-zinc-600 text-sm">
              No Image
            </div>
          )}
          <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-xs font-semibold px-2 py-1 rounded text-zinc-300">
            {categoryName}
          </div>
        </div>

        <div className="p-5 flex flex-col flex-1">
          <h3 className="text-xl font-semibold mb-2 text-zinc-50">{title}</h3>
          <p className="text-sm text-zinc-400 line-clamp-3 leading-relaxed">{content}</p>
        </div>
      </motion.div>

      <LoreModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={title}
        content={content}
        categoryName={categoryName}
        imageUrl={imageUrl}
      />
    </>
  );
}

"use client";

import { motion, AnimatePresence } from "framer-motion";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import Image from "next/image";

interface LoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  categoryName: string;
  imageUrl?: string | null;
}

export default function LoreModal({
  isOpen,
  onClose,
  title,
  content,
  categoryName,
  imageUrl,
}: LoreModalProps) {

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <AnimatePresence>
        {isOpen && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-md z-40"
              />
            </Dialog.Overlay>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
              <Dialog.Content asChild>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                    duration: 0.3,
                  }}
                  className="bg-[#1a1a1a] border border-[#333] rounded-2xl shadow-2xl overflow-hidden w-full max-w-3xl max-h-[90vh] flex flex-col relative"
                >
                  {/* Close Button */}
                  <Dialog.Close asChild>
                    <button
                      className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/80 backdrop-blur-sm text-neutral-300 hover:text-white rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-500"
                      aria-label="Close"
                    >
                      <X size={20} />
                    </button>
                  </Dialog.Close>

                  {/* Header Image */}
                  <div className="h-48 sm:h-64 md:h-80 w-full bg-[#252525] relative shrink-0">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 1024px"
                        priority
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-neutral-600">
                        No Image Available
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] to-transparent pointer-events-none" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="inline-block bg-black/60 backdrop-blur-sm text-xs font-semibold px-3 py-1.5 rounded-md text-neutral-300 mb-3 border border-white/10">
                        {categoryName}
                      </div>
                      <Dialog.Title className="text-3xl sm:text-4xl font-bold text-white tracking-tight drop-shadow-md">
                        {title}
                      </Dialog.Title>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 sm:p-8 overflow-y-auto custom-scrollbar flex-1">
                    <Dialog.Description className="sr-only">
                      Detailed information about {title}.
                    </Dialog.Description>
                    <div className="prose prose-invert max-w-none">
                      <p className="text-neutral-300 leading-relaxed text-base sm:text-lg whitespace-pre-wrap">
                        {content}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </Dialog.Content>
            </div>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}

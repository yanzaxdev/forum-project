"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "~/app/providers";

interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

const AccordionComment = ({ title, children }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { translation } = useLanguage();

  return (
    <div className="overflow-hidden rounded-md border" dir={translation._dir}>
      <button
        className="100 flex w-full min-w-[50px] items-center justify-between bg-gray-800 p-4 text-left transition-colors hover:bg-gray-200 dark:bg-gray-800"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="px-4 font-medium">{title}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="h-5 w-5" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="p-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AccordionComment;

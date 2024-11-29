import React, { useId } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'framer-motion';
import { cn } from "@/lib/utils";

interface InViewMotionProps {
  children?: React.ReactNode;
  className?: string;
}

const CtaCard: React.FC<InViewMotionProps> = ({ 
  children, 
  className 
}) => {
  const id = useId();
  const controls = useAnimation();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  React.useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        transition: { 
          delay: Math.random() * 2, 
          ease: 'easeOut', 
          duration: 1 
        }
      });
    }
  }, [isInView, controls]);

  return (
    <motion.div
      id={id}
      ref={ref}
      initial={{ opacity: 0 }}
      animate={controls}
      className={cn(
        'relative size-20 cursor-pointer overflow-hidden rounded-2xl border p-4',
        // light styles
        'bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]',
        // dark styles
        'transform-gpu dark:bg-transparent dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]',
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export default CtaCard;